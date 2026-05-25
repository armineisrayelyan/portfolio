export const AI_CHAT = {
  heading: 'AI Assistant',
  subheading: 'Ask about my experience and work — replies use only the information I provide, not the open web.',
  placeholder: 'e.g. What did you focus on at Mamble?',
  submitLabel: 'Ask Gemini',
  resetLabel: 'Clear',
  loadingLabel: 'Thinking…',
  suggestions: [
    'Summarize your experience as a frontend engineer.',
    'What did you work on at Mamble, and which technologies did you use?',
    'What are you working on as a freelance developer?',
    'What roles or collaborations are you open to, and how can someone reach you?',
  ],
  errorTitle: 'Something went wrong',
  apiKeyWarning:
    'Add your Gemini API key to the .env file: GEMINI_API_KEY=your_key_here',
  copyLabel: 'Copy',
  copiedLabel: 'Copied!',
  saveLabel: 'Save',
  savedLabel: 'Saved!',
} as const;
