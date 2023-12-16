'use client';

import React from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import PageList from '../PageList/PageList';
import PostCard from '../PostCard/PostCard';

import Post from '@/types/post';

import { CATEGORY_DESCRIPTIONS, KOR_CATEGORY } from '@/constants/category-translate';
import { do_hyeon } from '@/app/fonts';
import LAYOUT_VARIABLES from '@/styles/layout-variables';
import AppearBottom from '@/app/_components/Motion/AppearBottom';
import AppearLeft from '@/app/_components/Motion/AppearLeft';

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
    <Container>
      <AppearLeft className="list-title-wrapper">
        <h2 className="list-title">{postTitle}</h2>
        <em className="list-title-description">{description}</em>
      </AppearLeft>
      <ul className="post-list">
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
    </Container>
  );
};

const Container = styled.div`
  animation: appearPosts 1s forwards;

  li {
    list-style: none;
  }

  .list-title-wrapper {
    display: flex;
    align-items: flex-end;

    height: 62px;

    margin-bottom: 20px;

    .list-title {
      display: block;

      margin-right: 10px;

      font-family: ${do_hyeon.style.fontFamily};
      text-transform: uppercase;
      font-size: 48px;
      line-height: 1.1;
    }

    .list-title-description {
      position: relative;
      bottom: 6px;

      color: ${({ theme }) => theme.subContent};
      font-size: 24px;
    }
  }

  .post-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;

    margin-bottom: 100px;
  }

  @media (max-width: ${LAYOUT_VARIABLES.breakPoint}) {
    .post-list {
      display: flex;
      flex-direction: column;
    }

    .list-title-wrapper {
      flex-direction: column;
      align-items: flex-start;

      .list-title {
        margin-right: 20px;

        font-size: 36px;
      }

      .list-title-description {
        bottom: 0;

        color: ${({ theme }) => theme.subContent};
        font-size: 20px;
      }
    }
  }
`;

export default PostList;
