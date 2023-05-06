import styled from "styled-components";
import CategoryTag from "../atoms/CategoyTag";


type Props = {
  categories: string[];
  category?: string;
}

const CategoryList = styled.li`
`

const CategoriesList = ({ categories, category } : Props) => {
  const currentCategory = category;
  return (
    <CategoryList className="categories-list">
      {
        categories.map(category => {
          return <CategoryTag category={category} currentCategory={currentCategory} key={category} />
        })
      }
    </CategoryList>
  )
}

export default CategoriesList;