import { ABOUT } from '../../pages/About/consts';

export const ABOUT_EXPERIENCE = {
  ...ABOUT.trajectory,
  items: ABOUT.experience,
} as const;

