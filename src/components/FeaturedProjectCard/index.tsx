import './style.css';

import { GithubOutlined, LinkOutlined } from '@ant-design/icons';

import type { Project } from '../../types/project';
import { FEATURED_CARD_LABELS } from './consts';

export type FeaturedProjectCardProps = {
  project: Project;
};

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const coverClass = [
    'FeaturedProjectCardCover',
    project.coverVariant ? `FeaturedProjectCardCover--${project.coverVariant}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="FeaturedProjectCard">
      <div className={coverClass}>
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="FeaturedProjectCardCoverImg"
          />
        ) : null}
      </div>

      <div className="FeaturedProjectCardBody">
        <div className="FeaturedProjectCardTags">
          {project.techStack.map((t) => (
            <span key={t} className="FeaturedProjectCardTag">
              {t}
            </span>
          ))}
        </div>

        <h3 className="FeaturedProjectCardTitle">{project.title}</h3>

        <div className="FeaturedProjectCardDivider" />

        <div className="FeaturedProjectCardActions">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="FeaturedCardGithubBtn"
            >
              <GithubOutlined />
              {FEATURED_CARD_LABELS.github}
            </a>
          ) : null}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="FeaturedCardProjectBtn"
            >
              <LinkOutlined />
              {FEATURED_CARD_LABELS.project}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
