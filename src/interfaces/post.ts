import { StaticImageData } from 'next/image'

export interface Category {
  name: string
  count: number
  posts: Post[]
}

export interface Tag {
  name: string
  slug: string
  count: number
}

export interface Post {
  title: string
  description: string
  category: string
  slug: string
  date: string
  tags: string[]
  thumbnail: StaticImageData
  content: string
  images: {
    [key: string]: StaticImageData
  }
}
