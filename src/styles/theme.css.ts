import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const Theme = createThemeContract({
  primary: null,
  secondary: null,
  contrast: null,
  content: null,

  fontWeight: null,

  toggler: {
    color: null,
    shadow: null,
    button: null,
    buttonShadow: null,
    transform: null,
  },
});

export const LightTheme = createTheme(Theme, {
  primary: '#ffffff',
  secondary: '#a3a3a3',
  contrast: '#ebebeb',
  content: '#202121',

  fontWeight: '400',

  toggler: {
    color: '#e3e3e3',
    shadow: 'inset 6px 6px 5px #c3c3c3, inset -6px -6px 5px #fdfdfd',
    button: '#565656',
    buttonShadow: 'inset 6px 6px 5px #807d7d, inset -6px -6px 5px #696969',
    transform: 'translateX(0px)',
  },
});

export const DarkTheme = createTheme(Theme, {
  primary: '#202121',
  secondary: '#a3a3a3',
  contrast: '#383838',
  content: '#ffffff',

  fontWeight: '300',

  toggler: {
    color: '#5c5c5c',
    shadow: 'inset 6px 6px 5px #4e4e4e, inset -6px -6px 5px #6a6a6a',
    button: '#ffffff',
    buttonShadow: 'inset 6px 6px 5px #d9d9d9, inset -6px -6px 5px #fffff',
    transform: 'translateX(30px)',
  },
});
