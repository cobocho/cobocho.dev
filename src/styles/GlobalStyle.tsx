import { ThemeFlag, useThemeToggle } from '@/hooks/useThemeToggle';
import { PropsWithChildren, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './themeStyles';
import { wrapper } from './global.css';

const GlobalStyle = ({ children }: PropsWithChildren) => {
  const { theme, setLocalTheme } = useThemeToggle();

  useEffect(() => {
    setLocalTheme();
  }, [setLocalTheme]);

  return (
    <ThemeProvider theme={theme === ThemeFlag.dark ? darkTheme : lightTheme}>
      <div className={wrapper}>{children}</div>
    </ThemeProvider>
  );
};

export default GlobalStyle;
