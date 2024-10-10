'use client'

import { useRouter } from 'next/navigation'

import { Post } from '@/interfaces/post'

interface PostTagsProps {
  tags: Post['tags']
}

export const PostTags = ({ tags }: PostTagsProps) => {
  const router = useRouter()

  return (
    <div className="flex justify-end gap-4">
      {tags.map((tag) => (
        <button
          onClick={() => router.push(`/tag/${tag}`)}
          className="text-sm font-semibold text-outline/50 transition-transform duration-500 hover:-translate-y-1 hover:text-outline/70"
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
