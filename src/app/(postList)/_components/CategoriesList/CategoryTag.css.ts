import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';

export const categoryTag = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  height: 'fit-content',
  padding: '8px 18px 6px 18px',
  marginRight: '8px',
  marginBottom: '10px',
  borderRadius: '20px',
  border: `1px solid ${Theme.contrast}`,
  backgroundColor: Theme.primary,
  whiteSpace: 'nowrap',
  fontSize: '20px',
  fontWeight: '700',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  transition: 'all 0.5s',

  ':hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 8px 13px -4px rgba(0, 0, 0, 0.2)',
  },

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      fontSize: '18px',
    },
  },

  selectors: {
    ['&.current']: {
      backgroundColor: Theme.content,
      color: Theme.primary,
    },
  },
});

export const categoryQuantity = style({
  marginLeft: '6px',
  fontWeight: '100',
  fontSize: '0.7em',
});
