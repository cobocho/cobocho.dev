'use client'

import React from 'react'
import { motion } from 'framer-motion'

import { Post } from '@/interfaces/post'

import { PostItem } from '../PostItem'

interface PostListProps {
  posts: Post[]
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="w-full">
      <motion.ul
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-col gap-8 mobile:px-4 mobile:pt-12"
      >
        {posts.map((post) => (
          <motion.li
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            key={post.title}
          >
            <PostItem post={post} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
