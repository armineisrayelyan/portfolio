import './style.css';

import { GithubOutlined, LinkOutlined } from '@ant-design/icons';

import type { Project } from '../../types/project';
import { PROJECT_CARD_CLASSNAME, PROJECT_CARD_LABELS } from './consts';

export type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={PROJECT_CARD_CLASSNAME}>
      <div className="ProjectCardTags">
        {project.techStack.map((t) => (
          <span key={t} className="ProjectCardTag">
            {t}
          </span>
        ))}
      </div>

      <h3 className="ProjectCardTitle">{project.title}</h3>

      <div className="ProjectCardDivider" />

      <div className="ProjectCardActions">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="ProjectCardGithubBtn"
          >
            <GithubOutlined />
            {PROJECT_CARD_LABELS.github}
          </a>
        ) : null}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="ProjectCardProjectBtn"
          >
            <LinkOutlined />
            {PROJECT_CARD_LABELS.project}
          </a>
        ) : null}
      </div>
    </div>
  );
}
