import { orchestrate } from '@/styles/framer-motions';
import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

const Orchestration = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & MotionProps) => {
  return (
    <motion.div {...orchestrate} {...props}>
      {children}
    </motion.div>
  );
};

export default Orchestration;
