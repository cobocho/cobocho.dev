'use client';

import PageList from '../PageList/PageList';

import Post from '@/types/post';

import { CATEGORY_DESCRIPTIONS, KOR_CATEGORY, KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import AppearLeft from '@/app/_components/Motion/AppearLeft';
import { PostListDescription, PostListTitle, PostListTitleWrapper, postList, postListTitle } from './PostList.css';
import AppearBottom from '@/app/_components/Motion/AppearBottom';
import ViewStyle from '../ViewStyle/ViewStyle';
import PostCardList from '../PostCardList/PostCardList';
import { useLayoutEffect, useState } from 'react';
import LAYOUT_VARIABLES from '@/styles/layout-variables';

interface Props {
  title: KOR_CATEGORY_KEYS;
  posts: Post[];
  postQuantity?: number;
  children?: JSX.Element[];
}

const Title = ({ postTitle, description }: { postTitle: string; description: string }) => {
  return (
    <div className={PostListTitleWrapper}>
      <p className={PostListTitle}>{postTitle}</p>
      <p className={PostListDescription}>{description}</p>
    </div>
  );
};

const PostList = ({ title, posts, postQuantity }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const description = CATEGORY_DESCRIPTIONS[title];

  useLayoutEffect(function setResizingPostViewEvent() {
    function resizingPostViewEvent() {
      if (window.innerWidth <= LAYOUT_VARIABLES.breakPoint) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    resizingPostViewEvent();

    window.addEventListener('resize', resizingPostViewEvent);

    return () => {
      window.removeEventListener('resize', resizingPostViewEvent);
    };
  }, []);

  return (
    <section>
      <AppearLeft className={postListTitle}>
        <Title postTitle={KOR_CATEGORY[title] ? KOR_CATEGORY[title] : title} description={description} />
        {!isMobile && <ViewStyle />}
      </AppearLeft>
      <AppearBottom>
        <PostCardList posts={posts} />
      </AppearBottom>
      {postQuantity && <PageList postQuantity={postQuantity} />}
    </section>
  );
};

export default PostList;
