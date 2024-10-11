import { getPost } from '@/apis/posts'
import { Giscus } from '@/components/post/Giscus'
import { PostContent } from '@/components/post/PostContent'
import { PostContentThumbnail } from '@/components/post/PostContentThumbnail'
import { PostHeader } from '@/components/post/PostHeader'
import { PostTOC } from '@/components/post/PostTOC/PostTOC'

interface PostPageProps {
  params: {
    category: string
    slug: string
  }
}

const PostPage = ({ params: { category, slug } }: PostPageProps) => {
  const post = getPost(category, slug)

  return (
    <div className="flex flex-col gap-20">
      <PostHeader post={post} />
      <PostContentThumbnail post={post} />
      <div>
        <PostContent post={post} />
        <Giscus />
        <div className="fixed right-[calc((100dvw_-_900px)_/_2)] top-[10rem] hidden translate-x-[calc(100%_+_20px)] desktop:block">
          <PostTOC />
        </div>
      </div>
    </div>
  )
}

export default PostPage
