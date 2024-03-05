import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const techStackTag = style({
  display: 'inline-block',
  height: '30px',
  padding: '14px',
  marginRight: '10px',
  marginBottom: '10px',
  backgroundColor: Theme.content,
  borderRadius: '15px',
  fontSize: '18px',
  fontWeight: '300',
  lineHeight: '0.1',
  color: Theme.primary,
});
