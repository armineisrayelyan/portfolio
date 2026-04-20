import './style.css';

import { SendOutlined } from '@ant-design/icons';
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
      <Row gutter={[18, 18]} align="stretch" className="ChatWidget">
        <Col xs={24} lg={11}>
          <h3 className="ChatWidgetTitle">{CHAT_WIDGET.title}</h3>
          <p className="ChatWidgetDesc">{CHAT_WIDGET.description}</p>
          <div className="ChatWidgetSpacer" />
          <div className="ChatWidgetActions">
            {suggestions.map((s) => (
              <button
                key={s}
                className="ChatWidgetChip"
                type="button"
                onClick={() => onSuggestion(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </Col>

        <Col xs={24} lg={13}>
          <div className="ChatWidgetPanel">
            <div className="ChatWidgetBubble">{CHAT_WIDGET.greeting}</div>
            <div className="ChatWidgetInputRow">
              <Input
                className="ChatWidgetInput"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={CHAT_WIDGET.placeholder}
                size="large"
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

