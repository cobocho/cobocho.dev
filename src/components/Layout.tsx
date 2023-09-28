import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeFlag, currentThemeState } from '@/stores/theme';
import { darkTheme, lightTheme } from '@/styles/themeStyles';
import { useRecoilState } from 'recoil';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

interface Props {
	children: JSX.Element;
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
`;

const Layout = ({ children }: Props) => {
	const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);

	useEffect(() => {
		if (localStorage.getItem('dark_mode') !== undefined) {
			const localTheme = Number(localStorage.getItem('dark_mode'));
			setCurrentTheme(localTheme);
		}
	}, [setCurrentTheme]);

	return (
		<ThemeProvider theme={currentTheme === ThemeFlag.dark ? darkTheme : lightTheme}>
			<GlobalStyle>
				<Header />
				<LayoutBox>{children}</LayoutBox>
				<Footer />
			</GlobalStyle>
		</ThemeProvider>
	);
};

export default Layout;
