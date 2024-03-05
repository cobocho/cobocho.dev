import { motion, useScroll } from 'framer-motion';

import { scrollProgress, scrollProgressBar } from './ScrollProgressBar.css';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className={scrollProgress}>
      <motion.div className={scrollProgressBar} style={{ scaleX: scrollYProgress }} />
    </div>
  );
};

export default ScrollProgressBar;
