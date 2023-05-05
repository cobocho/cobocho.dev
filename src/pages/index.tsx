import Post from '@/types/post'
import { getAllCategories, getAllPosts } from '../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'

type Props = {
  allPosts: Post[];
  categories: string[];
}

export default function Index({ allPosts, categories }: Props) {
  return (
    <Homepage categories={categories}>
      <PostList title={"Recent"} allPosts={allPosts}/>
    </Homepage>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'slug',
    'title',
    'category',
    'tags',
    'date',
    'thumbnail',
    'description',
    'content'
  ]);

  const categories = getAllCategories();

  return {
    props: { allPosts, categories },
  }
}