import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const postHeaderInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  margin: '10px 0 10px 0',
  fontWeight: '300',
  fontSize: '20px',
  color: Theme.content,
  fill: Theme.secondary,
});

export const postHeaderInfoMinPerRed = style({
  display: 'flex',
  gap: '4px',
});
