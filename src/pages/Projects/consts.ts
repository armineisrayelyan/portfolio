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
  { key: 'all', label: 'All' },
  { key: 'full-stack', label: 'Full-stack' },
  { key: 'mobile-systems', label: 'Mobile' },
  { key: 'frontend', label: 'Frontend' },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    title: 'Full-stack CMS & authenticated web platform',
    description:
      'Freelance build: React and Next.js front end, authentication flows, API integration, and responsive UI with a maintainable architecture.',
    techStack: ['REACT', 'EXPRESS', 'MONGO DB', 'SOCKET.IO'],
    category: 'full-stack',
    featured: true,
    coverVariant: 'blue',
    coverImage: project1Img,
  },
  {
    title: 'Mobile payment application',
    description:
      'Freelance mobile product with modern React-oriented workflows, authentication-aware flows, and polished UX alongside full-stack delivery.',
    techStack: ['REACT NATIVE', 'TYPESCRIPT', 'EXPO'],
    githubUrl: 'https://github.com/armineisrayelyan/payments-app',
    category: 'mobile-systems',
    featured: true,
    coverVariant: 'teal',
    coverImage: projectMobileImg,
  },
  {
    title: 'Call center desktop application with Twilio integration',
    description:
      'Worked on a desktop application for customer support and sales agents that supported calling, conference calls, SMS messaging, and real-time communication workflows integrated with Twilio services.',
    techStack: ['REACT', 'TYPESCRIPT', 'TWILIO', 'REST API', 'REDUX'],
    category: 'frontend',
  },
  {
    title: 'Debt relief platform frontend development',
  description:
    'Worked on the frontend experience for Freedom Debt Relief, building responsive React interfaces, reusable UI components, and customer-facing flows for debt resolution services, dashboards, and financial guidance features.',
  techStack: ['REACT', 'TYPESCRIPT', 'NEXT.JS', 'REDUX', 'REST API'],
  category: 'frontend',
  demoUrl: 'https://www.freedomdebtrelief.com/',
  },
  {
    title: 'Frontend development for Freedom Financial Network',
    description:
      'Worked on frontend features and UI improvements for Freedom Financial Network platforms focused on debt solutions, financial wellness, and customer support experiences.',
    techStack: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'SCSS'],
    category: 'frontend',
    demoUrl: 'https://www.freedomfinancialnetwork.com/',
  },
  // {
  //   title: 'Legacy frontend migration to React',
  //   description:
  //     'Mamble-era work: migrated legacy frontends to React and Next.js with clearer structure, reusable components, and more predictable state and API handling.',
  //   techStack: ['REACT', 'NEXT.JS', 'TYPESCRIPT'],
  //   category: 'full-stack',
  // },
  {
    title: 'Reusable UI systems & component libraries',
    description:
      'Shared React and TypeScript component systems with Redux and Context API, Tailwind, Bootstrap, and Material UI — less duplication and stable loading/error patterns around REST APIs.',
    techStack: ['REACT', 'REDUX', 'MATERIAL UI'],
    category: 'frontend',
  },
  {
    title: 'Scribex',
    description:
      'Website',
    techStack: ['REACT', 'NEXT.JS', 'TYPESCRIPT'],
    category: 'frontend',
    demoUrl: 'https://scribex.io/',
  },
] as const;

export const AI_TOOLS: readonly AiTool[] = [
  {
    id: 'chatbot',
    title: 'AI Chatbot',
    description:
      'A context-aware assistant that answers questions about my experience, projects, and architecture — powered by Gemini and grounded in my own knowledge base.',
    actionLabel: 'START CHAT',
    actionHref: '/ai',
  },
] as const;

export const PROJECTS_PAGE = {
  heading: ['Selected', 'Work'],
  subheading:
    'Full-stack builds, React migrations, reusable UI systems, and mobile delivery — focused on maintainable architecture, integrations, and dependable user experiences.',
  aiToolsTitle: 'AI Tools',
} as const;
