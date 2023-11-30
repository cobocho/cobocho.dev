import Post from '@/types/post';
import { getAllPosts, getAllCategories, getAllPostsByCategory, allFields } from '../../../lib/api';
import PostList from '@/components/PostList/PostList';
import Homepage from '@/components/templates/Homepage';
import { GetStaticPaths } from 'next';
import Category from '@/types/category';
import SeoHead from '@/components/SeoHead/SeoHead';
import PageType from '@/types/page';

interface Props {
  allPosts: Post[];
  categories: Category[];
  category: string;
  allTags: string[];
}

type Params = {
  params: {
    category: string;
    page: string;
  };
};

export default function Index({ allPosts, categories, category }: Props) {
  const postQuantity = categories.find(({ categoryName }) => categoryName === category)!.quantity;
  return (
    <>
      <SeoHead page={PageType.Category}></SeoHead>
      <Homepage categories={categories} category={category}>
        <PostList postQuantity={postQuantity} title={category} posts={allPosts} />
      </Homepage>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCategories()
    .map((category) => {
      const withPage = [];
      const lastPage = Math.ceil(category.quantity / 10);
      for (let i = 1; i <= lastPage; i++) {
        const params = {
          category: category.categoryName,
          page: String(i),
        };
        withPage.push({ params });
      }

      return withPage;
    })
    .flat();

  return { paths: paths, fallback: false };
};

export const getStaticProps = async ({ params }: Params) => {
  const { category, page } = params;
  const allPosts = getAllPostsByCategory(category, allFields, Number(page));

  const allPostQuantity = getAllCategories().reduce((acc, cur) => acc + cur.quantity, 0);

  const categories = [{ categoryName: 'All', quantity: allPostQuantity }, ...getAllCategories()];

  return {
    props: { allPosts, categories, category },
  };
};
