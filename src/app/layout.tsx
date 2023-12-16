'use client';

import styled from 'styled-components';
import { PropsWithChildren } from 'react';

import StyledComponentsRegistry from '@/lib/registry';

import '@/styles/globals.css';

import { ThemeContextProvider } from '@/hooks/useThemeToggle';
import GlobalStyle from '@/styles/GlobalStyle';

import LAYOUT_VARIABLES from '@/styles/layout-variables';
import Footer from './_components/Footer/Footer';
import Header from './_components/Header/Header';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/seo/favicons/apple-icon-57x57.png"></link>
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/seo/favicons/apple-icon-60x60.png"></link>
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/seo/favicons/apple-icon-72x72.png"></link>
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/seo/favicons/apple-icon-76x76.png"></link>
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/seo/favicons/apple-icon-114x114.png"></link>
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/seo/favicons/apple-icon-120x120.png"></link>
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/seo/favicons/apple-icon-144x144.png"></link>
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/seo/favicons/apple-icon-152x152.png"></link>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/seo/favicons/apple-icon-180x180.png"></link>
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/seo/favicons/android-icon-192x192.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/seo/favicons/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/seo/favicons/favicon-96x96.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/seo/favicons/favicon-16x16.png"></link>
        <link rel="icon" href="/assets/seo/favicons/favicon.ico" />
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
