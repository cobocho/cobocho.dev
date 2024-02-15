import { style } from '@vanilla-extract/css';
import { postCard } from './PostCard.css';

export const postCardThumbnail = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '1.6 / 1',
  overflow: 'hidden',
  isolation: 'isolate',
  transition: 'inherit',
});

export const postCardThumbnailImage = style({
  objectFit: 'cover',
  transition: 'all 0.5s',

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        [`${postCard}:hover &`]: {
          filter: 'brightness(0.5) blur(4px)',
          transform: 'scale(1.3)',
        },
      },
    },
  },
});

export const postCardTags = style({
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  transform: 'translateY(100px)',
  transition: 'transform 0.5s',

  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        [`${postCard}:hover &`]: {
          transform: 'translateY(0)',
        },
      },
    },
  },
});
