import './style.css';

import { SettingOutlined, SyncOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Input, Row } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

import heroImg from '../../assets/hero.png';
import { didCreate, didStatus } from '../../utils/didClient';
import { callGemini } from '../../utils/geminiClient';
import { FeatureItem } from '../FeatureItem';
import { Pill } from '../Pill';
import {
  VIRTUAL_SELF,
  VIRTUAL_SELF_AVATAR_URL,
  VIRTUAL_SELF_MAX_WORDS,
  VIRTUAL_SELF_VOICE_ID,
} from './consts';

type Phase = 'idle' | 'thinking' | 'speaking' | 'done' | 'error';

const POLL_MS = 2000;
const MAX_POLLS = 90;

function trimToWords(text: string, max: number): string {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
  if (words.length <= max) return words.join(' ');
  const head = words.slice(0, max).join(' ');
  return /[.!?]$/.test(head) ? head : `${head}.`;
}

export function VirtualSelfSection() {
  const [question, setQuestion] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [spokenText, setSpokenText] = useState<string | null>(null);
  const [talkId, setTalkId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pollCount = useRef(0);

  const reset = useCallback(() => {
    pollCount.current = 0;
    setPhase('idle');
    setSpokenText(null);
    setTalkId(null);
    setVideoUrl(null);
    setErrorMsg(null);
  }, []);

  const handleAsk = useCallback(async () => {
    const trimmed = question.trim();
    if (!trimmed) return;
    pollCount.current = 0;
    setErrorMsg(null);
    setVideoUrl(null);
    setSpokenText(null);
    setTalkId(null);
    setPhase('thinking');
    try {
      const answer = await callGemini(trimmed);
      const short = trimToWords(answer, VIRTUAL_SELF_MAX_WORDS);
      if (short.length < 3) throw new Error('Gemini returned an empty answer.');
      setSpokenText(short);
      setPhase('speaking');
      const { talkId: id } = await didCreate(short, VIRTUAL_SELF_VOICE_ID, VIRTUAL_SELF_AVATAR_URL);
      setTalkId(id);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Something went wrong.');
      setPhase('error');
    }
  }, [question]);

  useEffect(() => {
    if (phase !== 'speaking' || !talkId) return;
    let cancelled = false;

    const tick = async () => {
      if (cancelled) return;
      pollCount.current += 1;
      if (pollCount.current > MAX_POLLS) {
        setErrorMsg('Timed out waiting for the avatar.');
        setPhase('error');
        return;
      }
      try {
        const data = await didStatus(talkId);
        if (cancelled) return;
        if (data.resultUrl) {
          setVideoUrl(data.resultUrl);
          setPhase('done');
          return;
        }
        const terminal = ['error', 'rejected'].includes(String(data.status).toLowerCase());
        if (data.error || terminal) {
          setErrorMsg(data.error ?? 'Avatar video generation failed.');
          setPhase('error');
        }
      } catch (e) {
        if (cancelled) return;
        setErrorMsg(e instanceof Error ? e.message : 'Status check failed.');
        setPhase('error');
      }
    };

    void tick();
    const id = window.setInterval(() => void tick(), POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [phase, talkId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      void handleAsk();
    }
  };

  const busy = phase === 'thinking' || phase === 'speaking';
  const showVideo = phase === 'done' && !!videoUrl;
  const statusLabel =
    phase === 'thinking'
      ? VIRTUAL_SELF.qa.thinkingLabel
      : phase === 'speaking'
        ? VIRTUAL_SELF.qa.speakingLabel
        : null;

  return (
    <div className="VirtualSelfSectionWrap">
      <Row gutter={[22, 22]} align="middle" className="VirtualSelfSection">
        <Col xs={24} lg={12}>
          <div className={`VirtualSelfImage${showVideo ? ' is-video' : ''}`}>
            {showVideo && videoUrl ? (
              <video
                className="VirtualSelfVideo"
                src={videoUrl}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img src={heroImg} alt="Virtual self" />
            )}
            <div className="VirtualSelfCaption">{VIRTUAL_SELF.imageCaption}</div>
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

          <div className="VirtualSelfQa">
            <h4 className="VirtualSelfQaHeading">{VIRTUAL_SELF.qa.heading}</h4>
            <p className="VirtualSelfQaDesc">{VIRTUAL_SELF.qa.description}</p>

            <Input.TextArea
              className="VirtualSelfQaInput"
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={VIRTUAL_SELF.qa.placeholder}
              disabled={busy}
            />

            <div className="VirtualSelfQaActions">
              <Button
                type="primary"
                onClick={() => void handleAsk()}
                loading={busy}
                disabled={!question.trim()}
              >
                {phase === 'thinking'
                  ? VIRTUAL_SELF.qa.thinkingLabel
                  : phase === 'speaking'
                    ? VIRTUAL_SELF.qa.speakingLabel
                    : VIRTUAL_SELF.qa.askLabel}
              </Button>
              {(phase === 'done' || phase === 'error') && (
                <Button onClick={reset}>{VIRTUAL_SELF.qa.resetLabel}</Button>
              )}
            </div>

            {statusLabel ? <p className="VirtualSelfQaStatus">{statusLabel}</p> : null}

            {spokenText && phase !== 'error' ? (
              <div className="VirtualSelfQaAnswer">
                <span className="VirtualSelfQaAnswerLabel">{VIRTUAL_SELF.qa.answerLabel}</span>
                <p className="VirtualSelfQaAnswerText">“{spokenText}”</p>
              </div>
            ) : null}

            {phase === 'error' && errorMsg ? (
              <Alert
                className="VirtualSelfQaAlert"
                type="error"
                showIcon
                message={VIRTUAL_SELF.qa.errorTitle}
                description={errorMsg}
              />
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  );
}
