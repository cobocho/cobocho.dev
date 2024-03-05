import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';

export const profilePicture = style({
  position: 'relative',
  width: '70%',
  aspectRatio: '1 / 1',
  margin: '0 auto',
  border: `solid 3px ${Theme.content}`,
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#b3b3b3',
  boxShadow: '0px 0px 50px -5px rgba(0, 0, 0, 0.2)',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
