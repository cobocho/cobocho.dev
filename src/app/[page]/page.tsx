import CategoriesList from '@/components/CategoriesList/CategoriesList';
import PostList from '@/components/PostList/PostList';
import { allFields, getAllCategories, getAllPosts } from '@/lib/api';

interface PageParams {
  params: {
    page: number;
  };
}

const Page = ({ params }: PageParams) => {
  const { posts, total } = getAllPosts(allFields, params.page);
  const categories = getAllCategories();

  return (
    <>
      <CategoriesList categories={categories} />
      <PostList posts={posts} postQuantity={total} />
    </>
  );
};

export default Page;
