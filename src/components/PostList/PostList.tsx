import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { Do_Hyeon } from 'next/font/google';

import PageList from '../PageList/PageList';
import PostCard from '../PostCard/PostCard';

import Post from '@/types/post';

import { appearFromLeft, postItem } from '@/styles/framer-motions';

import { categoryDescription, categoryTrans } from '@/constants/categoryTrans';

type Props = {
  title: string;
  allPosts: Post[];
  postQuantity: number;
  children?: JSX.Element[];
};

const DoHyeon = Do_Hyeon({
  preload: false,
  weight: ['400'],
});

const PostListBox = styled.div`
  animation: appearPosts 1s forwards;

  li {
    list-style: none;
  }

  .list-title-wrapper {
    display: flex;
    align-items: flex-end;
    height: 62px;
    margin-bottom: 20px;
  }

  .list-title {
    display: block;
    margin-right: 10px;
    font-family: 'Bebas Neue', 'Do Hyeon', cursive;
    font-size: 48px;
    line-height: 1.1;
  }

  .list-title-description {
    position: relative;
    bottom: 6px;
    opacity: 0.4;
    font-size: 24px;
  }

  .post-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    margin-bottom: 100px;
  }

  @media (max-width: 900px) {
    .post-list {
      display: flex;
      flex-direction: column;
    }

    .list-title-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }

    .list-title {
      margin-right: 20px;
      font-size: 36px;
    }

    .list-title-description {
      bottom: 0;
      opacity: 0.4;
      font-size: 20px;
    }
  }
`;

const PostList = ({ title, allPosts, postQuantity }: Props) => {
  const description = categoryDescription[title];
  if (categoryTrans[title]) title = categoryTrans[title];

  return (
    <PostListBox>
      <motion.div
        className="list-title-wrapper"
        variants={appearFromLeft}
        initial="hidden"
        animate="visible"
      >
        <h2 className={`list-title ${DoHyeon.className}`}>{title}</h2>
        <em className="list-title-description">{description}</em>
      </motion.div>
      <ul className="post-list">
        {
          <AnimatePresence>
            {allPosts.map(({ title, category, thumbnail, description, date, slug, tags }) => {
              return (
                <motion.li
                  variants={postItem}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    y: 30,
                    transition: {
                      duration: 0.1,
                    },
                  }}
                  key={slug}
                >
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
      <PageList postQuantity={postQuantity} />
    </PostListBox>
  );
};

export default PostList;
