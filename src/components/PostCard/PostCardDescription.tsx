import styled from 'styled-components';

interface Props {
  description: string;
}

const PostCardDescriptionText = styled.p`
  padding-bottom: 10px;

  color: ${({ theme }) => theme.subContent};
`;

const PostCardDescription = ({ description }: Props) => {
  return <PostCardDescriptionText>{description}</PostCardDescriptionText>;
};

export default PostCardDescription;
