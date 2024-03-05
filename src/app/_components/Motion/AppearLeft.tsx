'use client';

import { motion, MotionProps } from 'framer-motion';

import { appearFromLeft, fromLeft } from '@/styles/framer-motions';
import { MotionComponentProps } from '@/types/motion';

const AppearLeft = ({ children, isOrchestration = false, ...props }: MotionComponentProps) => {
  const motionProps: MotionProps = isOrchestration
    ? {
        variants: fromLeft,
      }
    : { ...appearFromLeft };

  return (
    <motion.div {...motionProps} {...props}>
      {children}
    </motion.div>
  );
};

export default AppearLeft;
