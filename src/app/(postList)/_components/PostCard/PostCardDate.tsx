'use client';

import React from 'react';
import { postCardDate } from './PostCard.css';
import { timeAgo } from '@/lib/utils';

interface Props {
  date: string;
}

const PostCardDate = ({ date }: Props) => {
  const convertedDate = timeAgo(date);

  return <p className={postCardDate}>{convertedDate}</p>;
};

export default PostCardDate;
