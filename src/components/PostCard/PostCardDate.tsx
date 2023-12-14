import { timeAgo } from '@/lib/utils';
import Post from '@/types/post';
import styled from 'styled-components';

type Props = Pick<Post, 'date'>;

const PostCardDate = ({ date }: Props) => {
  const convertedDate = timeAgo(date);

  return <Container>{convertedDate}</Container>;
};

const Container = styled.p`
  display: block;
  width: fit-content;

  padding-top: 10px;

  border-radius: 10px;

  color: ${({ theme }) => theme.content};
  font-weight: 300;
  letter-spacing: 0em;
`;

export default PostCardDate;
