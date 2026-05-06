import './style.css';

import { Col, Row } from 'antd';

import { AboutEducationLanguagesSection } from '../../components/AboutEducationLanguagesSection';
import { AboutEcosystemSection } from '../../components/AboutEcosystemSection';
import { AboutExperienceSection } from '../../components/AboutExperienceSection';
import { AboutHeroSection } from '../../components/AboutHeroSection';

export function About() {
  return (
    <div className="AboutPage">
      <AboutHeroSection />

      <Row gutter={[18, 18]} className="AboutGrid" align="top">
        <Col xs={24} lg={24}>
          <AboutExperienceSection />
        </Col>
      </Row>
      <Row gutter={[18, 18]} className="AboutGrid" align="top">
        <Col xs={24} lg={16}>
          <AboutEcosystemSection />
        </Col>
        <Col xs={24} lg={8}>
          <AboutEducationLanguagesSection />
        </Col>
      </Row>
    </div>
  );
}

