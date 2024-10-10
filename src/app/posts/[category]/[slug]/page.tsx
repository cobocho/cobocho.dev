import { getPost } from '@/apis/posts'
import { PostContentThumbnail } from '@/components/post/PostContentThumbnail'

interface PostPageProps {
  params: {
    category: string
    slug: string
  }
}

const PostPage = ({ params: { category, slug } }: PostPageProps) => {
  const post = getPost(category, slug)

  return (
    <article>
      <PostContentThumbnail post={post} />
    </article>
  )
}

export default PostPage
