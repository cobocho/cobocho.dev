import React from 'react';
import { postCardTag } from './PostCardTag.css';
import { useRouter } from 'next/navigation';

interface Props {
  tag: string;
}

const PostCardTag = ({ tag }: Props) => {
  const router = useRouter();

  return (
    <span
      className={postCardTag}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/tags/${tag}/1`);
      }}
    >
      <span>{tag}</span>
    </span>
  );
};

export default PostCardTag;
