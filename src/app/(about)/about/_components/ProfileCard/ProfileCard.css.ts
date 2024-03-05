import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

export const profileCard = style({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 2fr',
  marginBottom: '40px',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
