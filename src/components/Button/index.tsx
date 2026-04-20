import './style.css';

import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';

import { BUTTON_CLASSNAME } from './consts';

export type ButtonProps = AntdButtonProps & {
  ghostBlur?: boolean;
};

export function Button({ className, ghostBlur, ...props }: ButtonProps) {
  const mergedClassName = [
    BUTTON_CLASSNAME,
    ghostBlur ? 'is-ghost' : null,
    className ?? null,
  ]
    .filter(Boolean)
    .join(' ');

  return <AntdButton {...props} className={mergedClassName} />;
}

