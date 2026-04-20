import './style.css';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';

import { useThemeMode } from '../../hooks/useThemeMode';
import { THEME_TOGGLE_LABEL } from './consts';

export function ThemeToggle() {
  const { mode, toggle } = useThemeMode();
  const checked = mode === 'dark';

  return (
    <span className="ThemeToggle" aria-label={THEME_TOGGLE_LABEL}>
      <Tooltip title={checked ? 'Switch to light theme' : 'Switch to dark theme'}>
        <Switch
          checked={checked}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          onChange={toggle}
          aria-label={THEME_TOGGLE_LABEL}
        />
      </Tooltip>
    </span>
  );
}

