import styled from "styled-components";

type Props = {
  description: string,
}

const PostCardDescriptionText = styled.p`
  color: #9c9c9c;
`

const PostCardDescription = ({ description }: Props) => {
  return (
    <PostCardDescriptionText>
      {description}
    </PostCardDescriptionText>
  )
}

export default PostCardDescription;