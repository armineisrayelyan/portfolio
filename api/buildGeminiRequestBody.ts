import { ASSISTANT_KNOWLEDGE_BASE } from './assistantKnowledge.js';

/**
 * Body for `generateContent`. Shared by Vercel (`api/gemini.ts`) and the Vite
 * dev middleware so local and production behave the same.
 *
 * The knowledge base is inlined in the user turn (not only systemInstruction)
 * so the model reliably conditions on it.
 */
export function buildGeminiRequestBody(userPrompt: string) {
  const trimmed = userPrompt.trim();

  const text = [
    'You are the assistant for this portfolio website.',
    '',
    'Rules:',
    '- Answer ONLY using facts that appear in the KNOWLEDGE BASE section below.',
    '- Do not use the public web, news, or general biographical knowledge about anyone.',
    '- If something is not stated in the knowledge base, say you do not have that information; do not guess.',
    '- Keep answers concise.',
    '',
    '=== KNOWLEDGE BASE (your only source of facts about this person and their work) ===',
    '',
    ASSISTANT_KNOWLEDGE_BASE,
    '',
    '=== END KNOWLEDGE BASE ===',
    '',
    `Visitor question: ${trimmed}`,
  ].join('\n');

  return {
    contents: [{ role: 'user' as const, parts: [{ text }] }],
  };
}
