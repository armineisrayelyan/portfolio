export type ProjectCategory = 'all' | 'architecture' | 'full-stack' | 'mobile-systems' | 'ui-ux';

export type Project = {
  title: string;
  description: string;
  techStack: readonly string[];
  category: ProjectCategory;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  coverImage?: string;
  coverVariant?: 'blue' | 'purple';
};
