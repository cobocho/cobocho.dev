import { KOR_CATEGORY } from '@/constants/category-translate';
import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  category: string;
  currentCategory?: string;
  quantity: number;
};

const CategoryTagBox = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: fit-content;
  height: fit-content;
  padding: 8px 18px 6px 18px;
  margin-right: 8px;
  margin-bottom: 10px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.categoryColor};
  color: ${(props) => props.theme.categoryTextColor};
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  transition: all 0.5s;

  .category-quantity {
    margin-left: 6px;
    font-weight: 300;
    font-size: 0.7em;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 13px -4px rgba(0, 0, 0, 0.2);
  }

  &.current-category {
    background-color: ${(props) => props.theme.selectedCategoryColor};
    color: ${(props) => props.theme.selectedCategoryTextColor};
  }

  @media (max-width: 900px) {
    font-size: 18px;
  }
`;

const CategoryTag = ({ category, currentCategory, quantity }: Props) => {
  let translatedCategory = category;
  if (KOR_CATEGORY[category]) translatedCategory = KOR_CATEGORY[category];

  if (!currentCategory || !category) currentCategory = 'All';
  const isCurrentCategory = currentCategory === category;

  return (
    <Link href={category === 'All' ? '/' : `/category/${category}/1`}>
      <CategoryTagBox className={isCurrentCategory ? 'current-category' : ''}>
        {translatedCategory} <span className="category-quantity">({quantity})</span>
      </CategoryTagBox>
    </Link>
  );
};

export default CategoryTag;
