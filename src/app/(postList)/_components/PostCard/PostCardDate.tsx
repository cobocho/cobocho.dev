'use client';

import React from 'react';

import { timeAgo } from '@/lib/utils';

import { postCardDate } from './PostCard.css';

interface Props {
  date: string;
}

const PostCardDate = ({ date }: Props) => {
  const convertedDate = timeAgo(date);

  return <p className={postCardDate}>{convertedDate}</p>;
};

export default PostCardDate;
