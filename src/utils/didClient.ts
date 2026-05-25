export type DidCreateResult = { talkId: string; status: string };

export type DidStatusResult = {
  talkId: string;
  status: string;
  resultUrl: string | null;
  error: string | null;
};

export async function didCreate(script: string, voiceId: string, sourceUrl?: string): Promise<DidCreateResult> {
  const res = await fetch('/api/did', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'create',
      script,
      voiceId,
      ...(sourceUrl?.trim() ? { sourceUrl: sourceUrl.trim() } : {}),
    }),
  });

  const data = (await res.json()) as DidCreateResult & { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  if (!data.talkId) {
    throw new Error('No talk id returned.');
  }
  return { talkId: data.talkId, status: data.status };
}

export async function didStatus(talkId: string): Promise<DidStatusResult> {
  const res = await fetch('/api/did', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'status', talkId }),
  });

  const data = (await res.json()) as DidStatusResult & { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return {
    talkId: data.talkId,
    status: data.status,
    resultUrl: data.resultUrl ?? null,
    error: data.error ?? null,
  };
}
