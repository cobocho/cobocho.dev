import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const toggleButtonBox = style({
  display: 'flex',
  alignItems: 'center',
  width: '60px',
  height: '30px',
  borderRadius: '15px',
  backgroundColor: Theme.toggler.color,
  boxShadow: Theme.toggler.shadow,
  userSelect: 'none',

  ':hover': {
    cursor: 'pointer',
  },
});

export const togglerIcons = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  width: '100%',
  padding: '0 6px',
  fill: Theme.content,
});

export const themeButtonContainer = style({
  width: '30px',
  height: '30px',
  position: 'absolute',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: Theme.toggler.button,
  boxShadow: Theme.toggler.buttonShadow,
  transform: Theme.toggler.transform,
  transition: 'all 0.3s',

  ':hover': {
    cursor: 'pointer',
  },
});

export const themeButton = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: '0',
  border: '0',
  clip: 'rect(0 0 0 0)',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});
