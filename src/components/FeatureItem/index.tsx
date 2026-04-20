import './style.css';

import type { ReactNode } from 'react';

import { FEATURE_ITEM_CLASSNAME } from './consts';

export type FeatureItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className={FEATURE_ITEM_CLASSNAME}>
      <div className="FeatureItemIcon">{icon}</div>
      <div>
        <div className="FeatureItemTitle">{title}</div>
        <div className="FeatureItemDescription">{description}</div>
      </div>
    </div>
  );
}

