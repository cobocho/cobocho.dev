'use client';

import styled from 'styled-components';
import CategoryTag from './CategoryTag';
import Category from '@/types/category';
import { bebas_neue } from '@/app/fonts';

interface Props {
  category?: string;
  categories: Category[];
}

const CategoriesList = ({ categories, category }: Props) => {
  const currentCategory = category ?? 'all';

  return (
    <Container>
      <h2>Categories</h2>
      <ul className="categories-list">
        {categories.map(({ categoryName, quantity }) => {
          return (
            <li key={categoryName}>
              <CategoryTag category={categoryName} quantity={quantity} currentCategory={currentCategory} />
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;

  h2 {
    margin-bottom: 20px;
    font-family: ${bebas_neue.style.fontFamily};
    font-size: 48px;
  }

  .categories-list {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
  }
`;

export default CategoriesList;
