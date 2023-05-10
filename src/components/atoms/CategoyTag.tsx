import Link from "next/link";
import styled from "styled-components";

type Props = {
  category: string,
  currentCategory?: string,
  quantity: number,
}

const CategoryTagBox = styled.span`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 6px 16px 4px 16px;
  margin-right: 8px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: ${props => props.theme.categoryColor};
  box-shadow: ${props => props.theme.categoryShadow};
  color: ${props => props.theme.categoryTextColor};
  font-size: 24px;
  font-weight: 700;
  transition: background-color 0.3s, transform 0.6s;

  .category-quantity {
    font-weight: 300;
    font-size: 20px;
  }

  &:hover {
    transform: translateY(-5px);
  }

  &.current-category {
    background-color:  ${props => props.theme.selectedCategoryColor};
    box-shadow: ${props => props.theme.selectedCategoryShadow};
    color: ${props => props.theme.selectedCategoryTextColor};
  }
`

const CategoryTag = ({ category, currentCategory, quantity }: Props) => {
  if (!currentCategory || !category) currentCategory = 'All';
  const isCurrentCategory = currentCategory === category;
  return (
    <Link href={category === 'All' ? '/' : `/category/${category}`}>
      <CategoryTagBox className={isCurrentCategory ? "current-category" : ""}>
        {category} <span className="category-quantity">({quantity})</span>
      </CategoryTagBox>
    </Link>
  )
}

export default CategoryTag;