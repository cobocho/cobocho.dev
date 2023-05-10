import React from "react"
import styled, { ThemeProvider } from 'styled-components'
import { ThemeFlag, themeState } from "@/stores/theme";
import { darkTheme, lightTheme } from "@/styles/themeStyles";
import { useRecoilValue } from 'recoil';
import GlobalStyle from "./GlobalStyle";
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'

type Props = {
	children: JSX.Element,
}
const LayoutBox = styled.main`
  width: 900px;
  min-height: calc(100vh - 80px);
  padding-top: 50px;
  padding-bottom: 100px;
  margin: 0 auto;
  font-family: sans-serif;

  @media (max-width: 900px) {
    width: 90vw;
    padding-top: 30px;
  }
`

const Layout = ({ children } : Props) => {
  const currentTheme = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={currentTheme === ThemeFlag.dark ? darkTheme : lightTheme}>
      <GlobalStyle>
        <Header/>
        <LayoutBox>
          {children}
        </LayoutBox>
        <Footer />
      </GlobalStyle>
    </ThemeProvider>
  )
}

export default Layout;