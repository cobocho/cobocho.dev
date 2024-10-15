'use client'

import React from 'react'
import { motion } from 'framer-motion'

import { Snippet } from '@/interfaces/snippet'

import { SnippetItem } from '../SnippetItem'

interface SnippetListProps {
  snippets: Snippet[]
}

export const SnippetList = ({ snippets }: SnippetListProps) => {
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
        {snippets.map((snippet) => (
          <motion.li
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            key={snippet.title}
          >
            <SnippetItem snippet={snippet} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
