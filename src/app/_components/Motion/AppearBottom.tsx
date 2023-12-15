import { appearFromBottom } from '@/styles/framer-motions';
import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

const AppearBottom = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & MotionProps) => {
  return (
    <motion.div {...appearFromBottom} {...props}>
      {children}
    </motion.div>
  );
};

export default AppearBottom;
