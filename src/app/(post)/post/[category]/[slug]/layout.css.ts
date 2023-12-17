import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { style } from '@vanilla-extract/css';

export const postLayout = style({
  display: 'flex',
});

export const postContainer = style({
  width: '100%',
});

export const tocSection = style({
  position: 'fixed',
  left: `calc(${LAYOUT_VARIABLES.breakPoint}px + (100vw - 900px) / 2)`,
  width: '300px',
  height: '100dvh',
  paddingLeft: '20px',
});
