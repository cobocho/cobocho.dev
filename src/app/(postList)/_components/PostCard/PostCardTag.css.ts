import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const postCardTag = style({
  color: Theme.secondary,
  fontWeight: '700',
  transition: 'all 0.4s',
  zIndex: '90',

  ':hover': {
    transform: 'translateY(-4px)',
    color: Theme.contrast,
  },
});
