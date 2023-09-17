import styled from 'styled-components';
import CategoryTag from './CategoryTag';
import Category from '@/types/category';

type Props = {
  category?: string;
  categories: Category[];
};

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const CategoriesList = ({ categories, category }: Props) => {
  const currentCategory = category;
  return (
    <CategoryList className="categories-list">
      {categories.map(({ categoryName, quantity }) => {
        return (
          <li key={categoryName}>
            <CategoryTag
              category={categoryName}
              quantity={quantity}
              currentCategory={currentCategory}
            />
          </li>
        );
      })}
    </CategoryList>
  );
};

export default CategoriesList;
