import { appearFromBottom, appearFromLeft } from '@/styles/framer-motions';
import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes, PropsWithChildren } from 'react';

const AppearBottom = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & MotionProps) => {
  return (
    <motion.div {...appearFromBottom} {...props}>
      {children}
    </motion.div>
  );
};

export default AppearBottom;
