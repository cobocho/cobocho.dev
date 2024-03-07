import { PropsWithChildren } from 'react';

import CategoryTitle from '@/app/(postList)/_components/CategoryTitle/CategoryTitle';
import { KOR_CATEGORY_KEYS } from '@/constants/category-translate';

interface Props extends PropsWithChildren {
  params: {
    category: KOR_CATEGORY_KEYS;
    page: string;
  };
}

const CategoryLayout = ({ children, params }: Props) => {
  return (
    <>
      <CategoryTitle title={params.category} />
      {children}
    </>
  );
};
export default CategoryLayout;
