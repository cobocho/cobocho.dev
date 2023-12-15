import { appearFromLeft } from '@/styles/framer-motions';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

const AppearLeft = ({ children }: PropsWithChildren) => {
  return <motion.div {...appearFromLeft}>{children}</motion.div>;
};

export default AppearLeft;
