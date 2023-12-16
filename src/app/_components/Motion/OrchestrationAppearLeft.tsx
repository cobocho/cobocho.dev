import { fromLeft } from '@/styles/framer-motions';
import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

const OrchestrationAppearLeft = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & MotionProps) => {
  return (
    <motion.div variants={fromLeft} {...props}>
      {children}
    </motion.div>
  );
};

export default OrchestrationAppearLeft;
