import styled from "styled-components";

type Props = {
  title: string,
}

const PostTitleText = styled.h1`
  font-size: 60px;
  font-weight: 800;

  @media (max-width: 900px) {
  font-size: 40px;
  }
`

const PostHeaderTitle = ({ title }: Props) => {
  return (
    <PostTitleText>
      {title}
    </PostTitleText>
  )
}

export default PostHeaderTitle;