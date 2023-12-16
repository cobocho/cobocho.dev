'use client';

import CategoryTag from './CategoryTag';
import Category from '@/types/category';
import { bebas_neue } from '@/app/fonts';
import { categoryList, categoryTitle, categoryWrapper } from './CategoriesList.css';

interface Props {
  categories: Category[];
}

const CategoriesList = ({ categories }: Props) => {
  return (
    <div className={categoryWrapper}>
      <p className={`${categoryTitle} ${bebas_neue.className}`}>Categories</p>
      <ul className={categoryList}>
        {categories.map(({ categoryName, quantity }) => {
          return (
            <li key={categoryName}>
              <CategoryTag category={categoryName} quantity={quantity} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
