import type { VercelRequest, VercelResponse } from '@vercel/node';

import { handleDidProxy } from './didProxy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env['DID_API_KEY'];
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfiguration: DID_API_KEY is not set.' });
  }

  const body = req.body;
  const { status, json } = await handleDidProxy(apiKey, body);
  return res.status(status).json(json);
}
