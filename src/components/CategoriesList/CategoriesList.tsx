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

const CategoriesWrapperBox = styled.nav`
  margin-bottom: 20px;

  h2 {
    margin-bottom: 20px;
    font-family: 'Bebas Neue', 'Do Hyeon', cursive;
    font-size: 48px;
  }
`;

const CategoriesList = ({ categories, category }: Props) => {
  const currentCategory = category;
  return (
    <CategoriesWrapperBox>
      <h2>Categories</h2>
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
    </CategoriesWrapperBox>
  );
};

export default CategoriesList;
