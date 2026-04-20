import './style.css';

import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { Card, Space, Tag, Typography } from 'antd';

import type { Project } from '../../types/project';
import { PROJECT_CARD_CLASSNAME, PROJECT_CARD_LABELS } from './consts';

export type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={PROJECT_CARD_CLASSNAME}>
      <Card
        className="ProjectCardCard"
        title={project.title}
        extra={
          <Space size={10} className="ProjectCardLinks">
            {project.githubUrl ? (
              <Typography.Link href={project.githubUrl} target="_blank" rel="noreferrer">
                <Space size={6}>
                  <GithubOutlined />
                  {PROJECT_CARD_LABELS.github}
                </Space>
              </Typography.Link>
            ) : null}
            {project.demoUrl ? (
              <Typography.Link href={project.demoUrl} target="_blank" rel="noreferrer">
                <Space size={6}>
                  <LinkOutlined />
                  {PROJECT_CARD_LABELS.demo}
                </Space>
              </Typography.Link>
            ) : null}
          </Space>
        }
      >
        <Typography.Paragraph className="ProjectCardDescription">
          {project.description}
        </Typography.Paragraph>
        <Space size={[8, 8]} wrap>
          {project.techStack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Space>
      </Card>
    </div>
  );
}

