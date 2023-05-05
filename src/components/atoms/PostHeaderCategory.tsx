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
    margin-right: 6px;
  }
`

const PostHeaderCategory = ({ category }: Props) => {
  return (
    <PostHeaderCategoryBox>
      <div className="category">
        from
      </div> 
      {category}
    </PostHeaderCategoryBox>
  )
}

export default PostHeaderCategory;