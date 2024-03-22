import { ThemeFlag, useTheme } from '@/hooks/useTheme';

import { DarkIcon, LightIcon } from '../../Icons';
import {
  themeButton,
  themeButtonContainer,
  toggleButtonBox,
  togglerIcons,
} from './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={toggleButtonBox} onClick={toggleTheme}>
      <div className={togglerIcons}>
        <DarkIcon />
        <LightIcon />
      </div>
      <button
        value={theme === ThemeFlag.dark ? 'dark' : 'light'}
        aria-label="dark-mode"
        className={themeButtonContainer}
      >
        <span className={themeButton}>다크 모드 버튼</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
