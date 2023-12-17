import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const footer = style({
  position: 'relative',
  width: '100dvw',
  height: '80px',
  textAlign: 'center',
  fontWeight: '100',

  backgroundColor: Theme.primary,

  transition: 'all 0.5s',
});
