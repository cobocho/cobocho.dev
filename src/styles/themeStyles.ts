import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
	theme: '#ffffff',
	middle: '#ebebeb',
	content: '#202121',
	subContent: '#a3a3a3',

	fontWeight: '400',

	togglerColor: '#e3e3e3',
	togglerButtonColor: '#565656',
	togglerButtonShadow: 'inset 6px 6px 5px #807d7d, inset -6px -6px 5px #696969',
	togglerShadow: 'inset 6px 6px 5px #c3c3c3, inset -6px -6px 5px #fdfdfd',
};

export const darkTheme: DefaultTheme = {
	theme: '#202121',
	middle: '#383838',
	content: '#ffffff',
	subContent: '#828282',

	fontWeight: '300',

	togglerColor: '#5c5c5c',
	togglerButtonColor: '#fff',
	togglerButtonShadow: 'inset 6px 6px 5px #d9d9d9, inset -6px -6px 5px #fffff',
	togglerShadow: 'inset 6px 6px 5px #4e4e4e, inset -6px -6px 5px #6a6a6a',
};

export const theme = {
	lightTheme,
	darkTheme,
};

export default theme;
