import { style } from '@vanilla-extract/css';

export const postHeaderTitle = style({
  fontSize: '60px',
  fontWeight: '800',
  wordBreak: 'keep-all',

  ':hover': {
    fontSize: '40px',
  },
});
