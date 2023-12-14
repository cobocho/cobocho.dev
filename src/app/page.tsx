import { allFields, getAllCategories, getAllPosts } from '@/lib/api';

import CategoriesList from '@/components/CategoriesList/CategoriesList';
import PostList from '@/components/PostList/PostList';
import { useEffect } from 'react';

const Home = () => {
  const posts = getAllPosts(allFields);
  const categories = getAllCategories();
  const allPostsQuantity = posts.length;
  const all = { categoryName: 'All', quantity: allPostsQuantity };

  return (
    <>
      <CategoriesList categories={[all, ...categories]} />
      <PostList title={'Recent'} posts={posts} postQuantity={allPostsQuantity} />
    </>
  );
};

export default Home;
