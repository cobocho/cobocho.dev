import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const pageListWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '30px',
});

export const pageList = style({
  width: 'fit-content',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  listStyle: 'none',

  selectors: {
    ['&:last-child']: {
      marginRight: '0',
    },
  },
});

export const arrowButton = style({
  width: '40px',
  height: '40px',
  border: 'none',
  backgroundColor: 'transparent',
  fontWeight: '800',

  ':disabled': {
    color: Theme.secondary,
  },

  ':hover': {
    cursor: 'pointer',
  },
});
