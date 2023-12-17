import { postHeaderTitle } from './PostHeaderTitle.css';

interface Props {
  title: string;
}

const PostHeaderTitle = ({ title }: Props) => {
  return (
    <span className={postHeaderTitle} id="title">
      {title}
    </span>
  );
};

export default PostHeaderTitle;
