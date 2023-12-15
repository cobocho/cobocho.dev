import { appearFromBottom, appearFromLeft } from '@/styles/framer-motions';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

const AppearBottom = ({ children }: PropsWithChildren) => {
  return <motion.div {...appearFromBottom}>{children}</motion.div>;
};

export default AppearBottom;
