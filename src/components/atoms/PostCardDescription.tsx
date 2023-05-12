import styled from "styled-components";

type Props = {
  description: string,
}

const PostCardDescriptionText = styled.p`
  opacity: 0.6;
`

const PostCardDescription = ({ description }: Props) => {
  return (
    <PostCardDescriptionText>
      {description}
    </PostCardDescriptionText>
  )
}

export default PostCardDescription;