import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const postHeaderCategory = style({
  display: 'flex',
  color: Theme.secondary,
});

export const postHeaderCategoryLink = style({
  margin: '0 7px',
  color: 'inherit',
  transition: 'color 0.5s',
  textTransform: 'uppercase',

  ':hover': { color: Theme.content },
});
