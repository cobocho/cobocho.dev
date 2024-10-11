'use client'

import { useRouter } from 'next/navigation'

import { Post } from '@/interfaces/post'

interface PostTagsProps {
  tags: Post['tags']
}

export const PostTags = ({ tags }: PostTagsProps) => {
  const router = useRouter()

  return (
    <div className="flex flex-wrap justify-end gap-x-4 gap-y-2">
      {tags.map((tag) => (
        <button
          onClick={(e) => {
            e.preventDefault()
            router.push(`/tags/${tag}/1`)
          }}
          className="text-sm font-semibold text-outline/50 transition-transform duration-500 hover:-translate-y-1 hover:text-outline/70"
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
