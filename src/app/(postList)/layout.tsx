import React, { PropsWithChildren } from 'react';
import CategoriesList from './_components/CategoriesList/CategoriesList';
import { getAllCategories } from '@/lib/api';

const PostListLayout = ({ children }: PropsWithChildren) => {
  const categories = getAllCategories();

  return (
    <>
      <CategoriesList categories={categories} />
      {children}
    </>
  );
};

export default PostListLayout;
