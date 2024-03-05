import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

export const container = style({
  width: `${LAYOUT_VARIABLES.breakPoint}px`,
  minHeight: 'calc(100vh - 80px)',

  paddingTop: '50px',
  paddingBottom: '100px',
  margin: [0, 'auto'],

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      width: '90dvw',
      paddingTop: '30px',
    },
  },
});
