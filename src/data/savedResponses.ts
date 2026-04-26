/**
 * Paste Gemini responses here to save them for reference.
 * Each entry is shown in the AI Chat page as a "saved" response.
 *
 * Format:
 *   { id, prompt, response, savedAt }
 *
 * The `response` field supports full Markdown.
 */
export type SavedResponse = {
  id: string;
  response: string;
};

export const SAVED_RESPONSES: SavedResponse[] = [
//   {
//     id: '1',
//     response: `
//   ### 1. The Core Idea: Request and Response
// At its heart, the Gemini API operates on a simple **request-response** model:
// *   **You (the Developer/Application):** Formulate a request, which includes your input (the "prompt") and desired parameters.
// *   **Gemini API (Google's Servers):** Receives your request, processes it using the chosen Gemini model, and generates a response.
// *   **You (the Developer/Application):** Receive the response, which contains the generated content, and use it in your application.
// * 
//   \`\`\`ts
//   const sorted = useMemo(() => [...list].sort(), [list]);
//   \`\`\`
  
//   **useCallback** memoizes a *function reference*:
//   \`\`\`ts
//   const handleClick = useCallback(() => doSomething(id), [id]);
//   \`\`\`
//     `.trim(),
//   },
];
