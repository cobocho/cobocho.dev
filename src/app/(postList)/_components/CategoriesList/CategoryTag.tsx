import { KOR_CATEGORY } from '@/constants/category-translate';
import LAYOUT_VARIABLES from '@/styles/layout-variables';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { memo } from 'react';
import styled from 'styled-components';

interface Props {
  category: string;
  quantity: number;
}

const CategoryTag = ({ category, quantity }: Props) => {
  const [, currentCategory] = useSelectedLayoutSegments();

  const isAllCategory = category === 'all';

  const isCurrentCategory = isAllCategory ? !currentCategory : category === currentCategory;

  let translatedCategory = currentCategory;

  if (KOR_CATEGORY[category]) translatedCategory = KOR_CATEGORY[category];

  return (
    <Link href={isAllCategory ? '/' : `/category/${category}/1`}>
      <Container className={isCurrentCategory ? 'current-category' : ''}>
        {category} <span className="category-quantity">({quantity})</span>
      </Container>
    </Link>
  );
};

const Container = styled.span`
  display: flex;
  align-items: center;

  width: fit-content;
  height: fit-content;

  padding: 8px 18px 6px 18px;
  margin-right: 8px;
  margin-bottom: 10px;

  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.middle};

  background-color: ${({ theme }) => theme.theme};

  white-space: nowrap;
  color: ${({ theme }) => theme.content};
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
    background-color: ${({ theme }) => theme.content};
    color: ${({ theme }) => theme.theme};
  }

  @media (max-width: ${LAYOUT_VARIABLES.breakPoint}) {
    font-size: 18px;
  }
`;

export default memo(CategoryTag);
