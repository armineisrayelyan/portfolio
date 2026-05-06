import './style.css';

import { MailOutlined, PhoneOutlined, ShareAltOutlined } from '@ant-design/icons';

import type { ContactInfoItem } from '../../pages/Contact/consts';
import { CONTACT_INFO_ITEMS, CONTACT_PAGE } from './consts';

const ICON_MAP: Record<string, React.ReactNode> = {
  email: <MailOutlined />,
  phone: <PhoneOutlined />,
  linkedin: <ShareAltOutlined />,
};

function ContactItem({ item }: { item: ContactInfoItem }) {
  return (
    <a href={item.href} target="_blank" rel="noreferrer" className="ContactItem">
      <div className="ContactItemIcon">{ICON_MAP[item.id]}</div>
      <div className="ContactItemBody">
        <span className="ContactItemLabel">{item.label}</span>
        <span className="ContactItemValue">{item.value}</span>
      </div>
    </a>
  );
}

export function ContactInfoPanel() {
  return (
    <div className="ContactInfoPanel">
      <div className="ContactItemList">
        {CONTACT_INFO_ITEMS.map((item) => (
          <ContactItem key={item.id} item={item} />
        ))}
      </div>

      <div className="ContactLocationCard">
        <div className="ContactLocationOrb" />
        <div className="ContactLocationFooter">
          <span className="ContactLocationLabel">{CONTACT_PAGE.locationLabel}</span>
          <span className="ContactLocationValue">{CONTACT_PAGE.location}</span>
        </div>
      </div>
    </div>
  );
}
