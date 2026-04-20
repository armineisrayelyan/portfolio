import './style.css';

import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import heroImg from '../../assets/hero.png';
import { Button } from '../Button';
import { Metric } from '../Metric';
import { Pill } from '../Pill';
import { HERO } from './consts';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="HeroSection">
      <Row gutter={[20, 20]} align="middle" className="HeroSectionRow">
          <Col xs={24} lg={13}>
            <Pill text={HERO.rolePill} showDot />
            <div className="HeroSectionTitle">
              {HERO.heading[0]}
              <br />
              {HERO.heading[1]}
            </div>
            <p className="HeroSectionDescription">{HERO.description}</p>
            <div className="HeroSectionActions">
              <Button type="primary" size="large" onClick={() => navigate(HERO.ctas.primary.to)}>
                {HERO.ctas.primary.label}
              </Button>
              <Button size="large" href={HERO.ctas.secondary.href} target="_blank" rel="noreferrer">
                {HERO.ctas.secondary.label}
              </Button>
            </div>
          </Col>

          <Col xs={24} lg={11}>
            <div className="HeroSectionArt">
            <img src={heroImg} alt="Hero illustration" />
              <div className="HeroSectionMetricTopRight">
                <Metric value={HERO.metrics.topRight.value} label={HERO.metrics.topRight.label} />
              </div>
              <div className="HeroSectionMetricBottomLeft">
                <Metric value={HERO.metrics.bottomLeft.value} label={HERO.metrics.bottomLeft.label} />
              </div>
            </div>
          </Col>
        </Row>
    </div>
  );
}

