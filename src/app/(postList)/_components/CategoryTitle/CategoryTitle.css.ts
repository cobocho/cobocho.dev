import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';

export const postListTitleBox = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const postListTitleWrapper = style({
  display: 'flex',
  alignItems: 'flex-end',
  height: '62px',
  marginBottom: '20px',
  fontWeight: '200',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '5px',
    },
  },
});

export const postListTitle = style({
  display: 'block',
  marginRight: '10px',
  textTransform: 'uppercase',
  fontSize: '48px',
  lineHeight: '1.1',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      fontSize: '36px',
    },
  },
});

export const postListDescription = style({
  position: 'relative',
  bottom: '6px',
  color: Theme.secondary,
  fontSize: '24px',
  fontWeight: '100',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      bottom: '0',
      fontSize: '20px',
    },
  },
});
