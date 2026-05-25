import './style.css';

import { MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { AI_TOOLS } from './consts';

export function AiToolsSection() {
  const tool = AI_TOOLS[0];
  const navigate = useNavigate();

  if (!tool) return null;

  function handleAction() {
    if (!tool) return;
    if (tool.actionHref?.startsWith('/')) {
      navigate(tool.actionHref);
    } else if (tool.actionHref) {
      window.open(tool.actionHref, '_blank');
    }
  }

  return (
    <div className="AiToolsSection">
      <div className="AiToolsBanner">
        <div className="AiToolsBannerLeft">
          <span className="AiToolsBannerIcon">
            <MessageOutlined />
          </span>
          <div>
            <h3 className="AiToolsBannerTitle">{tool.title}</h3>
            <p className="AiToolsBannerDesc">{tool.description}</p>
          </div>
        </div>
        <button
          type="button"
          className="AiToolsBannerBtn"
          onClick={handleAction}
          disabled={!tool.actionHref}
        >
          {tool.actionLabel}
        </button>
      </div>
    </div>
  );
}
