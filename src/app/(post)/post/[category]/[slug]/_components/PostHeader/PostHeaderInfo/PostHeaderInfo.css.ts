import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const postHeaderInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  margin: '10px 0 10px 0',
  fontWeight: '200',
  fontSize: '20px',
  color: Theme.content,
  fill: Theme.content,
});

export const postHeaderInfoMinPerRed = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});
