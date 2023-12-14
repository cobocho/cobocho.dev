import { AnimationProps, Variants } from 'framer-motion';

const springTransition = {
  type: 'spring',
  stiffness: 100,
};

const fromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

const fromBottom = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

export const appearFromLeft: AnimationProps = {
  initial: 'hidden',
  animate: 'visible',
  variants: fromLeft,
};

const exitToBottom = {
  opacity: 0,
  y: 30,
  transition: {
    duration: 0.1,
  },
};

export const appearFromBottom: AnimationProps = {
  initial: 'hidden',
  animate: 'visible',
  variants: fromBottom,
  exit: exitToBottom,
};

export const orchestrate = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.4,
    },
  },
};

export const orchestrateTags = {
  visible: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
};
