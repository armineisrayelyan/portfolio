import './style.css';

import { CodeOutlined, DatabaseOutlined, ToolOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

import { GlassCard } from '../GlassCard';
import { ABOUT_ECOSYSTEM } from './consts';

type EcosystemGroup = (typeof ABOUT_ECOSYSTEM.groups)[number];

function EcosystemIcon({ icon }: { icon: EcosystemGroup['icon'] }) {
  if (icon === 'code') return <CodeOutlined />;
  if (icon === 'tool') return <ToolOutlined />;
  if (icon === 'db') return <DatabaseOutlined />;
  return <CodeOutlined />;
}

function EcosystemGroupCard({ group }: { group: EcosystemGroup }) {
  return (
    <GlassCard className="AboutEcoCard" subtle>
      <div className="AboutEcoCardHeader">
        <div className="AboutEcoCardLeft">
          <span className="AboutEcoCardIcon" aria-hidden="true">
            <EcosystemIcon icon={group.icon} />
          </span>
          <div className="AboutEcoCardTitle">{group.title}</div>
        </div>
        <div className="AboutEcoCardLabel">{group.label}</div>
      </div>

      {group.variant === 'bullets' ? (
        <ul className="AboutEcoBullets">
          {group.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : (
        <div className="AboutEcoTags">
          {group.items.map((t) => (
            <span key={t} className="AboutEcoTag">
              {t}
            </span>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

export function AboutEcosystemSection() {
  return (
    <div className="AboutEcosystemSection">
      <div className="AboutSectionHeader">
        <div className="AboutSectionEyebrow">{ABOUT_ECOSYSTEM.eyebrow}</div>
        <div className="AboutSectionTitle">{ABOUT_ECOSYSTEM.title}</div>
      </div>

      <Row gutter={[16, 16]}>
        {ABOUT_ECOSYSTEM.groups.map((g) => (
          <Col key={g.title} xs={24} md={12}>
            <EcosystemGroupCard group={g} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

