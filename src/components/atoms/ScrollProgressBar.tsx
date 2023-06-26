import styled from 'styled-components';
import { motion, useScroll } from 'framer-motion';

const ScrollProgressBarBox = styled.div`
  position: absolute;
  top: 60px;
  width: 100%;
  height: 5px;
  background-color: #8d8d8d;

  .scroll-bar {
    height: inherit;
    background-color: #fff;
    transform-origin: left;
  }
`;

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <ScrollProgressBarBox>
      <motion.div
        className="scroll-bar"
        style={{ scaleX: scrollYProgress }}
      ></motion.div>
    </ScrollProgressBarBox>
  );
};

export default ScrollProgressBar;
