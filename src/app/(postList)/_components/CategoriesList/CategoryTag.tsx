'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

import { KOR_CATEGORY, KOR_CATEGORY_KEYS } from '@/constants/category-translate';

import { categoryQuantity, categoryTag } from './CategoryTag.css';

interface Props {
  category: string;
  quantity: number;
}

const CategoryTag = ({ category, quantity }: Props) => {
  const path = usePathname();

  const currentCategory = path.split('/').at(2);

  const isAllCategory = category === 'all';

  const isCurrentCategory = isAllCategory ? !currentCategory : category === currentCategory;

  const translatedCategory = KOR_CATEGORY[category as KOR_CATEGORY_KEYS];

  return (
    <Link
      className={isCurrentCategory ? 'current' : ''}
      href={isAllCategory ? '/' : `/category/${category}/1`}
    >
      <span className={categoryTag}>
        {translatedCategory ? translatedCategory : category}{' '}
        <span className={categoryQuantity}>({quantity})</span>
      </span>
    </Link>
  );
};

export default memo(CategoryTag);
