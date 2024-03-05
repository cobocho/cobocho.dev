import React from 'react';
import Link from 'next/link';

import PostCardThumbnail from './PostCardThumbnail';
import Post from '@/types/post';
import {
  postCard,
  postCardDescription,
  postCardInfo,
  postCardInfoBottom,
  postCardInfoTop,
  postCardTitle,
} from './PostCard.css';
import PostCardDate from './PostCardDate';
import { postViewFlag, usePostViewContext } from '@/hooks/usePostViewContext';
import { postCardTags, postCardTagsInInfo } from './PostCardThumbnail.css';
import PostCardTag from './PostCardTag';

export type PostCardProps = Pick<Post, 'title' | 'category' | 'date' | 'thumbnail' | 'description' | 'slug' | 'tags'>;

const PostCard = ({ slug, title, category, thumbnail, date, description, tags }: PostCardProps) => {
  const { postView } = usePostViewContext();

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
            {postView === postViewFlag.one ? (
              <div className={postCardTagsInInfo}>
                {tags.map((tag) => (
                  <PostCardTag tag={tag} key={tag} />
                ))}
              </div>
            ) : (
              <div />
            )}
            <PostCardDate date={date} />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
