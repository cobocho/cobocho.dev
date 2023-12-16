import { fromBottom } from '@/styles/framer-motions';
import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

const OrchestrationAppearBottom = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & MotionProps) => {
  return (
    <motion.div variants={fromBottom} {...props}>
      {children}
    </motion.div>
  );
};

export default OrchestrationAppearBottom;
