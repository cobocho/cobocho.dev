import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const toolbox = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '9px 20px',
  marginBottom: '10px',
  borderRadius: '8px',
  listStyle: 'none',
});

export const toolBoxButton = style({
  padding: '12px 12px 8px 12px',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: Theme.contrast,
  boxShadow: '0px 0px 30px -6px rgba(0, 0, 0, 0.1)',
  fill: Theme.secondary,
  transform: 'scale(1.2)',
  transition: 'all 0.4s',

  ':hover': {
    cursor: 'pointer',
    color: Theme.content,
    fill: Theme.content,
    boxShadow: '0px 10px 30px -6px rgba(112, 112, 112, 0.3)',
    transform: 'scale(1.3) translateY(-4px)',
  },
});

export const copyComplete = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '30px',
  borderRadius: '8px',
  backgroundColor: Theme.contrast,
  fontWeight: '300',
  color: Theme.content,
});
