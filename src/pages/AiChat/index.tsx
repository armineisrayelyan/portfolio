import './style.css';

import { CheckOutlined, CopyOutlined, SaveOutlined, RobotOutlined } from '@ant-design/icons';
import { Alert, Button, Skeleton, Space, Tooltip, Typography } from 'antd';
import { useState } from 'react';

import { useGemini } from '../../hooks/useGemini';
import type { SavedResponse } from '../../types/savedResponse';
import { addSavedResponse } from '../../utils/savedResponsesStorage';
import { AI_CHAT } from './consts';

const { Title, Text } = Typography;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip title={copied ? AI_CHAT.copiedLabel : AI_CHAT.copyLabel}>
      <button
        type="button"
        className={`AiChatCopyBtn${copied ? ' is-copied' : ''}`}
        onClick={() => void handleCopy()}
        aria-label={copied ? AI_CHAT.copiedLabel : AI_CHAT.copyLabel}
      >
        {copied ? <CheckOutlined /> : <CopyOutlined />}
      </button>
    </Tooltip>
  );
}

export function AiChat() {
  const [prompt, setPrompt] = useState('');
  const { status, response, error, ask, reset } = useGemini();
  const [saved, setSaved] = useState(false);

  const isLoading = status === 'loading';

  const handleSubmit = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isLoading) return;
    await ask(trimmed);
  };

  const handleReset = () => {
    setPrompt('');
    reset();
    setSaved(false);
  };

  const handleSave = () => {
    if (!response) return;
    const trimmedPrompt = prompt.trim();
    const item: SavedResponse = {
      id: `${Date.now()}`,
      response,
    };
    addSavedResponse(item);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      void handleSubmit();
    }
  };

  return (
    <div className="AiChat">
      {/* ── Header ── */}
      <div className="AiChatHeader">
        <Space align="center" size={10}>
          <RobotOutlined className="AiChatHeaderIcon" />
          <Title level={3} style={{ margin: 0 }}>
            {AI_CHAT.heading}
          </Title>
        </Space>
        <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
          {AI_CHAT.subheading}
        </Text>
      </div>

      {/* ── Suggestion chips ── */}
      <div className="AiChatSuggestions">
        {AI_CHAT.suggestions.map((s) => (
          <button
            key={s}
            type="button"
            className="AiChatSuggestionChip"
            onClick={() => setPrompt(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Input card ── */}
      <div className="AiChatInputCard">
        <textarea
          className="AiChatTextarea ant-input"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={AI_CHAT.placeholder}
          disabled={isLoading}
        />
        <div className="AiChatInputActions">
          {status !== 'idle' && (
            <Button onClick={handleReset} disabled={isLoading}>
              {AI_CHAT.resetLabel}
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => void handleSubmit()}
            loading={isLoading}
            disabled={!prompt.trim()}
          >
            {isLoading ? AI_CHAT.loadingLabel : AI_CHAT.submitLabel}
          </Button>
        </div>
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="AiChatSkeleton">
          <Skeleton active paragraph={{ rows: 4 }} title={false} />
        </div>
      )}

      {/* ── Error ── */}
      {status === 'error' && error && (
        <Alert
          className="AiChatError"
          type="error"
          showIcon
          message={AI_CHAT.errorTitle}
          description={error}
        />
      )}

      {/* ── Response: plain text + copy button ── */}
      {status === 'success' && response && (
        <div className="AiChatResponseCard">
          <div className="AiChatResponseLabel">
            <span className="AiChatResponseDot" aria-hidden="true" />
            <Text
              strong
              style={{ fontSize: 12, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              Gemini
            </Text>
            <span className="AiChatResponseLabelSpacer" />
            <Tooltip title={saved ? AI_CHAT.savedLabel : AI_CHAT.saveLabel}>
              <button
                type="button"
                className={`AiChatCopyBtn${saved ? ' is-copied' : ''}`}
                onClick={handleSave}
                aria-label={saved ? AI_CHAT.savedLabel : AI_CHAT.saveLabel}
              >
                {saved ? <CheckOutlined /> : <SaveOutlined />}
              </button>
            </Tooltip>
            <CopyButton text={response} />
          </div>
          <p className="AiChatResponseText">{response}</p>
        </div>
      )}
    </div>
  );
}
