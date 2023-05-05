import Post from '@/types/post'
import { getAllPosts } from '../lib/api'
import PostList from '@/components/organisms/PostList'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  return (
    <>
      <PostList allPosts={allPosts}/>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'category',
    'tags',
    'date',
    'thumbnail',
    'description',
    'content'
  ]);

  return {
    props: { allPosts },
  }
}