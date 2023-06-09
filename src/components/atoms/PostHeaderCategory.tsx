import { categoryTrans } from '@/constants/categoryTrans';
import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  category: string;
};

const PostHeaderCategoryBox = styled.span`
  display: flex;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  color: #a0a0a0;

  .category {
    margin-left: 6px;
    text-transform: uppercase;
  }
`;

const PostHeaderCategory = ({ category }: Props) => {
  let transCategory;
  if (categoryTrans[category]) transCategory = categoryTrans[category];

  return (
    <PostHeaderCategoryBox>
      from
      <div className="category">
        <Link href={`/category/${category}/1`}>{transCategory || category}</Link>
      </div>
    </PostHeaderCategoryBox>
  );
};

export default PostHeaderCategory;
