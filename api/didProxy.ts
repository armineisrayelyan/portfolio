import axios from 'axios';

const DID_API_BASE = 'https://api.d-id.com';

/** Official OpenAPI default for talks `source_url`. */
export const DID_DEFAULT_SOURCE_URL =
  'https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg';

export type DidCreateBody = {
  action: 'create';
  script: string;
  sourceUrl?: string;
  voiceId: string;
};

export type DidStatusBody = {
  action: 'status';
  talkId: string;
};

export type DidProxyBody = DidCreateBody | DidStatusBody;

/** D-ID returns flat `{ kind, description }` on errors — not always `message`. */
export function parseDidError(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const d = data as Record<string, unknown>;
  if (typeof d.description === 'string' && d.description.trim()) return d.description.trim();
  if (typeof d.message === 'string' && d.message.trim()) return d.message.trim();
  const nested = d.error;
  if (nested && typeof nested === 'object') {
    const e = nested as Record<string, unknown>;
    if (typeof e.description === 'string') return e.description;
    if (typeof e.message === 'string') return e.message;
  }
  return undefined;
}

/** D-ID `/talks` rejects URLs that do not match this pattern (e.g. Kommodo links with no `.jpg` in the path). */
function talksAcceptsSourceUrl(url: string): boolean {
  return /(https|s3):\/\/.+\.(jpe?g|png)(\?|#|$)/i.test(url.trim());
}

/** User-entered URL: must be fetchable https/s3, not WebP. */
function isValidUserImageUrl(url: string): boolean {
  const u = url.trim();
  if (u.length < 12 || u.length > 4096 || /\s/.test(u)) return false;
  try {
    const parsed = new URL(u);
    const scheme = parsed.protocol.replace(':', '').toLowerCase();
    if (scheme !== 'https' && scheme !== 'http' && scheme !== 's3') return false;
    if (scheme === 'http' && !['localhost', '127.0.0.1'].includes(parsed.hostname)) return false;
    const path = `${parsed.pathname}${parsed.search}`.toLowerCase();
    if (path.includes('.webp')) return false;
    return parsed.hostname.length > 0;
  } catch {
    return false;
  }
}

function authHeader(apiKey: string) {
  const trimmed = apiKey.trim();
  if (trimmed.includes(':')) {
    return `Basic ${Buffer.from(trimmed).toString('base64')}`;
  }
  return `Basic ${Buffer.from(`${trimmed}:`).toString('base64')}`;
}

type DidTalkResponse = {
  id?: string;
  status?: string;
  result_url?: string;
  error?: { kind?: string; description?: string; message?: string };
};

async function postDidImages(apiKey: string, form: FormData): Promise<{ url: string }> {
  const res = await fetch(`${DID_API_BASE}/images`, {
    method: 'POST',
    headers: { Authorization: authHeader(apiKey) },
    body: form,
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = parseDidError(data) ?? `D-ID /images HTTP ${res.status}`;
    throw new Error(msg);
  }
  const obj = data as { url?: string };
  if (!obj.url || typeof obj.url !== 'string') {
    throw new Error('D-ID /images response missing url.');
  }
  return { url: obj.url };
}

async function fetchRemoteImageAsBlob(url: string): Promise<{ blob: Blob; filename: string }> {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { Accept: 'image/*,*/*' },
  });
  if (!res.ok) {
    throw new Error(`Could not download image (HTTP ${res.status}).`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 100) throw new Error('Downloaded file is too small to be an image.');
  if (buf.length > 12 * 1024 * 1024) throw new Error('Image is too large (max 12MB).');

  const ct = (res.headers.get('content-type') || '').split(';')[0].toLowerCase();
  const isJpegMagic = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const isPngMagic = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;

  if (ct.includes('jpeg') || ct.includes('jpg') || isJpegMagic) {
    return { blob: new Blob([buf], { type: 'image/jpeg' }), filename: 'face.jpg' };
  }
  if (ct.includes('png') || isPngMagic) {
    return { blob: new Blob([buf], { type: 'image/png' }), filename: 'face.png' };
  }
  throw new Error('URL did not return a JPEG or PNG image (not WebP or HTML).');
}

/**
 * `/talks` requires `source_url` to match D-ID's pattern (path must contain .jpg/.jpeg/.png).
 * Extensionless URLs (e.g. Kommodo) are uploaded via `POST /images` first; the returned `url` is used for `/talks`.
 */
async function resolveSourceUrlForTalks(apiKey: string, rawSource: string | undefined): Promise<string> {
  const trimmed = rawSource?.trim();
  if (!trimmed) return DID_DEFAULT_SOURCE_URL;
  if (talksAcceptsSourceUrl(trimmed)) return trimmed;

  let imagesPassError = '';
  const trySourceUrl = new FormData();
  trySourceUrl.append('source_url', trimmed);
  try {
    const { url } = await postDidImages(apiKey, trySourceUrl);
    if (talksAcceptsSourceUrl(url)) return url;
  } catch (e) {
    imagesPassError = e instanceof Error ? e.message : 'D-ID /images failed';
  }

  try {
    const { blob, filename } = await fetchRemoteImageAsBlob(trimmed);
    const formBin = new FormData();
    formBin.append('image', blob, filename);
    const { url: uploaded } = await postDidImages(apiKey, formBin);
    if (!talksAcceptsSourceUrl(uploaded)) {
      throw new Error('D-ID did not return a talks-compatible image URL.');
    }
    return uploaded;
  } catch (e) {
    const fetchMsg = e instanceof Error ? e.message : 'Could not process image.';
    if (imagesPassError) {
      throw new Error(`${fetchMsg} (D-ID /images with your URL: ${imagesPassError})`);
    }
    throw e instanceof Error ? e : new Error(fetchMsg);
  }
}

function extractAxiosMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const parsed = parseDidError(err.response?.data);
    if (parsed) return parsed;
    const data = err.response?.data as { message?: string } | undefined;
    return (typeof data?.message === 'string' ? data.message : undefined) ?? err.message ?? 'D-ID request failed';
  }
  return err instanceof Error ? err.message : 'Unexpected error';
}

export async function handleDidProxy(
  apiKey: string,
  body: unknown,
): Promise<{ status: number; json: Record<string, unknown> }> {
  if (!body || typeof body !== 'object') {
    return { status: 400, json: { error: 'Invalid JSON body.' } };
  }

  const action = (body as { action?: unknown }).action;
  const headers = {
    Authorization: authHeader(apiKey),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (action === 'create') {
    const script = (body as DidCreateBody).script;
    const voiceId = (body as DidCreateBody).voiceId;
    const rawSource = (body as DidCreateBody).sourceUrl?.trim();

    if (!script || typeof script !== 'string' || !script.trim()) {
      return { status: 400, json: { error: 'Missing or empty script.' } };
    }
    const scriptTrim = script.trim();
    if (scriptTrim.length < 3) {
      return { status: 400, json: { error: 'Script must be at least 3 characters (D-ID requirement).' } };
    }
    if (!voiceId || typeof voiceId !== 'string' || !voiceId.trim()) {
      return { status: 400, json: { error: 'Missing voiceId (language / voice).' } };
    }
    if (rawSource && !isValidUserImageUrl(rawSource)) {
      return {
        status: 400,
        json: {
          error:
            'Image URL must be a valid https (or s3) link. WebP is not supported. Use a public URL that returns JPEG or PNG.',
        },
      };
    }

    let sourceForTalk: string;
    try {
      sourceForTalk = await resolveSourceUrlForTalks(apiKey, rawSource);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not prepare image for D-ID.';
      return { status: 502, json: { error: msg } };
    }

    const provider = {
      type: 'microsoft' as const,
      voice_id: voiceId.trim(),
    };

    try {
      const { data, status: httpStatus } = await axios.post<DidTalkResponse>(
        `${DID_API_BASE}/talks`,
        {
          source_url: sourceForTalk,
          script: {
            type: 'text',
            input: scriptTrim,
            subtitles: false,
            ssml: false,
            provider,
          },
        },
        { headers, validateStatus: () => true },
      );

      if (httpStatus >= 400) {
        const msg = parseDidError(data) ?? `D-ID HTTP ${httpStatus}`;
        return { status: httpStatus, json: { error: msg } };
      }

      if (!data.id) {
        return {
          status: 502,
          json: { error: 'D-ID did not return a talk id.', raw: data },
        };
      }

      return { status: 200, json: { talkId: data.id, status: data.status ?? 'created' } };
    } catch (err) {
      return { status: 502, json: { error: extractAxiosMessage(err) } };
    }
  }

  if (action === 'status') {
    const talkId = (body as DidStatusBody).talkId;
    if (!talkId || typeof talkId !== 'string' || !talkId.trim()) {
      return { status: 400, json: { error: 'Missing talkId.' } };
    }

    try {
      const { data, status } = await axios.get<DidTalkResponse>(
        `${DID_API_BASE}/talks/${encodeURIComponent(talkId.trim())}`,
        {
          headers,
          validateStatus: () => true,
        },
      );

      if (status >= 400) {
        const msg = parseDidError(data) ?? `D-ID HTTP ${status}`;
        return { status, json: { error: msg } };
      }

      const err = data.error;
      const errMsg =
        err && typeof err === 'object'
          ? err.description ?? err.message ?? err.kind
          : undefined;

      return {
        status: 200,
        json: {
          talkId: data.id ?? talkId,
          status: data.status ?? 'unknown',
          resultUrl: data.result_url ?? null,
          error: errMsg ?? null,
        },
      };
    } catch (err) {
      return { status: 502, json: { error: extractAxiosMessage(err) } };
    }
  }

  return { status: 400, json: { error: 'Unknown action. Use "create" or "status".' } };
}
