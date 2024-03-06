import Link from 'next/link';
import React from 'react';

import { postViewFlag, usePostViewContext } from '@/hooks/usePostViewContext';
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
import PostCardTag from './PostCardTag';
import PostCardThumbnail from './PostCardThumbnail';
import { postCardTagsInInfo } from './PostCardThumbnail.css';

export type PostCardProps = Pick<
  Post,
  'title' | 'category' | 'date' | 'thumbnail' | 'description' | 'slug' | 'tags'
>;

const PostCard = ({ slug, title, category, thumbnail, date, description, tags }: PostCardProps) => {
  const { postView } = usePostViewContext();

  return (
    <Link className="post-card" href={`/post/${category}/${slug}`}>
      <article className={`${postCard}${postView === postViewFlag.one ? ' row' : ''}`}>
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
