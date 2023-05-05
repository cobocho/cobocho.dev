import Link from "next/link";
import styled from "styled-components";

type Props = {
  category: string,
}

const PostHeaderCategoryBox = styled.span`
  display: flex;
  margin-bottom: 10px;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  color: #a0a0a0;

  .category {
    margin-left: 6px;
    color: #000;
  }
`

const PostHeaderCategory = ({ category }: Props) => {
  return (
    <PostHeaderCategoryBox>
      from
      <div className="category">
        <Link href={`/category/${category}`}>
          {category}
        </Link>
      </div>
    </PostHeaderCategoryBox>
  )
}

export default PostHeaderCategory;