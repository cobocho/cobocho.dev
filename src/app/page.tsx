import { allFields, getAllCategories, getAllPosts } from '@/lib/api';

import CategoriesList from '@/components/CategoriesList/CategoriesList';
import PostList from '@/components/PostList/PostList';

const Home = () => {
  const { posts, total } = getAllPosts(allFields);
  const categories = getAllCategories();

  return (
    <>
      <CategoriesList categories={categories} />
      <PostList posts={posts} postQuantity={total} />
    </>
  );
};

export default Home;
