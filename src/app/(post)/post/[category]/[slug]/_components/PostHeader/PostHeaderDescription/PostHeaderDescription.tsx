import { postHeaderDescription } from './PostHeaderDescription.css';

interface Props {
  description: string;
}

const PostHeaderDescription = ({ description }: Props) => {
  return <div className={postHeaderDescription}>{description}</div>;
};

export default PostHeaderDescription;
