import './style.css';

import { CheckOutlined, CopyOutlined, RobotOutlined, SendOutlined } from '@ant-design/icons';
import { Col, Input, Row, Tooltip, Typography } from 'antd';
import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { SAVED_RESPONSES } from '../../data/savedResponses';
import { useGemini } from '../../hooks/useGemini';
import { GlassCard } from '../GlassCard';
import { CHAT_WIDGET } from './consts';

const { Text } = Typography;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip title={copied ? CHAT_WIDGET.copiedLabel : CHAT_WIDGET.copyLabel}>
      <button
        type="button"
        className={`ChatWidgetCopyBtn${copied ? ' is-copied' : ''}`}
        onClick={() => void handleCopy()}
        aria-label={copied ? CHAT_WIDGET.copiedLabel : CHAT_WIDGET.copyLabel}
      >
        {copied ? <CheckOutlined /> : <CopyOutlined />}
      </button>
    </Tooltip>
  );
}

export function ChatWidget() {
  const [value, setValue] = useState('');
  const suggestions = useMemo(() => CHAT_WIDGET.suggestions, []);
  const { status, response, ask } = useGemini();

  const isLoading = status === 'loading';

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    // await ask(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') void handleSend();
  };

  const currentMessage = isLoading
    ? CHAT_WIDGET.thinkingLabel
    : (response ?? CHAT_WIDGET.greeting);

  return (
    <GlassCard>
      <Row gutter={[24, 24]} align="middle" className="ChatWidget">
        {/* ── Left: info + chips ── */}
        <Col xs={24} lg={12}>
          <h3 className="ChatWidgetTitle">{CHAT_WIDGET.title}</h3>
          <p className="ChatWidgetDesc">{CHAT_WIDGET.description}</p>
          <div className="ChatWidgetActions">
            {suggestions.map((s) => (
              <button
                key={s}
                className="ChatWidgetChip"
                type="button"
                onClick={() => setValue(s)}
              >
                "{s}"
              </button>
            ))}
          </div>
        </Col>

        {/* ── Right: chat panel ── */}
        <Col xs={24} lg={12}>
          <div className="ChatWidgetPanel">
            {/* bot message */}
            <div className="ChatWidgetMessageRow">
              <span
                className={`ChatWidgetBotIcon${isLoading ? ' is-loading' : ''}`}
                aria-hidden="true"
              >
                <RobotOutlined />
              </span>
              <div className="ChatWidgetBubble">
                {response && !isLoading ? (
                  <div className="ChatWidgetMarkdown">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                ) : (
                  <span>{currentMessage}</span>
                )}
              </div>
            </div>

            {/* input + send */}
            <div className="ChatWidgetInputRow">
              <Input
                className="ChatWidgetInput"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={CHAT_WIDGET.placeholder}
                size="large"
                variant="borderless"
                disabled={isLoading}
              />
              <button
                className="ChatWidgetSend"
                type="button"
                aria-label="Send message"
                onClick={() => void handleSend()}
                disabled={isLoading || !value.trim()}
              >
                <SendOutlined />
              </button>
            </div>

            {/* saved responses */}
            {SAVED_RESPONSES.length > 0 && (
              <div className="ChatWidgetSaved">
                <Text className="ChatWidgetSavedHeading">
                  {CHAT_WIDGET.savedHeading}
                </Text>
                {SAVED_RESPONSES.map((item) => (
                  <div key={item.id} className="ChatWidgetSavedItem">
                    <div className="ChatWidgetSavedItemHeader">
                      <CopyButton text={item.response} />
                    </div>
                    <div className="ChatWidgetMarkdown ChatWidgetMarkdown--saved">
                      <ReactMarkdown>{item.response}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </GlassCard>
  );
}
