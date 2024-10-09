'use client'

import { HTMLMotionProps, motion } from 'framer-motion'

interface AppearRightProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
  stiffness?: number
  distance?: number | string
}

export const AppearRight = ({
  delay = 0,
  duration = 0.5,
  stiffness = 100,
  distance = 20,
  ...props
}: AppearRightProps) => {
  return (
    <motion.div
      initial={{ x: distance, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: distance, opacity: 0 }}
      transition={{ duration, delay, type: 'spring', stiffness }}
      {...props}
    />
  )
}
