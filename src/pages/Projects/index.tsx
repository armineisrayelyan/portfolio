import './style.css';

import { Col, Row, Space, Typography } from 'antd';

import { ProjectCard } from '../../components/ProjectCard';
import { PROJECTS, PROJECTS_PAGE } from './consts';

export function Projects() {
  return (
    <div>
      <div className="ProjectsHeader">
        <Space direction="vertical" size={6} className="ProjectsHeaderStack">
          <Typography.Title level={3} className="ProjectsTitle">
            {PROJECTS_PAGE.heading}
          </Typography.Title>
          <Typography.Text type="secondary">{PROJECTS_PAGE.subheading}</Typography.Text>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        {PROJECTS.map((p) => (
          <Col key={p.title} xs={24} md={12} lg={8}>
            <ProjectCard project={p} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

