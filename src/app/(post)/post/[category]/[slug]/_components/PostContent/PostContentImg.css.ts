import { style } from '@vanilla-extract/css';

import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';

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

export const postContentTable = style({
  marginBottom: '20px',
  borderCollapse: 'collapse',
});

export const postContentTableHeader = style({
  backgroundColor: Theme.contrast,
  fontWeight: 600,
});

export const postContentTH = style({
  width: 'fit-content',
  padding: '5px 10px',
});

export const postContentTD = style({
  border: `1px solid ${Theme.contrast}`,
  padding: '5px',
});
