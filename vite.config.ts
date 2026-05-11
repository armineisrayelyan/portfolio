import react from '@vitejs/plugin-react';
import axios from 'axios';
import type { IncomingMessage, ServerResponse } from 'http';
import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';

import { buildGeminiRequestBody } from './api/buildGeminiRequestBody';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

type GeminiApiResponse = {
  candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
};

/**
 * Dev-only Vite plugin that handles POST /api/gemini inside the Vite server.
 * In production, Vercel routes /api/gemini to api/gemini.ts (serverless function).
 */
function localGeminiApi(apiKey: string): Plugin {
  return {
    name: 'local-gemini-api',
    configureServer(server) {
      server.middlewares.use(
        '/api/gemini',
        (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'POST') {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
            return;
          }

          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            void (async () => {
              const send = (status: number, body: unknown) => {
                res.writeHead(status, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(body));
              };

              if (!apiKey) {
                send(500, { error: 'GEMINI_API_KEY is not set in your .env file.' });
                return;
              }

              try {
                const raw = Buffer.concat(chunks).toString();
                const parsed = JSON.parse(raw) as { prompt?: unknown };
                const prompt = parsed.prompt;

                if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
                  send(400, { error: 'Missing or invalid prompt.' });
                  return;
                }

                const url = `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
                const { data } = await axios.post<GeminiApiResponse>(
                  url,
                  buildGeminiRequestBody(prompt),
                  { headers: { 'Content-Type': 'application/json' } },
                );

                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) {
                  send(502, { error: 'No response from Gemini.' });
                  return;
                }

                send(200, { text });
              } catch (err) {
                const message = err instanceof Error ? err.message : 'Unexpected error';
                send(502, { error: message });
              }
            })();
          });
        },
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), localGeminiApi(env['GEMINI_API_KEY'] ?? '')],
    server: {
      port: 5173,
    },
  };
});
