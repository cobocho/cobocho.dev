'use client';

import { KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import { appear } from '@/styles/animation.css';
import Post from '@/types/post';

import PageList from '../PageList/PageList';
import PostCardList from '../PostCardList/PostCardList';
import { PostListDescription, PostListTitle, PostListTitleWrapper } from './PostList.css';

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
  return (
    <section>
      <div className={appear.left}>
        <PostCardList posts={posts} />
      </div>
      {postQuantity && <PageList postQuantity={postQuantity} />}
    </section>
  );
};

export default PostList;
