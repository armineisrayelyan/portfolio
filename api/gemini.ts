import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const GEMINI_MODEL = 'gemini-2.5-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

type GeminiPart = { text: string };
type GeminiContent = { parts: GeminiPart[]; role?: string };
type GeminiApiResponse = {
  candidates: Array<{
    content: GeminiContent;
    finishReason: string;
  }>;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = req.body as { prompt?: unknown };
  const prompt = body?.prompt;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'Missing or invalid prompt.' });
  }

  const apiKey = process.env['GEMINI_API_KEY'];
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfiguration: API key not set.' });
  }

  const url = `${BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  try {
    const { data } = await axios.post<GeminiApiResponse>(
      url,
      { contents: [{ parts: [{ text: prompt.trim() }] }] },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(text);

    if (!text) {
      return res.status(502).json({ error: 'No response from Gemini.' });
    }

    return res.status(200).json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return res.status(502).json({ error: message });
  }
}
