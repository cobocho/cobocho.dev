import styled from "styled-components";

type Props = {
  title: string,
}

const PostCartTitleText = styled.h2`
  font-size: 22px;
  font-weight: 600;
`

const PostCardTitle = ({ title }: Props) => {
  return (
    <PostCartTitleText>
      {title}
    </PostCartTitleText>
  )
}

export default PostCardTitle;