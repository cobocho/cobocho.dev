import React from 'react'
import Link from 'next/link'

import { Post } from '@/interfaces/post'

import { PostTags } from '../PostTags/PostTags'

import { PostItemThumbnail } from './PostItemThumbnail'

interface PostItemProps {
  post: Post
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link
      className="group flex h-[160px] w-full cursor-pointer gap-4"
      href={`/posts/${post.category}/${post.slug}`}
    >
      <PostItemThumbnail post={post} />
      <div className="flex w-full flex-1 flex-col justify-between py-6">
        <div className="border-border flex flex-col gap-2 border-b-[1px] pb-4">
          <h2 className="text-2xl font-bold transition-colors group-hover:text-outline/60">
            {post.title}
          </h2>
          <p className="font-light italic text-outline opacity-80">
            {post.description}
          </p>
        </div>
        <PostTags tags={post.tags} />
      </div>
    </Link>
  )
}
