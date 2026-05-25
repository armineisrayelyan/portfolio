import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const TELEGRAM_BASE_URL = 'https://api.telegram.org';

type TelegramRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    const missing = [
      !token && 'TELEGRAM_BOT_TOKEN',
      !chatId && 'TELEGRAM_CHAT_ID',
    ].filter(Boolean);
    return res.status(500).json({
      error: `Server misconfiguration: set ${missing.join(' and ')} in Vercel → Settings → Environment Variables, then redeploy.`,
    });
  }

  const body = req.body as TelegramRequestBody;
  const { name, email, message } = body;

  if (
    !name || typeof name !== 'string' || !name.trim() ||
    !email || typeof email !== 'string' || !email.trim() ||
    !message || typeof message !== 'string' || !message.trim()
  ) {
    return res.status(400).json({ error: 'Missing or invalid fields.' });
  }

  const text = `<b>New Contact Message</b>\n\n<b>Name:</b> ${name}\n<b>Email:</b> ${email}\n\n<b>Message:</b>\n${message}`;

  try {
    await axios.post(`${TELEGRAM_BASE_URL}/bot${token}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return res.status(502).json({ error: message });
  }
}
