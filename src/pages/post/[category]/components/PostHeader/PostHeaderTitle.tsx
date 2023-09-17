import styled from "styled-components";

type Props = {
  title: string,
}

const PostTitleText = styled.span`
  font-size: 60px;
  font-weight: 800;
  word-break: keep-all;
  margin-bottom: 6px;

  @media (max-width: 900px) {
  font-size: 40px;
  }
`

const PostHeaderTitle = ({ title }: Props) => {
  return (
    <PostTitleText id='title'>
      {title}
    </PostTitleText>
  )
}

export default PostHeaderTitle;