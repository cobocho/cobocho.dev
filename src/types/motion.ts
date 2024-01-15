import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';

export type MotionComponentProps = HTMLAttributes<HTMLDivElement> & MotionProps & { isOrchestration?: boolean };
