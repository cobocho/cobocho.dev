import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

export const headerWrapper = style({
  display: 'flex',
  alignItems: 'center',
  position: 'sticky',
  top: '0',
  left: '0',
  width: '100dvw',
  height: `${LAYOUT_VARIABLES.headerHeight}px`,
  backgroundColor: 'rgba(0, 0, 0, 0.813)',
  zIndex: `${LAYOUT_VARIABLES.headerZIndex}`,
  boxShadow: '0px 4px 10px 5px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(10px)',
  fontWeight: '100',
  fontFamily: 'sans-serif',
  color: '#fff',
  transition: 'all 0.5s',

  selectors: {
    '&.hide': {
      top: `-${LAYOUT_VARIABLES.headerHeight}px`,
      boxShadow: 'none',
    },
    '&.top': {
      boxShadow: 'none',
    },
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  width: `${LAYOUT_VARIABLES.breakPoint}px`,
  height: '100%',
  margin: '0 auto',
  overflow: 'hidden',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      padding: '0 20px',
    },
  },
});

export const headerLink = style({
  marginRight: '30px',
  fontSize: '20px',
  color: '#fff',
  transition: 'color 0.3s',

  ':hover': {
    color: '#acacac',
  },

  selectors: {
    '&.main-link': {
      fontSize: '32px',
      marginRight: '30px',
    },
  },

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      fontSize: '16px',
      marginRight: '10px',
      transition: 'transform 0.3s',

      selectors: {
        '&.main-link': {
          fontSize: '24px',
          marginRight: '15px',
        },
      },
    },
  },
});

export const headerRightSection = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
});

export const search = style({
  position: 'relative',
  top: '3px',
  fill: '#fff',
  transition: 'fill 0.3s',

  ':hover': {
    fill: '#acacac',
    cursor: 'pointer',
  },
});
