export const ABOUT = {
  rolePill: 'Software Engineer',
  heading: ['Building', 'performance', 'at scale.'],
  description:
    'I am a software engineer focused on building scalable, high-performance web applications. I enjoy collaborating in cross-functional teams, taking ownership of my work and continuously learning new technologies to improve both product quality and developer experience.',
  ctas: {
    resume: { label: 'Download Resume', href: '/resume.pdf' },
    hire: { label: 'Hire Me', to: '/contact' },
    projects: { label: 'View Projects', to: '/projects' },
  },
  trajectory: {
    eyebrow: 'Trajectory',
    title: 'Experience',
    subtitle: 'A chronicle of engineering challenges and architectural solutions.',
  },
  experience: [
    {
      role: 'Frontend Developer',
      company: 'Freelance',
      period: 'Sep 2025 — Present',
      meta: 'Full-time • Remote',
      bullets: [
        'Developed a full-stack web application using React and Next.js, with Strapi as a headless CMS and PostgreSQL as the primary database.',
        'Implemented API integration, authentication flows, and responsive UI layouts.',
        'Created a mobile application using Vibe Coding.',
        'Built scalable frontend architecture with clear separation of concerns and reusable components.'
      ],
    },
    {
      role: 'Software Engineer (Frontend / React)',
      company: 'Mamble',
      period: 'Nov 2017 — May 2024',
      meta: 'Full-time',
      bullets: [
        'Refactored and migrated legacy applications to React and Next.js, improving performance, maintainability, and scalability.',
        'Built reusable UI components using React, TypeScript, Tailwind CSS, Bootstrap, and Material UI, reducing duplication across projects.',
        'Implemented state management with Redux and Context API following best practices.',
        'Integrated REST APIs and ensured reliable data handling with proper loading and error states.',
        'Wrote and maintained unit and component tests using Jest and React Testing Library.',
        'Collaborated with cross-functional teams and supported team members through code reviews and knowledge sharing.'
      ],
    },
  ],
  ecosystem: {
    eyebrow: 'Inventory',
    title: 'Technical Skills',
    groups: [
      {
        title: 'Languages & Frameworks',
        label: 'Stack',
        icon: 'code',
        variant: 'tags',
        items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js'],
      },
      {
        title: 'Tools & Platforms',
        label: 'Tools',
        icon: 'tool',
        variant: 'tags',
        items: ['Git', 'ElasticSearch', 'Kibana', 'Twilio', 'Strapi', 'Contentful'],
      },
      {
        title: 'Databases & Testing',
        label: 'Stack',
        icon: 'db',
        variant: 'bullets',
        items: ['MongoDB / PostgreSQL', 'Jest / RTL'],
      },
      {
        title: 'State & UI',
        label: 'Tools',
        icon: 'layers',
        variant: 'bullets',
        items: ['Redux / Context API', 'Tailwind / Material UI / SASS'],
      },
    ],
  },
  education: {
    title: 'Education',
    items: [
      {
        degree: "Master's in Electronics",
        period: '2016 — 2018',
        school: 'State Engineering University of Armenia',
      },
      {
        degree: "Bachelor's in Electronic Means",
        period: '2012 — 2016',
        school: 'State Engineering University of Armenia',
      },
      {
        degree: "High School (Mathematics & Physics)",
        period: '2009-2012',
        school: 'State Engineering University of Armenia',
      },
    ],
  },
  languages: {
    title: 'Languages',
    items: ['Armenian', 'English', 'Russian'],
  },
} as const;

