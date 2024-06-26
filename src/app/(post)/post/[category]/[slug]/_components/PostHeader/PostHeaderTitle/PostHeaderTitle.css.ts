import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

export const postHeaderTitle = style({
  fontSize: '60px',
  fontWeight: '600',
  wordBreak: 'keep-all',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      fontSize: '40px',
    },
  },
});
