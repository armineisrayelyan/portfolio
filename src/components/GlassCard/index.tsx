import './style.css';

import type { PropsWithChildren } from 'react';

import { GLASS_CARD_CLASSNAME } from './consts';

export type GlassCardProps = PropsWithChildren<{
  className?: string;
  subtle?: boolean;
}>;

export function GlassCard({ children, className, subtle }: GlassCardProps) {
  const merged = [
    GLASS_CARD_CLASSNAME,
    subtle ? 'GlassCardSubtle' : null,
    className ?? null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={merged}>
      <div className="GlassCardInner">{children}</div>
    </div>
  );
}

