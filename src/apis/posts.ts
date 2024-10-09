/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
import fs from 'fs'
import { join } from 'path'

import matter from 'gray-matter'
import { StaticImageData } from 'next/image'

import { Post } from '@/interfaces/post'

import { POST_DIRECTORY } from './common'

export const getThumbnail = (
  type: 'tech' | 'log',
  category: string,
  slug: string,
): StaticImageData => {
  const thumbnail = require(`/_posts/${type}/${category}/${slug}/thumbnail.png`)
    .default as StaticImageData

  return thumbnail
}

export const getPostImages = (
  type: 'tech' | 'log',
  category: string,
  slug: string,
) => {
  try {
    const imagesFileNames = fs.readdirSync(
      join(POST_DIRECTORY, type, category, slug, 'images'),
    )

    const images: { [key: string]: StaticImageData } = {}

    imagesFileNames.forEach((file) => {
      images[file] = require(
        `/_posts/${type}/${category}/${slug}/images/${file}`,
      ).default
    })

    return images
  } catch {
    return {}
  }
}

export const getPost = (
  type: 'tech' | 'log',
  category: string,
  slug: string,
): Post => {
  const postFile = fs.readFileSync(
    join(POST_DIRECTORY, type, category, slug, 'post.md'),
    'utf-8',
  )

  const thumbnail = require(`/_posts/${type}/${category}/${slug}/thumbnail.png`)
    .default as StaticImageData

  const images = getPostImages(type, category, slug)

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
