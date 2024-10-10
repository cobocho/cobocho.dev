import { getPosts } from '@/apis/posts'
import { PostList } from '@/components/post/PostList'
import { Pagination } from '@/components/ui/Pagination'

interface AllPostsProps {
  params: {
    category: string
    page: string
  }
}

export default function AllPosts({ params }: AllPostsProps) {
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
