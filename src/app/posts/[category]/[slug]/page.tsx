'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const MotionImage = motion(Image)

const PostPage = () => {
  return (
    <MotionImage
      layoutId="post-thumbnail"
      className="h-[400px] w-full bg-black"
    />
  )
}

export default PostPage
