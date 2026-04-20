import './style.css';

import { SettingOutlined, SyncOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

import heroImg from '../../assets/hero.png';
import { FeatureItem } from '../FeatureItem';
import { Pill } from '../Pill';
import { VIRTUAL_SELF } from './consts';

export function VirtualSelfSection() {
  return (
    <div className="VirtualSelfSectionWrap">
      <Row gutter={[22, 22]} align="middle" className="VirtualSelfSection">
        <Col xs={24} lg={12}>
          <div className="VirtualSelfImage">
            <img src={heroImg} alt="Virtual self" />
            <div className="VirtualSelfCaption">
              <span className="VirtualSelfDot" />
              {VIRTUAL_SELF.imageCaption}
            </div>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <Pill text={VIRTUAL_SELF.pill} />
          <div className="VirtualSelfTitle">{VIRTUAL_SELF.title}</div>
          <p className="VirtualSelfDesc">{VIRTUAL_SELF.description}</p>

          <div className="VirtualSelfList">
            <FeatureItem
              icon={<SettingOutlined />}
              title={VIRTUAL_SELF.features[0].title}
              description={VIRTUAL_SELF.features[0].description}
            />
            <FeatureItem
              icon={<SyncOutlined />}
              title={VIRTUAL_SELF.features[1].title}
              description={VIRTUAL_SELF.features[1].description}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

