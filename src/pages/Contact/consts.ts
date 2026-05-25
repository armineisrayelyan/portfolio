export type ContactInfoItem = {
  id: string;
  label: string;
  value: string;
  href: string;
};

export const CONTACT_INFO_ITEMS: readonly ContactInfoItem[] = [
  {
    id: 'email',
    label: 'EMAIL',
    value: 'armine.r.israyelyan@gmail.com',
    href: 'mailto:armine.r.israyelyan@gmail.com',
  },
  {
    id: 'phone',
    label: 'PHONE',
    value: '+374 94 30 43 42',
    href: 'tel:+37494304342',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    value: 'linkedin.com/in/armine-israyelyan-/',
    href: 'https://www.linkedin.com/in/armine-israyelyan-193b0b186/',
  },
] as const;

export const CONTACT_PAGE = {
  heading: ["Let's architect your", 'digital legacy.'],
  subheading:
    "Whether you have a specific project in mind or just want to explore possibilities, I'm here to translate your vision into functional art.",
  location: 'Remote / Worldwide',
  locationLabel: 'LOCATION',
  submitSuccess: 'Your message has been sent successfully!',
  submitError: 'Failed to send your message. Please try again.',
  form: {
    nameLabel: 'YOUR NAME',
    namePlaceholder: 'John Doe',
    emailLabel: 'EMAIL ADDRESS',
    emailPlaceholder: 'john@example.com',
    messageLabel: 'YOUR MESSAGE',
    messagePlaceholder: 'How can I help you build something extraordinary?',
    submitLabel: 'Send Message',
    sendingLabel: 'Sending…',
  },
} as const;
