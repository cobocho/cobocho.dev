import { PropsWithChildren } from 'react';

import { KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import { getAllCategories } from '@/lib/api';

import CategoriesList from './_components/CategoriesList/CategoriesList';

interface Props extends PropsWithChildren {
  params: {
    category: KOR_CATEGORY_KEYS;
    page: string;
  };
}

const PostListLayout = ({ children, params }: Props) => {
  const categories = getAllCategories();

  return (
    <>
      <CategoriesList categories={categories} />
      {children}
    </>
  );
};

export default PostListLayout;
