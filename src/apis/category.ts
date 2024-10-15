import fs from 'fs'
import { join } from 'path'

import { Category } from '@/interfaces/post'

import { POST_DIRECTORY, SNIPPET_DIRECTORY } from './common'
import { getPost } from './posts'
import { getSnippet } from './snippets'

export const getCategories = (isSnippet: boolean = false): Category[] => {
  const directory = isSnippet ? SNIPPET_DIRECTORY : POST_DIRECTORY

  const categoriesPaths = fs.readdirSync(join(directory))

  const result: Category[] = categoriesPaths.map((category) => {
    const AllPosts = fs.readdirSync(join(directory, category))

    return {
      name: category,
      count: AllPosts.length,
      posts: isSnippet
        ? AllPosts.map((post) => getSnippet(category, post))
        : AllPosts.map((post) => getPost(category, post)),
    }
  })

  return result.sort((a, b) => b.count - a.count)
}
