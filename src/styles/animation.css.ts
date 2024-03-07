import { keyframes, style } from '@vanilla-extract/css';

const appearLeft = keyframes({
  '0%': {
    transform: 'translateX(-30px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateX(0)',
    opacity: 1,
  },
});

const appearBottom = keyframes({
  '0%': {
    transform: 'translateY(-30px)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateY(0)',
    opacity: 1,
  },
});

export const appear = {
  left: style({
    opacity: 0,
    transform: 'translateX(-30px)',
    animation: `${appearLeft} 0.5s forwards`,
  }),
  bottom: style({
    opacity: 0,
    transform: 'translateY(-30px)',
    animation: `${appearBottom} 0.5s forwards`,
  }),
};
