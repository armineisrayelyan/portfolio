import type { Project } from '../../types/project';

export const PROJECTS: readonly Project[] = [
  {
    title: 'Dashboard UI Kit',
    description:
      'A responsive admin dashboard with charts, tables, filters, and a token-driven theme system.',
    techStack: ['React', 'TypeScript', 'Ant Design'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'E-commerce Product Page',
    description:
      'A performant product listing with search, sorting, pagination, and accessible UI controls.',
    techStack: ['React', 'Performance', 'A11y'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Component Playground',
    description:
      'Reusable components with strict typing, story-like examples, and consistent interactions.',
    techStack: ['Design System', 'TypeScript', 'DX'],
    githubUrl: '#',
    demoUrl: '#',
  },
] as const;

export const PROJECTS_PAGE = {
  heading: 'Projects',
  subheading: 'Selected work and experiments. Click through for code or a live demo.',
} as const;

