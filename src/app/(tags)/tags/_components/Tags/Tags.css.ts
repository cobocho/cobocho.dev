import { style } from '@vanilla-extract/css';

export const tagsListTitle = style({
  marginBottom: '20px',
  fontSize: '48px',
});

export const tagsList = style({
  display: 'flex',
  flexWrap: 'wrap',
});

export const tag = style({
  marginRight: '20px',
  marginBottom: '20px',
  fontSize: '20px',
  listStyle: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',

  ':hover': {
    textDecoration: 'underline',
  },
});

export const tagQuantity = style({
  marginLeft: '3px',
  fontSize: '16px',
  color: '#acacac',
});
