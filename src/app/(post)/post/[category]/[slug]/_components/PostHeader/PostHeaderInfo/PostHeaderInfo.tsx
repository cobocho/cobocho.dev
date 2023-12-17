import TimeIcon from '@/app/_components/Icons/TimeIcon';
import { postHeaderInfo, postHeaderInfoMinPerRed } from './PostHeaderInfo.css';

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
    <div className={postHeaderInfo}>
      <p className="post-date">{formattedDate}</p>
      <div className={postHeaderInfoMinPerRed}>
        <TimeIcon />
        <p className="post-min-per-read">{minPerRead} min read</p>
      </div>
    </div>
  );
};

export default PostHeaderInfo;
