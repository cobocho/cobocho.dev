import { globalStyle, style } from '@vanilla-extract/css';

export const viewStyleBox = style({
  display: 'flex',
  gap: '10px',
});

globalStyle(`${viewStyleBox} svg`, {
  cursor: 'pointer',
  opacity: '0.3',
  transition: 'opacity 0.3s',
});

globalStyle(`${viewStyleBox} .selected svg`, {
  opacity: '1',
});
