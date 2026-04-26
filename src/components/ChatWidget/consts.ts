import { BRAND } from '../../utils/brand';

export const CHAT_WIDGET = {
  title: 'Ask my digital twin',
  description:
    "Curious about my process, tech stack, or availability? Chat with my AI-augmented twin to get instant answers about my professional journey.",
  suggestions: ["Tell me about your React experience", "What's your project workflow?"] as const,
  placeholder: 'Type your question…',
  greeting: `Hello! I'm ${BRAND.firstName}'s digital assistant. How can I help you today?`,
  thinkingLabel: 'Thinking…',
  copyLabel: 'Copy',
  copiedLabel: 'Copied!',
  savedHeading: 'Saved responses',
  deleteLabel: 'Delete',
} as const;
