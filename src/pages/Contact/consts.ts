export const CONTACT_PAGE = {
  heading: 'Contact',
  subheading: 'Have a project in mind? Send a message and I’ll get back to you.',
  submitSuccess: 'Message prepared. Connect a backend/email service to send it.',
  placeholders: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Tell me about your project...',
  },
  buttons: {
    send: 'Send',
    reset: 'Reset',
  },
  sections: {
    social: 'Social',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Email', href: 'mailto:you@example.com' },
  ],
} as const;

