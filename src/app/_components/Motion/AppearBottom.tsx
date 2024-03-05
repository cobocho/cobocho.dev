'use client';

import { motion, MotionProps } from 'framer-motion';

import { appearFromBottom, fromBottom } from '@/styles/framer-motions';
import { MotionComponentProps } from '@/types/motion';

const AppearBottom = ({ children, isOrchestration = false, ...props }: MotionComponentProps) => {
  const motionProps: MotionProps = isOrchestration
    ? {
        variants: fromBottom,
      }
    : { ...appearFromBottom };

  return (
    <motion.div {...motionProps} {...props}>
      {children}
    </motion.div>
  );
};

export default AppearBottom;
