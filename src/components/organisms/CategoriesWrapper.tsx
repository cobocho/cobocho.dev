import styled from "styled-components";
import CategoriesList from "../moecules/CategoriesList";

type Props = {
  categories: string[];
  category?: string;
}

const CategoriesWrapperBox = styled.nav`
  margin-bottom: 20px;
  animation: appear 0.5s;

  h2 {
    margin-bottom: 20px;
    font-size: 40px;
    font-weight: 600;
  }

  @keyframes appear {
    0% {
      transform: translateY(30px);
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