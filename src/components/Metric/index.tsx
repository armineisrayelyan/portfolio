import './style.css';

import { METRIC_CLASSNAME } from './consts';

export type MetricProps = {
  value: string;
  label: string;
  className?: string;
};

export function Metric({ value, label, className }: MetricProps) {
  const merged = [METRIC_CLASSNAME, className ?? null].filter(Boolean).join(' ');
  return (
    <div className={merged}>
      <div className="MetricValue">{value}</div>
      <div className="MetricLabel">{label}</div>
    </div>
  );
}

