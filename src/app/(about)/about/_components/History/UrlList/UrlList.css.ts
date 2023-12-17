import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const urlList = style({ display: 'flex', flexDirection: 'column' });

export const urlItem = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  paddingTop: '4px',
  lineHeight: '0',
});

export const urlIcon = style({ marginRight: '10px', fill: Theme.content });

export const urlItemName = style({ marginRight: '6px' });

export const urlItemLink = style({ color: Theme.secondary, textDecoration: 'underline' });
