import { memo } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

import { KOR_CATEGORY } from '@/constants/category-translate';

import { categoryQuantity, categoryTag } from './CategoryTag.css';

interface Props {
  category: string;
  quantity: number;
}

const CategoryTag = ({ category, quantity }: Props) => {
  const [, currentCategory] = useSelectedLayoutSegments();

  const isAllCategory = category === 'all';

  const isCurrentCategory = isAllCategory ? !currentCategory : category === currentCategory;

  let translatedCategory = currentCategory;

  if (KOR_CATEGORY[category]) translatedCategory = KOR_CATEGORY[category];

  return (
    <Link href={isAllCategory ? '/' : `/category/${category}/1`}>
      <span className={`${categoryTag} ${isCurrentCategory ? ' current' : ''}`}>
        {category} <span className={categoryQuantity}>({quantity})</span>
      </span>
    </Link>
  );
};

export default memo(CategoryTag);
