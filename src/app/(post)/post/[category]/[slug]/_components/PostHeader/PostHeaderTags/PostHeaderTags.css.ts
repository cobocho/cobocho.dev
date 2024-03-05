import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const postHeaderTags = style({
  display: 'flex',
  alignItems: 'center',
  padding: '15px 0',
  borderTop: `0.5px solid ${Theme.content}`,
  borderBottom: `0.1px solid ${Theme.content}`,
});

export const postHeaderTagIcon = style({
  transform: 'scale(0.7)',
  marginRight: '8px',
  fill: Theme.secondary,
});

export const postHeaderTagsList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  listStyleType: 'none',
});

export const postHeaderTagsListLink = style({
  color: Theme.secondary,
  transition: 'color 0.5s',

  ':hover': {
    color: Theme.content,
  },
});
