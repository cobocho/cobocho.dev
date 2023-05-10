import styled from "styled-components";
import CategoriesList from "../moecules/CategoriesList";

type Category = {
  categoryName: string;
  amount: number;
}

type Props = {
  categories: Category[];
  category?: string;
}

const CategoriesWrapperBox = styled.nav`
  margin-bottom: 20px;
  animation: appearCategories 0.5s;

  h2 {
    margin-bottom: 20px;
    font-family: 'Bebas Neue', 'Do Hyeon', cursive;
    font-size: 48px;
  }

  @keyframes appearCategories {
    0% {
      transform: translateX(-30px);
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const CategoriesWrapper = ({categories, category} : Props) => {
  return (
    <CategoriesWrapperBox>
      <h2>
        Categories
      </h2>
      <CategoriesList categories={categories} category={category}/>
    </CategoriesWrapperBox>
  )
}

export default CategoriesWrapper;