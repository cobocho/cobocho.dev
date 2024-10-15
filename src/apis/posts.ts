/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs'
import { join } from 'path'

import matter from 'gray-matter'
import { StaticImageData } from 'next/image'

import { Post } from '@/interfaces/post'

import { POST_DIRECTORY } from './common'
import { getCategories } from './category'
import { slicePage, sortByDate } from './utils'

export const getThumbnail = (
  category: string,
  slug: string,
): StaticImageData => {
  const thumbnail = require(`/_posts/${category}/${slug}/thumbnail.png`)
    .default as StaticImageData

  return thumbnail
}

export const getPostImages = (category: string, slug: string) => {
  try {
    const imagesFileNames = fs.readdirSync(
      join(POST_DIRECTORY, category, slug, 'images'),
    )

    const images: { [key: string]: StaticImageData } = {}

    imagesFileNames.forEach((file) => {
      images[file] = require(
        `/_posts/${category}/${slug}/images/${file}`,
      ).default
    })

    return images
  } catch {
    return {}
  }
}

export const getPost = (category: string, slug: string): Post => {
  const postFile = fs.readFileSync(
    join(POST_DIRECTORY, category, slug, 'post.md'),
    'utf-8',
  )

  const thumbnail = require(`/_posts/${category}/${slug}/thumbnail.png`)
    .default as StaticImageData

  const images = getPostImages(category, slug)

  const { data, content } = matter(postFile)

  const post = {
    title: data.title,
    description: data.description,
    date: data.date,
    category,
    slug,
    content,
    tags: data.tags,
    thumbnail,
    images,
  }

  return post
}

interface BasePostQuery {
  category?: never
  page: number
  tag?: never
}

interface CategoryPostQuery {
  category: string
  page: number
  tag?: never
}

interface TagPostQuery {
  category?: never
  page: number
  tag: string
}

type GetPostsOptions = BasePostQuery | CategoryPostQuery | TagPostQuery

export const getAllPosts = () => {
  const categories = getCategories()

  const allPosts = categories.flatMap((category) => {
    const posts = fs.readdirSync(join(POST_DIRECTORY, category.name))
    return posts.map((post) => getPost(category.name, post))
  })

  return allPosts
}

export const getPosts = (option: GetPostsOptions) => {
  const { category, page, tag } = option

  const allPosts = getAllPosts()

  if (category) {
    const results = slicePage(
      sortByDate(allPosts.filter((post) => post.category === option.category)),
      page,
    )

    return {
      posts: results,
      postQuantity: results.length,
    }
  }

  if (tag) {
    const results = slicePage(
      sortByDate(
        allPosts.filter((post) => {
          return post.tags.includes(option.tag)
        }),
      ),
      page,
    )

    return {
      posts: results,
      postQuantity: results.length,
    }
  }

  return {
    posts: slicePage(sortByDate(allPosts), page),
    postQuantity: allPosts.length,
  }
}
