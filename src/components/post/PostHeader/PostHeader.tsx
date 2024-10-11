'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { Post } from '@/interfaces/post'
import { generatePostLayoutId } from '@/utils/motion'
import { AppearBottom } from '@/components/motion/AppearBottom'
import { formatter } from '@/utils/date'

interface PostHeaderProps {
  post: Post
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  const { year, month, day } = formatter(post.date)

  return (
    <AppearBottom className="flex w-full flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Link href={`/category/${post.category}/1`}>
          <motion.p
            layoutId={generatePostLayoutId('category', post)}
            className="text-lg font-bold italic text-outline/50 transition-colors hover:text-outline"
          >
            {post.category}
          </motion.p>
        </Link>
      </div>
      <motion.h1
        className="mx-[5%] break-keep text-center text-5xl font-medium leading-[120%]"
        layoutId={generatePostLayoutId('title', post)}
      >
        {post.title}
      </motion.h1>
      <div className="rounded-full bg-outline px-4 py-1 text-sm font-bold text-white">
        {`${month} ${day}, ${year}`}
      </div>
      <motion.p
        className="break-keep text-center text-xl font-thin leading-[120%]"
        layoutId={generatePostLayoutId('description', post)}
      >
        {post.description}
      </motion.p>
    </AppearBottom>
  )
}
