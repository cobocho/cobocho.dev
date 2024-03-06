import { style } from '@vanilla-extract/css';

import { Theme } from '@/styles/theme.css';

export const searchFormContainer = style({ width: '300px', marginBottom: '10px' });

export const searchFormInput = style({
  width: '100%',
  height: '30px',
  padding: '0 10px',
  backgroundColor: Theme.contrast,
  border: `${Theme.secondary} 1px solid`,
  outline: 'none',
  borderRadius: '10px',
  color: Theme.content,

  ':focus': {
    outline: `${Theme.secondary} 1px solid`,
  },
});
