import { appearFromLeft } from '@/styles/framer-motions';
import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes, PropsWithChildren } from 'react';

const AppearLeft = ({ children, ...props }: HTMLAttributes<HTMLDivElement> & MotionProps) => {
  return (
    <motion.div {...appearFromLeft} {...props}>
      {children}
    </motion.div>
  );
};

export default AppearLeft;
