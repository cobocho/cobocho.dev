import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const postCard = style({
  width: '100%',
  border: `1px solid ${Theme.contrast}`,
  borderRadius: '10px',
  boxShadow: '0px 0px 22px -6px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
  transition: 'all 0.5s',

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        boxShadow: '0px 0px 22px -6px rgba(0, 0, 0, 0.4)',
        transform: 'translateY(-10px)',
      },
    },
  },
});

export const postCardInfo = style({
  padding: '20px',
});

export const postCardTitle = style({
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
  paddingTop: '10px',
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
  justifyContent: 'flex-end',
});
