import { ABOUT } from '../../pages/About/consts';

export const ABOUT_SIDE = {
  education: {
    eyebrow: 'Formation',
    ...ABOUT.education,
  },
  languages: {
    eyebrow: 'Communication',
    ...ABOUT.languages,
  },
} as const;
