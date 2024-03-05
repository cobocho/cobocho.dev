import { PropsWithChildren } from 'react';

import { getAllCategories } from '@/lib/api';

import CategoriesList from './_components/CategoriesList/CategoriesList';

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
