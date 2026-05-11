import '../HeroSection/style.css';
import './style.css';

import { DownloadOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import heroImg from '../../assets/hero.jpeg';
import { Button } from '../Button';
import { Metric } from '../Metric';
import { Pill } from '../Pill';
import { HERO } from '../HeroSection/consts';
import { ABOUT_HERO } from './consts';

export function AboutHeroSection() {
  const navigate = useNavigate();

  return (
    <div className="AboutHeroSection">
      <Row gutter={[20, 20]} align="middle" className="AboutHeroSectionRow">
        <Col xs={24} lg={13}>
          <Pill text={ABOUT_HERO.rolePill} showDot />
          <div className="HeroSectionTitle">
            {ABOUT_HERO.heading[0]}{' '}
            <span className="AboutHeroSectionAccent">{ABOUT_HERO.heading[1]}</span>
            <br />
            {ABOUT_HERO.heading[2]}
          </div>
          <p className="HeroSectionDescription">{ABOUT_HERO.description}</p>

          <div className="HeroSectionActions">
            <a
              className="ant-btn ant-btn-primary ant-btn-lg AppButton"
              href={ABOUT_HERO.ctas.resume.href}
              download
            >
              <DownloadOutlined />
              {ABOUT_HERO.ctas.resume.label}
            </a>
            <Button size="large" onClick={() => navigate(ABOUT_HERO.ctas.hire.to)}>
              {ABOUT_HERO.ctas.hire.label}
            </Button>
            <Button size="large" onClick={() => navigate(ABOUT_HERO.ctas.projects.to)}>
              {ABOUT_HERO.ctas.projects.label}
            </Button>
          </div>
        </Col>

        <Col xs={24} lg={11}>
          <div className="HeroSectionArt">
            <div className="HeroSectionArtDecor" aria-hidden>
              <span className="HeroSectionArtCircle HeroSectionArtCircle--1" />
              <span className="HeroSectionArtCircle HeroSectionArtCircle--2" />
              <span className="HeroSectionArtCircle HeroSectionArtCircle--3" />
            </div>
            <span className="HeroSectionArtDotGrid HeroSectionArtDotGrid--tr" aria-hidden />
            <span className="HeroSectionArtDotGrid HeroSectionArtDotGrid--bc" aria-hidden />
            <div className="HeroSectionArtPhoto">
              <img src={heroImg} alt="Portrait" />
            </div>
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

