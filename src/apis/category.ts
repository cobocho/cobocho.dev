import fs from 'fs'
import { join } from 'path'

import { Category } from '@/interfaces/post'

import { POST_DIRECTORY } from './common'
import { getPost } from './posts'

export const getCategories = (): Category[] => {
  const categoriesPaths = fs.readdirSync(join(POST_DIRECTORY))

  const result: Category[] = categoriesPaths.map((category) => {
    const AllPosts = fs.readdirSync(join(POST_DIRECTORY, category))

    return {
      name: category,
      count: AllPosts.length,
      posts: AllPosts.map((post) => getPost(category, post)),
    }
  })

  return result
}
