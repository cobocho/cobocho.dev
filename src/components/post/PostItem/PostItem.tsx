'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Post } from '@/interfaces/post'

import { PostTags } from '../PostTags/PostTags'

import { PostItemThumbnail } from './PostItemThumbnail'

interface PostItemProps {
  post: Post
}

export const PostItem = ({ post }: PostItemProps) => {
  const router = useRouter()

  return (
    <Link
      className="group flex h-[160px] w-full cursor-pointer gap-4 mobile:h-fit mobile:flex-col"
      href={`/post/${post.category}/${post.slug}`}
    >
      <PostItemThumbnail post={post} />
      <div className="flex w-full flex-1 flex-col justify-between py-6 mobile:py-2">
        <div className="mb-4 flex flex-col gap-2 border-b-[1px] border-border pb-4">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/category/${post.category}/1`)
            }}
            className="w-fit text-sm font-bold opacity-60 transition-opacity hover:opacity-100"
          >
            {post.category}
          </button>
          <h2 className="text-xl font-bold transition-colors group-hover:text-outline/60">
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
