import { createTheme, createThemeContract } from '@vanilla-extract/css';

export const ThemeColor = createThemeContract({
  theme: null,
  middle: null,

  font: {
    textColor: null,
    subColor: null,
    fontWeight: null,
  },

  toggler: {
    color: null,
    shadow: null,
    button: null,
    buttonShadow: null,
  },
});

export const LightTheme = createTheme(ThemeColor, {
  theme: '#ffffff',
  middle: '#ebebeb',

  font: {
    textColor: '#202121',
    subColor: '#a3a3a3',
    fontWeight: '400',
  },

  toggler: {
    color: '#e3e3e3',
    shadow: 'inset 6px 6px 5px #c3c3c3, inset -6px -6px 5px #fdfdfd',
    button: '#565656',
    buttonShadow: 'inset 6px 6px 5px #807d7d, inset -6px -6px 5px #696969',
  },
});

export const DarkTheme = createTheme(ThemeColor, {
  theme: '#202121',
  middle: '#383838',

  font: {
    textColor: '#ffffff',
    subColor: '#828282',
    fontWeight: '300',
  },

  toggler: {
    color: '#5c5c5c',
    shadow: 'inset 6px 6px 5px #4e4e4e, inset -6px -6px 5px #6a6a6a',
    button: '#ffffff',
    buttonShadow: 'inset 6px 6px 5px #d9d9d9, inset -6px -6px 5px #fffff',
  },
});
