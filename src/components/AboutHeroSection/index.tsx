import './style.css';

import { DownloadOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import heroImg from '../../assets/hero.png';
import { Button } from '../Button';
import { GlassCard } from '../GlassCard';
import { Pill } from '../Pill';
import { ABOUT_HERO } from './consts';

export function AboutHeroSection() {
  const navigate = useNavigate();

  return (
    <>
      <Row gutter={[24, 24]} align="middle" className="AboutHeroSectionRow">
        <Col xs={24} lg={13}>
          <Pill text={ABOUT_HERO.rolePill} showDot />
          <div className="AboutHeroSectionTitle">
            {ABOUT_HERO.heading[0]} <span className="AboutHeroSectionAccent">{ABOUT_HERO.heading[1]}</span>
            <br />
            {ABOUT_HERO.heading[2]}
          </div>
          <p className="AboutHeroSectionDescription">{ABOUT_HERO.description}</p>

          <div className="AboutHeroSectionActions">
            <a
              className="ant-btn ant-btn-primary ant-btn-lg AppButton"
              href={ABOUT_HERO.ctas.resume.href}
              download
              // #region agent log
              onClick={(e) => {
                fetch('http://127.0.0.1:7486/ingest/be23e291-df61-4d50-aa81-48ef06265107',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'6c017e'},body:JSON.stringify({sessionId:'6c017e',runId:'pre-fix',hypothesisId:'H2',location:'AboutHeroSection/index.tsx:resumeClick',message:'Resume link clicked (AboutHeroSection)',data:{href:(e.currentTarget as HTMLAnchorElement).getAttribute('href'),hasDownload:(e.currentTarget as HTMLAnchorElement).hasAttribute('download'),tag:(e.currentTarget as HTMLAnchorElement).tagName},timestamp:Date.now()})}).catch(()=>{});
              }}
              // #endregion
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
          <div className="AboutHeroSectionArt">
            <img src={heroImg} alt="Profile illustration" />
          </div>
        </Col>
      </Row>
    </>
  );
}

