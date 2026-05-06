import './style.css';

import { Col, Row } from 'antd';

import { GlassCard } from '../GlassCard';
import { ABOUT_EXPERIENCE } from './consts';

type ExperienceItem = (typeof ABOUT_EXPERIENCE.items)[number];

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <GlassCard className="AboutExperienceCard" subtle>
      <div className="AboutExperienceCardHeader">
        <div className="AboutExperienceCardRoleBlock">
          <div className="AboutExperienceCardRole">{item.role}</div>
          <div className="AboutExperienceCardCompany">{item.company}</div>
        </div>
        <div className="AboutExperienceCardMeta">
          <div className="AboutExperienceCardPeriod">{item.period}</div>
          <div className="AboutExperienceCardTag">{item.meta}</div>
        </div>
      </div>

      <ul className="AboutExperienceCardBullets">
        {item.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </GlassCard>
  );
}

export function AboutExperienceSection() {
  return (
    <div className="AboutExperienceSection">
      <div className="AboutSectionHeader">
        <div className="AboutSectionEyebrow">{ABOUT_EXPERIENCE.eyebrow}</div>
        <div className="AboutSectionTitleRow">
          <div className="AboutSectionTitle">{ABOUT_EXPERIENCE.title}</div>
          <div className="AboutSectionSubtitle">{ABOUT_EXPERIENCE.subtitle}</div>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {ABOUT_EXPERIENCE.items.map((item) => (
          <Col key={`${item.company}-${item.role}`} xs={24}>
            <ExperienceCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

