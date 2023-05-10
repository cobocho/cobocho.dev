import styled from "styled-components";
import CategoryTag from "../atoms/CategoyTag";

type Category = {
  categoryName: string;
  quantity: number;
}

type Props = {
  category?: string;
  categories: Category[];
}

const CategoryList = styled.li`
  list-style-type : none;
`

const CategoriesList = ({ categories, category } : Props) => {
  const currentCategory = category;
  return (
    <CategoryList className="categories-list">
      {
        categories.map(({categoryName, quantity}) => {
          return (
            <CategoryTag 
              category={categoryName}
              quantity={quantity} 
              currentCategory={currentCategory}
              key={categoryName}
            />
          )
        })
      }
    </CategoryList>
  )
}

export default CategoriesList;