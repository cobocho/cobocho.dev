import { globalStyle, style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const postCard = style({
  width: '100%',
  border: `1px solid ${Theme.contrast}`,
  borderRadius: '10px',
  boxShadow: '0px 0px 22px -6px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.5s',
  overflow: 'hidden',

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        boxShadow: '0px 0px 22px -6px rgba(0, 0, 0, 0.4)',
        transform: 'translateY(-10px)',
      },
    },
  },
});

globalStyle(`${postCard}.row`, {
  display: 'flex',
  border: 'none',
  borderRadius: '0',
  boxShadow: 'none',
});

export const postCardInfo = style({
  padding: '20px',
});

globalStyle(`${postCard}.row ${postCardInfo}`, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  flexGrow: '1',
});

export const postCardTitle = style({
  maxWidth: '600px',
  marginBottom: '10px',
  fontSize: '22px',
  fontWeight: '600',
});

export const postCardDescription = style({
  paddingBottom: '10px',
  color: Theme.secondary,
});

export const postCardDate = style({
  display: 'block',
  width: 'fit-content',
  borderRadius: '10px',
  fontWeight: '100',
  letterSpacing: '0em',
});

export const postCardInfoTop = style({
  minHeight: '100px',
  borderBottom: `1px solid ${Theme.contrast}`,
});

export const postCardInfoBottom = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
});
