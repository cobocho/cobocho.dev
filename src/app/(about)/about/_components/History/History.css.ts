import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { style } from '@vanilla-extract/css';

export const historyContainer = style({
  display: 'grid',
  gridTemplateAreas: `
  'a a'
  'b c'
  'd d'
  'e e'`,
  gridRowGap: '40px',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint}px)`]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});

export const techStacks = style({
  gridArea: 'a',
});


export const links = style({
  gridArea: 'b',
});

export const contact = style({
  gridArea: 'c',
});

export const devCompanies = style({
  gridArea: 'd',
});

export const nonDevCompanies = style({
  gridArea: 'e',
});