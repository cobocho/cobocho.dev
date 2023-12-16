import React from 'react';
import Link from 'next/link';

import PostCardThumbnail from './PostCardThumbnail';
import Post from '@/types/post';
import {
  postCard,
  postCardDate,
  postCardDescription,
  postCardInfo,
  postCardInfoBottom,
  postCardInfoTop,
  postCardTitle,
} from './PostCard.css';
import { timeAgo } from '@/lib/utils';

type Props = Pick<Post, 'title' | 'category' | 'date' | 'thumbnail' | 'description' | 'slug' | 'tags'>;

const PostCard = ({ slug, title, category, thumbnail, date, description, tags }: Props) => {
  const convertedDate = timeAgo(date);

  return (
    <Link className="post-card" href={`/post/${category}/${slug}`}>
      <article className={postCard}>
        <PostCardThumbnail src={thumbnail} alt={`${slug}-thumbnail`} tags={tags} />
        <div className={postCardInfo}>
          <div className={postCardInfoTop}>
            <p className={postCardTitle}>{title}</p>
            <p className={postCardDescription}>{description}</p>
          </div>
          <div className={postCardInfoBottom}>
            <p className={postCardDate}>{convertedDate}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
