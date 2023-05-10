import Post from '@/types/post'
import { getAllCategories, getAllPosts, getAllTags } from '../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'
import Category from '@/types/category'

type Props = {
  allPosts: Post[];
  categories: Category[];
  allTags: string[];
}

export default function Index({ allPosts, categories, allTags }: Props) {
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

  const allPostQuantity = getAllCategories()
    .reduce((acc, cur) => acc + cur.quantity, 0);

  const categories = [{ categoryName: 'All', quantity: allPostQuantity }, ...getAllCategories()];
  const allTags = getAllTags();

  return {
    props: { allPosts, categories, allTags },
  }
}