import { globalStyle, style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const searchedPostList = style({
  width: '300px',
  maxHeight: '200px',
  overflowX: 'hidden',
  overflowY: 'scroll',
});

globalStyle(`${searchedPostList}::-webkit-scrollbar`, {
  width: '4px',
  backgroundColor: Theme.contrast,
});

globalStyle(`${searchedPostList}::-webkit-scrollbar-thumb`, {
  width: '4px',
  backgroundColor: Theme.secondary,
});

export const searchedPostItem = style({
  width: '300px',
  padding: '10px',

  display: 'flex',
  flexDirection: 'column',
  gap: '3px',

  listStyle: 'none',

  borderBottom: `${Theme.contrast} 1px solid`,
});

export const searchedPostItemCategory = style({
  display: 'inline-block',
  width: 'fit-content',
  backgroundColor: Theme.content,
  color: Theme.primary,
  padding: '2px 4px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 400,
});

export const searchedPostItemText = style({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  fontWeight: '600',

  transition: 'all 0.5s',

  ':hover': {
    whiteSpace: 'wrap',
    cursor: 'pointer',

    transform: 'translateY(-1px)',
  },
});

export const searchFailed = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '20px',

  fontSize: '20px',
  fontWeight: 200,
});
