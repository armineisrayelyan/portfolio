import './style.css';

import type { ReactNode } from 'react';

import { PILL_CLASSNAME } from './consts';

export type PillProps = {
  text: string;
  icon?: ReactNode;
  showDot?: boolean;
};

export function Pill({ text, icon, showDot }: PillProps) {
  return (
    <span className={PILL_CLASSNAME}>
      {showDot ? <span className="PillDot" /> : null}
      {icon}
      {text}
    </span>
  );
}

