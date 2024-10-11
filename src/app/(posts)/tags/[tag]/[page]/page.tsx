import React from 'react'

import { Title } from '@/components/ui/Title'
import { getPosts } from '@/apis/posts'
import { PostList } from '@/components/post/PostList'
import { Pagination } from '@/components/ui/Pagination'

interface TagPageProps {
  params: {
    tag: string
    page: string
  }
}

const TagPage = ({ params: { tag, page } }: TagPageProps) => {
  const decodedTag = decodeURIComponent(tag)
  const { posts, postQuantity } = getPosts({
    tag: decodedTag,
    page: parseInt(page),
  })

  return (
    <div>
      <Title>{decodedTag}</Title>
      <PostList posts={posts} />
      <div className="mt-20 flex items-center justify-center">
        <Pagination postQuantity={postQuantity} />
      </div>
    </div>
  )
}

export default TagPage
