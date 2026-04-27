export async function callGemini(prompt: string): Promise<string> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error(`Unexpected response from server (HTTP ${res.status}). Is the dev server running?`);
  }

  const data = (await res.json()) as { text?: string; error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }

  if (!data.text) {
    throw new Error('No response from Gemini.');
  }

  return data.text;
}
