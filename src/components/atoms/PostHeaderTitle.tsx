import styled from "styled-components";

type Props = {
  title: string,
}

const PostTitleText = styled.h1`
  font-size: 72px;
  font-weight: 800;
`

const PostHeaderTitle = ({ title }: Props) => {
  return (
    <PostTitleText>
      {title}
    </PostTitleText>
  )
}

export default PostHeaderTitle;