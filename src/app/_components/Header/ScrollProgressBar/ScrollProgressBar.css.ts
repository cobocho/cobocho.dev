import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const scrollProgress = style({
  position: 'absolute',
  top: LAYOUT_VARIABLES.headerHeight,
  width: '100%',
  height: '5px',
  backgroundColor: Theme.secondary,
});

export const scrollProgressBar = style({
  height: 'inherit',
  backgroundColor: Theme.primary,
  transformOrigin: 'left',
});
