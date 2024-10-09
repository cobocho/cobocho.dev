import { getAllPosts } from '@/apis/posts'
import { Carousel } from '@/components/ui/Carousel'

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 5)

  return (
    <div>
      <h1 className="mb-6 text-5xl font-bold italic text-outline">New Posts</h1>
      <div className="absolute left-0 w-dvw">
        <Carousel posts={recentPosts} />
      </div>
    </div>
  )
}
