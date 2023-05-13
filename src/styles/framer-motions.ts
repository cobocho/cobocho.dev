const springTransiton = {
  type: "spring",
  stiffness: 100
};

export const postItem = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {...springTransiton, delay: 0.2},
  }
};

export const appearFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: springTransiton
  }
}

export const tagsAppear = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
}