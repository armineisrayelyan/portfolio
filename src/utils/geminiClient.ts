import axios from 'axios';

const GEMINI_MODEL = 'gemini-2.5-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export type GeminiPart = { text: string };
export type GeminiContent = { parts: GeminiPart[]; role?: string };

export type GeminiRequest = {
  contents: GeminiContent[];
};

export type GeminiResponse = {
  candidates: Array<{
    content: GeminiContent;
    finishReason: string;
  }>;
};

export async function callGemini(prompt: string): Promise<string> {
  const apiKey = import.meta.env['VITE_GEMINI_API_KEY'] as string;

  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not set in your .env file.');
  }

  const url = `${BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body: GeminiRequest = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const { data } = await axios.post<GeminiResponse>(url, body, {
    headers: { 'Content-Type': 'application/json' },
  });

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error('No response from Gemini.');

  return text;
}
