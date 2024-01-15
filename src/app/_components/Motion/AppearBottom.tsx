import { appearFromBottom, fromBottom } from '@/styles/framer-motions';
import { MotionComponentProps } from '@/types/motion';
import { MotionProps, motion } from 'framer-motion';

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
