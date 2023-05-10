import styled from "styled-components";

type Props = {
  tag: string,
}

const PostCardTagBox = styled.span`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 6px 8px 4px 8px;
  margin-right: 6px;
  border-radius: 12px;
  background-color: #fff;
  color: #000;
  font-weight: 700;
`

const PostCardTag = ({ tag }: Props) => {
  return (
    <PostCardTagBox>
      {tag}
    </PostCardTagBox>
  )
}

export default PostCardTag;