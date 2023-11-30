import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '@/styles/themeStyles';
import GlobalStyle from '../styles/GlobalStyle';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { ThemeFlag, useThemeToggle } from '@/hooks/useThemeToggle';

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  const { theme, setLocalTheme } = useThemeToggle();

  useEffect(() => {
    setLocalTheme();
  }, [setLocalTheme]);

  return (
    <ThemeProvider theme={theme === ThemeFlag.dark ? darkTheme : lightTheme}>
      <GlobalStyle>
        <Header />
        <Container>{children}</Container>
        <Footer />
      </GlobalStyle>
    </ThemeProvider>
  );
};

const Container = styled.main`
  width: 900px;
  min-height: calc(100vh - 80px);
  padding-top: 50px;
  padding-bottom: 100px;
  margin: 0 auto;

  @media (max-width: 900px) {
    width: 90vw;
    padding-top: 30px;
  }
`;

export default Layout;
