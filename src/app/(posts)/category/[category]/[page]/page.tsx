import { Metadata } from 'next'

import { getPosts } from '@/apis/posts'
import { PostList } from '@/components/post/PostList'
import { Pagination } from '@/components/ui/Pagination'
import { DOMAIN } from '@/constants/domain'
import { getCategories } from '@/apis/category'

interface CategoryPostsProps {
  params: {
    category: string
    page: string
  }
}

export const generateMetadata = ({ params }: CategoryPostsProps): Metadata => {
  const title = params.category
  const description = `${params.category} Posts`
  const images = ['/images/default-thumbnail.png']

  return {
    title,
    metadataBase: new URL(
      `https://${DOMAIN}/category/${params.category}/${params.page}`,
    ),
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
  }
}

export function generateStaticParams() {
  const categories = getCategories()

  const params = Array.from(categories, (category) => {
    const pages = category.posts
      ? Array.from(
          { length: Math.ceil(category.posts.length / 10) },
          (_, i) => i + 1,
        )
      : []

    return pages.map((page) => ({
      category: category.name,
      page: String(page),
    }))
  })

  return params.flat()
}

export default function CategoryPosts({ params }: CategoryPostsProps) {
  const { posts, postQuantity } = getPosts({
    page: Number(params.page),
    category: params.category,
  })

  return (
    <div>
      <PostList posts={posts} />
      <div className="mt-20 flex items-center justify-center">
        <Pagination postQuantity={postQuantity} />
      </div>
    </div>
  )
}
