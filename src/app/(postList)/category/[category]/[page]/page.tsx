import PostList from '@/app/(postList)/_components/PostList/PostList';
import { allFields, getAllPostsByCategory } from '@/lib/api';
import React from 'react';

interface PageParams {
  params: {
    category: string;
    page: string;
  };
}

const Category = ({ params }: PageParams) => {
  const { posts, total } = getAllPostsByCategory(params.category, allFields, Number(params.page));

  return (
    <>
      <PostList title={params.category} posts={posts} postQuantity={total} />
    </>
  );
};

export default Category;
