import Post from '@/types/post';
import styled from 'styled-components';

type Props = Pick<Post, 'title'>;

const PostCardTitle = ({ title }: Props) => {
  return <Container>{title}</Container>;
};

const Container = styled.h2`
  margin-bottom: 10px;

  font-size: 22px;
  font-weight: 600;
`;

export default PostCardTitle;
