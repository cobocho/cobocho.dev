import { style } from '@vanilla-extract/css';

export const postCardTag = style({
  display: 'inline-block',
  width: 'fit-content',
  height: 'fit-content',
  padding: '6px 8px 4px 8px',
  marginRight: '6px',
  marginTop: '6px',
  borderRadius: '12px',
  backgroundColor: '#fff',
  color: '#000',
  fontWeight: '700',
  transition: 'all 0.4s',
  zIndex: '90',

  ':hover': {
    backgroundColor: '#d4d4d4',
    transform: 'translateY(-4px)',
  },
});
