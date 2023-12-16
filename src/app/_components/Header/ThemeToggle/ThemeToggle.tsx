import { useThemeToggle } from '@/hooks/useThemeToggle';
import { toggleButtonBox, togglerIcons, themeButton, themeButtonContainer } from './ThemeToggle.css';
import { DarkIcon, LightIcon } from '../../Icons';

const ThemeToggle = () => {
  const { toggleTheme } = useThemeToggle();

  return (
    <div className={toggleButtonBox} onClick={toggleTheme}>
      <div className={togglerIcons}>
        <DarkIcon />
        <LightIcon />
      </div>
      <button className={themeButtonContainer}>
        <span className={themeButton}>다크 모드 버튼</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
