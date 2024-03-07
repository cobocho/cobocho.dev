'use client';

import { bebas_neue } from '@/app/fonts';
import { appear } from '@/styles/animation.css';
import Category from '@/types/category';

import { categoryList, categoryTitle, categoryWrapper } from './CategoriesList.css';
import CategoryTag from './CategoryTag';

interface Props {
  categories: Category[];
}

const CategoriesList = ({ categories }: Props) => {
  return (
    <div className={appear.left}>
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
    </div>
  );
};

export default CategoriesList;
