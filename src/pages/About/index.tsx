import './style.css';

import { Card, Col, Row, Space, Tag, Typography } from 'antd';

import { ABOUT } from './consts';

export function About() {
  return (
    <div className="AboutPage">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14}>
          <Card className="AboutCard">
            <Space direction="vertical" size={12} className="AboutStack">
              <Typography.Title level={3} className="AboutTitle">
                {ABOUT.heading}
              </Typography.Title>
              <Typography.Paragraph className="AboutBio">
                {ABOUT.bio}
              </Typography.Paragraph>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={10}>
          <Card title={ABOUT.sections.skills} className="AboutCard">
            <Space size={[8, 8]} wrap>
              {ABOUT.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </Space>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title={ABOUT.sections.highlights} className="AboutCard">
            <Space direction="vertical" size={10} className="AboutStack">
              {ABOUT.experienceHighlights.map((h) => (
                <Typography.Text key={h}>• {h}</Typography.Text>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

