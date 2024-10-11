'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Post } from '@/interfaces/post'

interface PostContentThumbnailProps {
  post: Post
}

export const PostContentThumbnail = ({ post }: PostContentThumbnailProps) => {
  return (
    <motion.div
      className="relative aspect-[8/5] w-full"
      layoutId={`post-thumbnail-${post.slug}`}
    >
      <Image
        alt={post.title}
        sizes="100%"
        className="h-full w-full"
        src={post.thumbnail}
      />
    </motion.div>
  )
}
