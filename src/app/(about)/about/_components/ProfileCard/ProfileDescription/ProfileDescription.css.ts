import { globalStyle, style } from '@vanilla-extract/css';

export const profileDescription = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: 1,
});

globalStyle(`${profileDescription} h2`, {
  width: 'fit-content',
  paddingTop: '0px',
  marginBottom: '20px',
  fontSize: '26px',
});

globalStyle(`${profileDescription} em`, { fontWeight: '700' });

globalStyle(`${profileDescription} p`, {
  wordBreak: 'keep-all',
  lineHeight: '1.6',
  marginBottom: '10px',
});

globalStyle(`${profileDescription} p:last-child`, { marginBottom: 0 });
