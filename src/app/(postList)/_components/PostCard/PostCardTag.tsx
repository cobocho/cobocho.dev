import { useRouter } from 'next/navigation';

import { postCardTag } from './PostCardTag.css';

interface Props {
  tag: string;
}

const PostCardTag = ({ tag }: Props) => {
  const router = useRouter();

  return (
    <button
      className={postCardTag}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/tags/${tag}/1`);
      }}
    >
      <span>{tag}</span>
    </button>
  );
};

export default PostCardTag;
