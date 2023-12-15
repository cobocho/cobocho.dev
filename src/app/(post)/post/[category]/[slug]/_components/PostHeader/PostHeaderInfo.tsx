import styled from 'styled-components';
import TimeIcon from '@/app/_components/Icons/TimeIcon';

interface Props {
  date: string;
  minPerRead: number;
}

const PostHeaderInfo = ({ date, minPerRead }: Props) => {
  const dateObj = new Date(date);

  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();
  const day = dateObj.getDate();

  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <Container>
      <p className="post-date">{formattedDate}</p>
      <TimeIcon />
      <p className="post-min-per-read">{minPerRead} min read</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  margin: 10px 0 10px 0;

  font-weight: 300;
  font-size: 20px;
  color: ${({ theme }) => theme.content};

  svg {
    fill: ${({ theme }) => theme.content};
    transform: scale(0.5) translate(8px, -4px);
  }
`;

export default PostHeaderInfo;
