import fs from 'fs'
import { join } from 'path'

import { Category } from '@/interfaces/post'

import { POST_DIRECTORY } from './common'
import { getPost } from './posts'

export const getTechCategories = (): Category[] => {
  const techCategoriesPaths = fs.readdirSync(join(POST_DIRECTORY, 'tech'))

  const result: Category[] = techCategoriesPaths.map((category) => {
    const AllPosts = fs.readdirSync(join(POST_DIRECTORY, 'tech', category))

    return {
      name: category,
      count: AllPosts.length,
      posts: AllPosts.map((post) => getPost('tech', category, post)),
    }
  })

  return result
}
