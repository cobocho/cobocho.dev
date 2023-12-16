'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';

import PageList from '../PageList/PageList';
import PostCard from '../PostCard/PostCard';

import Post from '@/types/post';

import { CATEGORY_DESCRIPTIONS, KOR_CATEGORY } from '@/constants/category-translate';
import AppearBottom from '@/app/_components/Motion/AppearBottom';
import AppearLeft from '@/app/_components/Motion/AppearLeft';
import { PostListDescription, PostListTitle, PostListTitleWrapper, postList } from './PostList.css';

interface Props {
  title?: string;
  posts: Post[];
  postQuantity?: number;
  children?: JSX.Element[];
}

const PostList = ({ title, posts, postQuantity }: Props) => {
  let postTitle = title ? title : 'recent';

  const description = CATEGORY_DESCRIPTIONS[postTitle];

  if (KOR_CATEGORY[postTitle]) {
    postTitle = KOR_CATEGORY[postTitle];
  }

  return (
    <section>
      <AppearLeft className={PostListTitleWrapper}>
        <h2 className={PostListTitle}>{postTitle}</h2>
        <em className={PostListDescription}>{description}</em>
      </AppearLeft>
      <ul className={postList}>
        {
          <AnimatePresence>
            {posts.map(({ title, category, thumbnail, description, date, slug, tags }) => {
              return (
                <AppearBottom key={slug}>
                  <PostCard
                    slug={slug}
                    category={category}
                    title={title}
                    thumbnail={thumbnail}
                    description={description}
                    date={date}
                    tags={tags}
                  />
                </AppearBottom>
              );
            })}
          </AnimatePresence>
        }
      </ul>
      {postQuantity && <PageList postQuantity={postQuantity} />}
    </section>
  );
};

export default PostList;
