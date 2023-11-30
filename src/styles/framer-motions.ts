const springTransition = {
  type: 'spring',
  stiffness: 100,
};

export const postItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springTransition, delay: 0.2 },
  },
};

export const appearFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
};

export const appearFromBottom = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
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
