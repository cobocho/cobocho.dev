import Post from '@/types/post'
import { getAllPosts } from '../lib/api'
import PostList from '@/components/organisms/\bPostList'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  console.log(allPosts);
  return (
    <>
      <PostList allPosts={allPosts}/>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'slug',
    'title',
    'date',
    'thumbnail',
    'description',
    'content',
    'tags',
    'category'
  ]);

  return {
    props: { allPosts },
  }
}