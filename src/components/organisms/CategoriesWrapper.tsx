import styled from 'styled-components';
import CategoriesList from '../CategoriesList/CategoriesList';
import Category from '@/types/category';

type Props = {
  categories: Category[];
  category?: string;
};

const CategoriesWrapperBox = styled.nav`
  margin-bottom: 20px;

  h2 {
    margin-bottom: 20px;
    font-family: 'Bebas Neue', 'Do Hyeon', cursive;
    font-size: 48px;
  }
`;

const CategoriesWrapper = ({ categories, category }: Props) => {
  return (
    <CategoriesWrapperBox>
      <h2>Categories</h2>
      <CategoriesList
        categories={categories}
        category={category}
      />
    </CategoriesWrapperBox>
  );
};

export default CategoriesWrapper;
