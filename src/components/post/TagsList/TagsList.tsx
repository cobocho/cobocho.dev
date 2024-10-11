'use client'

import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'

import { Tag } from '@/interfaces/post'

interface TagsListProps {
  tags: Tag[]
}

export const TagsList = ({ tags }: TagsListProps) => {
  return (
    <motion.ul
      className="flex flex-wrap gap-x-6 gap-y-4"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
      }}
      initial="hidden"
      animate="visible"
    >
      {tags.map((tag) => (
        <motion.li
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          key={tag.name}
          className="group relative"
        >
          <Link
            href={`/tags/${tag.name}/1`}
            className="flex items-center gap-1"
          >
            <p className="cursor-pointer text-xl font-semibold italic group-hover:font-extrabold">
              {tag.name}
            </p>
            <span className="text-sm opacity-50">({tag.count})</span>
          </Link>
          <div className="h-[1px] w-full origin-left scale-x-0 bg-outline transition-transform group-hover:scale-x-100" />
        </motion.li>
      ))}
    </motion.ul>
  )
}
