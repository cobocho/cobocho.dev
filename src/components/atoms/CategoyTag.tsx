import Link from "next/link";
import styled from "styled-components";

type Props = {
  category: string,
  currentCategory?: string,
}

const CategoryTagBox = styled.span`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 6px 16px 4px 16px;
  margin-right: 8px;
  margin-bottom: 10px;
  border-radius: 20px;
  background-color: #fff;
  color: #000000;
  font-size: 24px;
  font-weight: 700;
  box-shadow: inset 5px 5px 10px #ededed,
              inset -5px -5px 10px #ffffff,
              5px 5px 10px #0000001b;
  transition: background-color 0.3s, transform 0.6s;

  &:hover {
    transform: translateY(-5px);
  }

  &.current-category {
    background-color: #000;
    color: #fff;
    box-shadow: none;
  }
`

const CategoryTag = ({ category, currentCategory }: Props) => {
  if (!currentCategory || !category) currentCategory = 'All';
  const isCurrentCategory = currentCategory === category;
  return (
    <Link href={category === 'All' ? '/' : `/category/${category}`}>
      <CategoryTagBox className={isCurrentCategory ? "current-category" : ""}>
        {category}
      </CategoryTagBox>
    </Link>
  )
}

export default CategoryTag;