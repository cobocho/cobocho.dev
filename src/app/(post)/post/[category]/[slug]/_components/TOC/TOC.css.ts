import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

const hederDepth = 15;

export const toc = style({
  '@media': {
    'screen and (max-width: 1500px)': {
      display: 'none',
    },
  },
});

export const tocItem = style({
  marginBottom: '0.4rem',
  fontSize: '0.9rem',
  fontWeight: '400',
  listStyle: 'none',
  transition: 'all 0.2s',

  selectors: {
    ['&.selected']: { transform: 'scale(1.05)' },
    ['&.selected::before']: {
      content: '',
      position: 'absolute',
      left: '-10px',
      top: '0',
      display: 'block',
      width: '3px',
      height: '100%',
      backgroundColor: Theme.secondary,
    },
    ['&.H2-header']: { marginLeft: `${hederDepth}px` },
    ['&.H3-header']: { marginLeft: `${hederDepth * 2}px` },
  },
});

export const tocItemLink = style({
  color: Theme.secondary,

  selectors: {
    [`${tocItem}.selected &`]: {
      color: Theme.content,
    },
  },
});
