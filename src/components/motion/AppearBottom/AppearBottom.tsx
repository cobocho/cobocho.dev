'use client'

import { HTMLMotionProps, motion } from 'framer-motion'

interface AppearBottomProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
  stiffness?: number
  distance?: number
}

export const AppearBottom = ({
  delay = 0,
  duration = 0.5,
  stiffness = 100,
  distance = 20,
  ...props
}: AppearBottomProps) => {
  return (
    <motion.div
      initial={{ y: distance, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: distance, opacity: 0 }}
      transition={{ duration, delay, type: 'spring', stiffness }}
      {...props}
    />
  )
}
