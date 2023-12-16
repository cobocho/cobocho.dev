import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const PostListTitleWrapper = style({
  display: 'flex',
  alignItems: 'flex-end',
  height: '62px',
  marginBottom: '20px',
  fontWeight: '300',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint})`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '5px',
    },
  },
});

export const PostListTitle = style({
  display: 'block',
  marginRight: '10px',
  textTransform: 'uppercase',
  fontSize: '48px',
  lineHeight: '1.1',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint})`]: {
      fontSize: '36px',
    },
  },
});

export const PostListDescription = style({
  position: 'relative',
  bottom: '6px',
  color: Theme.secondary,
  fontSize: '24px',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint})`]: {
      bottom: '0',
      fontSize: '20px',
    },
  },
});

export const postList = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '30px',
  marginBottom: '100px',

  '@media': {
    [`screen and (max-width: ${LAYOUT_VARIABLES.breakPoint})`]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});