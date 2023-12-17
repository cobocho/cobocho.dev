import LAYOUT_VARIABLES from '@/styles/layout-variables';
import { Theme } from '@/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const postContent = style({
  position: 'relative',
  marginBottom: '200px',
  fontSize: '16px',
  lineHeight: '32px',
});

export const postThumbnail = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1.6 / 1',
  lineHeight: '32px',
});

globalStyle(`${postThumbnail} img`, {
  borderRadius: '20px',
});

globalStyle(`${postContent} p`, {
  whiteSpace: 'pre-wrap',
  marginBottom: '20px',
});

globalStyle(`${postContent} h1, h2, h3, h4`, {
  margin: '0',
  padding: `${LAYOUT_VARIABLES.headerHeight}px 0 20px 0`,
  lineHeight: '44px',
  fontWeight: '600',
});

globalStyle(`${postContent} h1`, {
  fontSize: '32px',
});

globalStyle(`${postContent} h2`, {
  fontSize: '28px',
});

globalStyle(`${postContent} h3`, {
  fontSize: '24px',
});

globalStyle(`${postContent} h4`, {
  fontSize: '20px',
  marginBottom: '-24px',
});

globalStyle(`${postContent} li`, {
  margin: '5px 0 5px 20px',
});

globalStyle(`${postContent} a`, {
  fontWeight: '500',
  color: '#1a9ed7',
});

globalStyle(`${postContent} a:hover`, {
  fontWeight: '600',
  textDecoration: 'underline',
});

globalStyle(`${postContent} iframe`, {
  width: '100%',
});

globalStyle(`${postContent} blockquote`, {
  position: 'relative',
  padding: '30px 30px',
  marginBottom: '20px',
  fontWeight: '200',
});

globalStyle(`${postContent} blockquote p`, {
  marginBottom: '0',
});

globalStyle(`${postContent} blockquote:before`, {
  content: '',
  display: 'block',
  position: 'absolute',
  left: '0',
  top: '0',
  width: '10px',
  height: '100%',
  backgroundColor: Theme.secondary,
});

globalStyle(`${postContent} strong`, {
  fontWeight: '600',
});

globalStyle(`${postContent} em`, {
  color: Theme.secondary,
  fontStyle: 'italic',
});

globalStyle(`${postContent} del`, {
  color: Theme.secondary,
  fontWeight: '100',
});

globalStyle(`${postContent} pre`, {
  margin: '30px 0',
  borderRadius: '10px',
  boxShadow: '0px 0px 20px 0px rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
});

globalStyle(`${postContent} code.small-code`, {
  padding: '3px 6px',
  marginRight: '3px',
  borderRadius: '6px',
  backgroundColor: Theme.contrast,
});
