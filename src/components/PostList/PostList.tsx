'use client';

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import PageList from '../PageList/PageList';
import PostCard from '../PostCard/PostCard';

import Post from '@/types/post';

import { appearFromBottom, appearFromLeft } from '@/styles/framer-motions';

import { CATEGORY_DESCRIPTIONS, KOR_CATEGORY } from '@/constants/category-translate';
import { bebas_neue } from '@/app/fonts';
import LAYOUT_VARIABLES from '@/styles/layout-variables';

interface Props {
  title: string;
  posts: Post[];
  postQuantity?: number;
  children?: JSX.Element[];
}

const PostList = ({ title, posts, postQuantity }: Props) => {
  const description = CATEGORY_DESCRIPTIONS[title];

  if (KOR_CATEGORY[title]) title = KOR_CATEGORY[title];

  return (
    <Container>
      <motion.div className="list-title-wrapper" {...appearFromLeft}>
        <h2 className="list-title">{title}</h2>
        <em className="list-title-description">{description}</em>
      </motion.div>
      <ul className="post-list">
        {
          <AnimatePresence>
            {posts.map(({ title, category, thumbnail, description, date, slug, tags }) => {
              return (
                <motion.li {...appearFromBottom} key={slug}>
                  <PostCard
                    slug={slug}
                    category={category}
                    title={title}
                    thumbnail={thumbnail}
                    description={description}
                    date={date}
                    tags={tags}
                  />
                </motion.li>
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

      font-family: ${bebas_neue.style.fontFamily};
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
