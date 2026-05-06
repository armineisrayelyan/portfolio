import project1Img from '../../assets/project_1.png';
import projectMobileImg from '../../assets/project_mobile.png';
import type { Project, ProjectCategory } from '../../types/project';

export type AiTool = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
};

export type FilterChip = {
  key: ProjectCategory;
  label: string;
};

export const FILTER_CHIPS: readonly FilterChip[] = [
  { key: 'all', label: 'All Architecture' },
  { key: 'full-stack', label: 'Full-Stack' },
  { key: 'mobile-systems', label: 'Mobile Systems' },
  { key: 'ui-ux', label: 'UI/UX Craft' },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    title: 'Full-stack App: Architectural Hub',
    description:
      'A robust full-stack platform showcasing modern architectural patterns with server-side rendering, real-time data, and payment integration.',
    techStack: ['NEXT.JS', 'STRIPE', 'POSTGRESQL'],
    category: 'architecture',
    githubUrl: '#',
    demoUrl: '#',
    featured: true,
    coverVariant: 'blue',
    coverImage: project1Img,
  },
  {
    title: 'Mobile Experience Engine',
    description:
      'A cross-platform mobile framework optimised for silky 60 fps animations and native-feel interactions.',
    techStack: ['REACT NATIVE'],
    category: 'mobile-systems',
    githubUrl: '#',
    demoUrl: '#',
    featured: true,
    coverVariant: 'purple',
    coverImage: projectMobileImg,
  },
  {
    title: 'Kinetic UI Framework',
    description:
      'A declarative animation toolkit built on GSAP, providing composable motion primitives with full TypeScript support.',
    techStack: ['TYPESCRIPT', 'GSAP'],
    category: 'ui-ux',
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Serverless Edge Node',
    description:
      'Distributed edge-computing infrastructure on AWS Lambda@Edge for sub-50 ms global API responses.',
    techStack: ['NODE.JS', 'AWS'],
    category: 'full-stack',
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Enterprise Data Viz',
    description:
      'Executive-grade data visualisation dashboard rendering millions of data points via WebGL-backed D3 renderers.',
    techStack: ['D3.JS', 'TAILWIND'],
    category: 'architecture',
    githubUrl: '#',
    demoUrl: '#',
  },
] as const;

export const AI_TOOLS: readonly AiTool[] = [
  {
    id: 'cv-writer',
    title: 'AI CV Writer',
    description:
      'Optimise your professional profile with our proprietary LLM tuned for high-conversion tech roles.',
    actionLabel: 'LAUNCH TOOL',
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot',
    description:
      'A context-aware assistant capable of answering technical queries about my codebase and architecture.',
    actionLabel: 'START CHAT',
    actionHref: '/ai',
  },
  {
    id: 'cover-letter',
    title: 'AI Cover Letter',
    description:
      'Generate tailored, punchy cover letters that highlight your unique value proposition in seconds.',
    actionLabel: 'LAUNCH TOOL',
  },
] as const;

export const PROJECTS_PAGE = {
  heading: ['Engineered Digital', 'Experiences'],
  subheading:
    'A curation of high-performance systems, intuitive interfaces, and scalable architectures built with technical precision and editorial flair.',
  aiToolsTitle: 'AI Tools',
} as const;
