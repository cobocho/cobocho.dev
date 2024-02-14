'use client';

import { appearFromLeft, fromLeft } from '@/styles/framer-motions';
import { MotionComponentProps } from '@/types/motion';
import { MotionProps, motion } from 'framer-motion';

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
