import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const modalBackdrop = style({
  position: 'fixed',
  top: '0',
  left: '0',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100dvw',
  height: '100dvh',

  backdropFilter: 'blur(10px)',

  zIndex: 9999,
});

export const modalContainer = style({
  display: 'flex',
  flexDirection: 'column',

  width: 'fit-content',
  height: 'fit-content',

  padding: '20px',

  backgroundColor: Theme.primary,
  boxShadow: `0px 0px 22px -6px ${Theme.secondary}`,

  borderRadius: '20px',
});

export const modalHeader = style({
  width: '100%',
  marginBottom: '15px',
  paddingBottom: '10px',
  borderBottom: `${Theme.contrast} 1px solid`,
  fontSize: '24px',
});
