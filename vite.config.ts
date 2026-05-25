import react from '@vitejs/plugin-react';
import axios from 'axios';
import type { IncomingMessage, ServerResponse } from 'http';
import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';

import { buildGeminiRequestBody } from './api/buildGeminiRequestBody';
import { handleDidProxy } from './api/didProxy';

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

function localDidApi(apiKey: string): Plugin {
  return {
    name: 'local-did-api',
    configureServer(server) {
      server.middlewares.use('/api/did', (req: IncomingMessage, res: ServerResponse) => {
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
              send(500, { error: 'DID_API_KEY is not set in your .env file.' });
              return;
            }

            try {
              const raw = Buffer.concat(chunks).toString();
              const parsed = JSON.parse(raw) as unknown;
              const { status, json } = await handleDidProxy(apiKey, parsed);
              send(status, json);
            } catch (err) {
              const message = err instanceof Error ? err.message : 'Unexpected error';
              send(502, { error: message });
            }
          })();
        });
      });
    },
  };
}

function localTelegramApi(token: string, chatId: string): Plugin {
  return {
    name: 'local-telegram-api',
    configureServer(server) {
      server.middlewares.use('/api/telegram', (req: IncomingMessage, res: ServerResponse) => {
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

            if (!token || !chatId) {
              send(500, { error: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in your .env file.' });
              return;
            }

            try {
              const raw = Buffer.concat(chunks).toString();
              const parsed = JSON.parse(raw) as { name?: unknown; email?: unknown; message?: unknown };
              const { name, email, message } = parsed;

              if (
                !name || typeof name !== 'string' || !name.trim() ||
                !email || typeof email !== 'string' || !email.trim() ||
                !message || typeof message !== 'string' || !message.trim()
              ) {
                send(400, { error: 'Missing or invalid fields.' });
                return;
              }

              const text = `<b>New Contact Message</b>\n\n<b>Name:</b> ${name}\n<b>Email:</b> ${email}\n\n<b>Message:</b>\n${message}`;

              await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: chatId,
                text,
                parse_mode: 'HTML',
              });

              send(200, { ok: true });
            } catch (err) {
              const errMessage = err instanceof Error ? err.message : 'Unexpected error';
              send(502, { error: errMessage });
            }
          })();
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      localGeminiApi(env['GEMINI_API_KEY'] ?? ''),
      localDidApi(env['DID_API_KEY'] ?? ''),
      localTelegramApi(env['TELEGRAM_BOT_TOKEN'] ?? '', env['TELEGRAM_CHAT_ID'] ?? ''),
    ],
    server: {
      port: 5173,
      allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
    },
  };
});
