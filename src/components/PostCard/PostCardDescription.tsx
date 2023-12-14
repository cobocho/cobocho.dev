import Post from '@/types/post';
import styled from 'styled-components';

type Props = Pick<Post, 'description'>;

const PostCardDescription = ({ description }: Props) => {
  return <Container>{description}</Container>;
};

const Container = styled.p`
  padding-bottom: 10px;

  color: ${({ theme }) => theme.subContent};
`;

export default PostCardDescription;
