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
  { key: 'contact', label: 'Contact', path: '/contact' },
] as const;

export const BRAND_NAME = BRAND.fullName;

export const MAIN_LAYOUT_CONSTS = {
  menuMinWidth: 420,
  drawer: {
    title: 'Menu',
    width: 280,
    openAriaLabel: 'Open navigation menu',
  },
} as const;
