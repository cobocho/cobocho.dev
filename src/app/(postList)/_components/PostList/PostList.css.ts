import { globalStyle, style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

export const postList = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '30px',
  marginBottom: '100px',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});

globalStyle(`${postList}.row`, {
  gridTemplateColumns: '1fr',
});
