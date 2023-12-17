import { Theme } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const historyItemTitleBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 'fit-content',
  padding: '3px 3px 3px 3px',
  marginBottom: '20px',
  borderBottom: `1px solid ${Theme.content}`,

  selectors: {
    ['&.toggle-mode']: { cursor: 'pointer' },
  },
});

export const historyItemTitle = style({ marginRight: '50px', fontSize: '40px', fontWeight: '700' });

export const historyItemToggle = style({
  marginLeft: '20px',
  fontSize: '1.5rem',
  color: Theme.content,
  cursor: 'pointer',
  transform: `rotateX(0deg)`,
  transition: 'transform 0.5s',

  selectors: {
    [`&.toggle-off`]: {
      transform: `rotateX(180deg)`,
    },
  },
});
