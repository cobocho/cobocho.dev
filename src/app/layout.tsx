'use client';

import styled from 'styled-components';
import { PropsWithChildren } from 'react';

import StyledComponentsRegistry from '@/lib/registry';

import '@/styles/globals.css';

import { ThemeContextProvider } from '@/hooks/useThemeToggle';
import GlobalStyle from '@/styles/GlobalStyle';

import Header from './_componenets/Header/Header';
import Footer from './_componenets/Footer/Footer';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
        <meta name="naver-site-verification" content="04d43d4b82d52d0217962b5a9d60fe4c5d6f6d85" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeContextProvider>
            <GlobalStyle>
              <Header />
              <Container>{children}</Container>
              <Footer />
            </GlobalStyle>
          </ThemeContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

const Container = styled.main`
  width: 900px;
  min-height: calc(100vh - 80px);

  padding-top: 50px;
  padding-bottom: 100px;
  margin: 0 auto;

  @media (max-width: ${LAYOUT_VARIABLES.breakPoint}) {
    width: 90vw;
    padding-top: 30px;
  }
`;
