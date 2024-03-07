import { postCardDate } from './PostCard.css';

interface Props {
  date: string;
}

const PostCardDate = ({ date }: Props) => {
  return <p className={postCardDate}>{date.split('/').join(' / ')}</p>;
};

export default PostCardDate;
