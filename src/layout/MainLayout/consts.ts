import { BRAND } from '../../utils/brand';

export type NavItem = {
  key: string;
  label: string;
  path: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'projects', label: 'Projects', path: '/projects' },
] as const;

export const NAV_CTA: NavItem = { key: 'contact', label: 'Contact', path: '/contact' };

export const BRAND_NAME = BRAND.fullName;
export const FOOTER_ROLE = 'Software Developer';

export const FOOTER_LINKS = [
  { key: 'website', href: 'https://github.com/', ariaLabel: 'Website' },
  { key: 'terminal', href: 'https://github.com/', ariaLabel: 'GitHub' },
  { key: 'email', href: 'mailto:you@example.com', ariaLabel: 'Email' },
] as const;

export const MAIN_LAYOUT_CONSTS = {
  drawer: {
    title: 'Menu',
    width: 280,
    openAriaLabel: 'Open navigation menu',
  },
} as const;
