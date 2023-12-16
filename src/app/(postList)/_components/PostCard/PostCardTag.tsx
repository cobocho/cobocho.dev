import React from 'react';
import { postCardTag } from './PostCardTag.css';

interface Props {
  tag: string;
}

const PostCardTag = ({ tag }: Props) => {
  return (
    <span className={postCardTag}>
      <span>{tag}</span>
    </span>
  );
};

export default PostCardTag;
