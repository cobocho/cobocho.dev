import Post from '@/types/post'
import { getAllCategories, getAllPosts, getAllTags } from '../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'

type Props = {
  allPosts: Post[];
  categories: string[];
  allTags: string[];
}

export default function Index({ allPosts, categories, allTags }: Props) {
  console.log(allTags);
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
  const allTags = getAllTags();

  return {
    props: { allPosts, categories, allTags },
  }
}