import './style.css';

import { Col, Row } from 'antd';

import { AiToolCard } from '../AiToolCard';
import { AI_TOOLS, PROJECTS_PAGE } from './consts';

export function AiToolsSection() {
  return (
    <div className="AiToolsSection">
      <h2 className="AiToolsSectionTitle">{PROJECTS_PAGE.aiToolsTitle}</h2>
      <Row gutter={[16, 16]}>
        {AI_TOOLS.map((tool) => (
          <Col key={tool.id} xs={24} sm={12} md={8}>
            <AiToolCard tool={tool} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
