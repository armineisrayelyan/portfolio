/** Avatar image used for D-ID talking-head video. Must be a direct https URL to JPEG/PNG. */
export const VIRTUAL_SELF_AVATAR_URL =
  'https://cdn.phototourl.com/free/2026-05-19-890a0aac-2f72-4a22-9352-0aa274c9bee0.png';

/** English voice for the avatar (Microsoft neural via D-ID). */
export const VIRTUAL_SELF_VOICE_ID = 'en-US-JennyNeural';

/** Max words the avatar will say (Gemini reply is trimmed before sending to D-ID). */
export const VIRTUAL_SELF_MAX_WORDS = 20;

export const VIRTUAL_SELF = {
  pill: 'AI augmented',
  title: 'Meet my virtual self',
  description:
    'In the era of rapid digital transformation, I believe in extending human capability through technology. My virtual presence isn’t just an avatar; it’s a commitment to being accessible, efficient, and forward-thinking.',
  features: [
    {
      title: 'Augmented Communication',
      description: 'Real-time response capabilities for seamless global collaboration.',
    },
    {
      title: 'Digital Continuity',
      description: 'Ensuring my professional knowledge base is always available to partners.',
    },
  ],
  imageCaption: 'Virtual presence active',
  qa: {
    heading: 'Ask my avatar',
    description: 'Type a question and my avatar will answer live.',
    placeholder: 'e.g. What are your strongest frontend skills?',
    askLabel: 'Ask avatar',
    thinkingLabel: 'Thinking…',
    speakingLabel: 'Preparing your answer…',
    resetLabel: 'New question',
    answerLabel: 'Avatar says',
    errorTitle: 'Something went wrong',
  },
} as const;
