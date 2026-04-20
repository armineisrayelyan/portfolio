import './style.css';

import { RobotOutlined, SendOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import { useMemo, useState } from 'react';

import { GlassCard } from '../GlassCard';
import { CHAT_WIDGET } from './consts';

export function ChatWidget() {
  const [value, setValue] = useState('');
  const suggestions = useMemo(() => CHAT_WIDGET.suggestions, []);

  const onSuggestion = (text: string) => setValue(text);

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
                onClick={() => onSuggestion(s)}
              >
                "{s}"
              </button>
            ))}
          </div>
        </Col>

        {/* ── Right: chat panel ── */}
        <Col xs={24} lg={12}>
          <div className="ChatWidgetPanel">
            {/* bot greeting message */}
            <div className="ChatWidgetMessageRow">
              <span className="ChatWidgetBotIcon" aria-hidden="true">
                <RobotOutlined />
              </span>
              <div className="ChatWidgetBubble">{CHAT_WIDGET.greeting}</div>
            </div>

            {/* input + send */}
            <div className="ChatWidgetInputRow">
              <Input
                className="ChatWidgetInput"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={CHAT_WIDGET.placeholder}
                size="large"
                variant="borderless"
              />
              <button className="ChatWidgetSend" type="button" aria-label="Send message">
                <SendOutlined />
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </GlassCard>
  );
}
