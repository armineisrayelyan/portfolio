import './style.css';

import { Col, Row } from 'antd';

import { ContactFormPanel } from '../../components/ContactFormPanel';
import { ContactInfoPanel } from '../../components/ContactInfoPanel';
import { CONTACT_PAGE } from './consts';

export function Contact() {
  return (
    <div className="ContactPage">
      <div className="ContactHero">
        <div className="ContactHeroHeading">
          <span className="ContactHeroLine1">{CONTACT_PAGE.heading[0]}</span>
          <span className="ContactHeroAccent">{CONTACT_PAGE.heading[1]}</span>
        </div>
        <p className="ContactHeroSubheading">{CONTACT_PAGE.subheading}</p>
      </div>

      <Row gutter={[40, 32]} align="top">
        <Col xs={24} md={10}>
          <ContactInfoPanel />
        </Col>
        <Col xs={24} md={14}>
          <ContactFormPanel />
        </Col>
      </Row>
    </div>
  );
}
