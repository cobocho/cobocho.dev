import { ThemeFlag, useThemeToggle } from '@/hooks/useThemeToggle';

import { DarkIcon, LightIcon } from '../../Icons';
import {
  themeButton,
  themeButtonContainer,
  toggleButtonBox,
  togglerIcons,
} from './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <div className={toggleButtonBox} onClick={toggleTheme}>
      <div className={togglerIcons}>
        <DarkIcon />
        <LightIcon />
      </div>
      <label htmlFor="dark-mode" />
      <button
        value={theme === ThemeFlag.dark ? 'dark' : 'light'}
        data-testid="dark-mode"
        className={themeButtonContainer}
      >
        <span className={themeButton}>다크 모드 버튼</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
