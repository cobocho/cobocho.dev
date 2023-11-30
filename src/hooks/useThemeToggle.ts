import { ThemeFlag, currentThemeState } from '@/stores/theme';
import { useRecoilState } from 'recoil';

const useThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);

  const toggleTheme = () => {
    const changedTheme = currentTheme === ThemeFlag.light ? ThemeFlag.dark : ThemeFlag.light;
    setCurrentTheme(changedTheme);
    localStorage.setItem('dark_mode', String(changedTheme));
  };

  const setInitialTheme = () => {
    if (localStorage.getItem('dark_mode') !== undefined) {
      const localTheme = Number(localStorage.getItem('dark_mode'));
      setCurrentTheme(localTheme);
    }
  };

  return {
    currentTheme,
    toggleTheme,
    setInitialTheme,
  };
};

export default useThemeToggle;
