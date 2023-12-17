'use client';

import CategoryTag from './CategoryTag';
import Category from '@/types/category';
import { bebas_neue } from '@/app/fonts';
import { categoryList, categoryTitle, categoryWrapper } from './CategoriesList.css';
import AppearLeft from '@/app/_components/Motion/AppearLeft';

interface Props {
  categories: Category[];
}

const CategoriesList = ({ categories }: Props) => {
  return (
    <AppearLeft>
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
    </AppearLeft>
  );
};

export default CategoriesList;
