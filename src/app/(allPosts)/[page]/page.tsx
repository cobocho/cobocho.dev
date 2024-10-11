import { getCategories } from '@/apis/category'
import { getPosts } from '@/apis/posts'
import { CategoryList } from '@/components/post/CategoryList'
import { PostList } from '@/components/post/PostList'
import { Pagination } from '@/components/ui/Pagination'

interface AllPostsProps {
  params: {
    page: string
  }
}

export default function AllPosts({ params }: AllPostsProps) {
  const { posts, postQuantity } = getPosts({ page: Number(params.page) })
  const categories = getCategories()

  return (
    <div>
      <CategoryList categories={categories} />
      <PostList posts={posts} />
      <div className="mt-20 flex items-center justify-center">
        <Pagination postQuantity={postQuantity} />
      </div>
    </div>
  )
}
