import './style.css';

import { Col, Row } from 'antd';
import { useState } from 'react';

import { AiToolsSection } from '../../components/AiToolsSection';
import { FeaturedProjectCard } from '../../components/FeaturedProjectCard';
import { ProjectCard } from '../../components/ProjectCard';
import { ProjectsHeroSection } from '../../components/ProjectsHeroSection';
import type { ProjectCategory } from '../../types/project';
import { PROJECTS } from './consts';

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const gridProjects = PROJECTS.filter((p) => !p.featured);

  const visibleFeatured =
    activeFilter === 'all'
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeFilter);

  const visibleGrid =
    activeFilter === 'all'
      ? gridProjects
      : gridProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="ProjectsPage">
      <ProjectsHeroSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {visibleFeatured.length > 0 ? (
        <Row gutter={[20, 20]} className="ProjectsFeaturedRow">
          {visibleFeatured.map((p, i) => (
            <Col key={p.title} xs={24} md={i === 0 ? 14 : 10}>
              <FeaturedProjectCard project={p} />
            </Col>
          ))}
        </Row>
      ) : null}

      {visibleGrid.length > 0 ? (
        <Row gutter={[20, 20]} className="ProjectsGridRow">
          {visibleGrid.map((p) => (
            <Col key={p.title} xs={24} sm={12} md={8}>
              <ProjectCard project={p} />
            </Col>
          ))}
        </Row>
      ) : null}

      {visibleFeatured.length === 0 && visibleGrid.length === 0 ? (
        <p className="ProjectsEmpty">No projects in this category yet.</p>
      ) : null}

      <AiToolsSection />
    </div>
  );
}
