import './style.css';

import { FileTextOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import type { AiTool } from '../../pages/Projects/consts';

const ICON_MAP: Record<string, React.ReactNode> = {
  'cv-writer': <FileTextOutlined />,
  chatbot: <MessageOutlined />,
  'cover-letter': <MailOutlined />,
};

export type AiToolCardProps = {
  tool: AiTool;
};

export function AiToolCard({ tool }: AiToolCardProps) {
  const navigate = useNavigate();

  function handleAction() {
    if (tool.actionHref?.startsWith('/')) {
      navigate(tool.actionHref);
    } else if (tool.actionHref) {
      window.open(tool.actionHref, '_blank');
    }
  }

  return (
    <div className="AiToolCard">
      <div className={`AiToolCardIcon AiToolCardIcon--${tool.id}`}>
        {ICON_MAP[tool.id]}
      </div>
      <h4 className="AiToolCardTitle">{tool.title}</h4>
      <p className="AiToolCardDesc">{tool.description}</p>
      <button
        type="button"
        className="AiToolCardBtn"
        onClick={handleAction}
        disabled={!tool.actionHref}
      >
        {tool.actionLabel}
      </button>
    </div>
  );
}
