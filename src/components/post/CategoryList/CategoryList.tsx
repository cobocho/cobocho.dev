'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { Category } from '@/interfaces/post'
import { cn } from '@/utils/cn'

interface CategoryListProps {
  categories: Category[]
  currentCategory?: string
}

export const CategoryList = ({
  categories,
  currentCategory,
}: CategoryListProps) => {
  return (
    <motion.div
      layoutId="category-list"
      className="col mb-10 flex w-full flex-wrap items-center gap-4 rounded-2xl bg-outline px-4 py-6"
    >
      {categories.map((category) => (
        <div
          key={category.name}
          className={cn(
            category.name === currentCategory && 'relative px-4 py-2',
          )}
        >
          {category.name === currentCategory && (
            <motion.div
              layoutId="category-list-underline"
              className="absolute left-0 top-0 h-full w-full rounded-full bg-white text-black"
            />
          )}
          <Link
            href={`/category/${category.name}/1`}
            className={cn(
              'relative flex text-nowrap text-sm text-white transition-colors delay-300 mobile:text-lg',
              category.name === currentCategory &&
                'font-bold italic text-black',
            )}
          >
            {category.name} ({category.count})
          </Link>
        </div>
      ))}
    </motion.div>
  )
}
