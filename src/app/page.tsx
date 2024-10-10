import { getPosts } from '@/apis/posts'
import { AppearBottom } from '@/components/motion/AppearBottom'
import { PostList } from '@/components/post/PostList'
import { Carousel } from '@/components/ui/Carousel'
import { Pagination } from '@/components/ui/Pagination'

export default function Home() {
  const { posts, postQuantity } = getPosts({ page: 1 })
  const newPosts = posts.splice(0, 5)

  return (
    <div>
      <AppearBottom>
        <h1 className="pt-20 text-5xl font-bold italic text-outline">
          New Posts
        </h1>
      </AppearBottom>
      <div className="relative h-fit w-dvw -translate-x-[calc((100vw_-_900px)_/_2)] transform mobile:w-full mobile:translate-x-0">
        <Carousel posts={newPosts} />
      </div>
      <PostList posts={posts} />
      <div className="mt-20 flex items-center justify-center">
        <Pagination postQuantity={postQuantity} />
      </div>
    </div>
  )
}
