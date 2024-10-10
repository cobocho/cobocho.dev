'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Post } from '@/interfaces/post'

const MotionImage = motion(Image)

interface PostContentThumbnailProps {
  post: Post
}

export const PostContentThumbnail = ({ post }: PostContentThumbnailProps) => {
  return (
    <MotionImage
      layoutId={`post-thumbnail-${post.slug}`}
      className="aspect-[8/5] w-full"
      src={post.thumbnail}
    />
  )
}
