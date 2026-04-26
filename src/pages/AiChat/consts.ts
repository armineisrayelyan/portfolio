export const AI_CHAT = {
  heading: 'AI Assistant',
  subheading: 'Ask anything — powered by Gemini.',
  placeholder: 'e.g. Explain React Server Components in simple terms…',
  submitLabel: 'Ask Gemini',
  resetLabel: 'Clear',
  loadingLabel: 'Thinking…',
  suggestions: [
    'What is the difference between useMemo and useCallback?',
    'Explain TypeScript generics with an example.',
    'What are the best practices for React performance?',
    'How does the Gemini API work?',
  ],
  errorTitle: 'Something went wrong',
  apiKeyWarning:
    'Add your Gemini API key to the .env file: VITE_GEMINI_API_KEY=your_key_here',
  copyLabel: 'Copy',
  copiedLabel: 'Copied!',
  saveLabel: 'Save',
  savedLabel: 'Saved!',
} as const;
