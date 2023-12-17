import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const postHeaderDescription = style({
  padding: '10px',
  fontWeight: '500',
  color: Theme.secondary,
  borderLeft: `5px solid ${Theme.secondary}`,
});
