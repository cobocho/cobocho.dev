'use client';

import AppearLeft from '@/app/_components/Motion/AppearLeft';
import { bebas_neue } from '@/app/fonts';
import Category from '@/types/category';

import { categoryList, categoryTitle, categoryWrapper } from './CategoriesList.css';
import CategoryTag from './CategoryTag';

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
