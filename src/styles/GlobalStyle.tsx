import { ThemeFlag, useThemeToggle } from '@/hooks/useThemeToggle';
import { PropsWithChildren, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './themeStyles';

const GlobalStyle = ({ children }: PropsWithChildren) => {
  const { theme, setLocalTheme } = useThemeToggle();

  useEffect(() => {
    setLocalTheme();
  }, [setLocalTheme]);

  return (
    <ThemeProvider theme={theme === ThemeFlag.dark ? darkTheme : lightTheme}>
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

  position: relative;

  background-color: ${({ theme }) => theme.theme};

  font-family: Pretendard, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeight};
  color: ${({ theme }) => theme.content};

  transition: background-color 0.5s;

  a {
    color: ${({ theme }) => theme.content};
  }
`;

export default GlobalStyle;
