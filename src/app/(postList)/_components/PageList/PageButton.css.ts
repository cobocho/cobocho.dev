import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const pageButton = style({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  transition: 'all 0.5s',
  listStyle: 'none',

  ':hover': {
    transform: 'translateY(-4px)',
  },

  selectors: {
    ['&.current-page']: {
      backgroundColor: Theme.content,
    },
  },
});

export const pageButtonLink = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  fontWeight: '500',
  fontSize: '20px',
  color: Theme.secondary,

  selectors: {
    [`${pageButton}.current-page &`]: {
      color: Theme.primary,
    },

    [`${pageButton}.current-page &:hover`]: {
      transform: 'translateY(0px)',
    },
  },
});
