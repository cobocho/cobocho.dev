import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const postContentImageWrapper = style({
  position: 'relative',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '20px',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint})`]: {
      width: '100%',
    },
  },
});

export const postContentImageBox = style({
  position: 'relative',
});

export const postContentImage = style({
  borderRadius: '10px',
  backgroundColor: Theme.contrast,
});

export const postContentImageDescription = style({
  color: Theme.secondary,
});
