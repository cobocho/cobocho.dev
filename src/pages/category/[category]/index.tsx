import Post from '@/types/post'
import { getAllPosts, getAllCategories, getAllPostsByCategory } from '../../../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'
import { GetStaticPaths } from 'next'
import Category from '@/types/category'
import SeoHead from '@/components/SeoHead'
import PageType from '@/types/page'

type Props = {
  allPosts: Post[];
  categories: Category[];
  category: string;
  allTags: string[];
}

type Params = {
  params: {
    category: string
  };
}

export default function Index({ allPosts, categories, category }: Props) {
  return (
    <>
      <SeoHead page={PageType.Category}></SeoHead>
      <Homepage categories={categories} category={category}>
        <PostList title={category} allPosts={allPosts}/>
      </Homepage>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCategories().map((category) => {
    return {
      params: {
        category: category.categoryName,
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Params) => {
  const { category } = params;
  const allPosts = getAllPostsByCategory(
    category,
    [
      'slug',
      'title',
      'category',
      'tags',
      'date',
      'thumbnail',
      'description',
      'content'
    ]
  );

  const allPostQuantity = getAllCategories()
    .reduce((acc, cur) => acc + cur.quantity, 0);

  const categories = [{ categoryName: 'All', quantity: allPostQuantity }, ...getAllCategories()];

  return {
    props: { allPosts, categories, category },
  }
}