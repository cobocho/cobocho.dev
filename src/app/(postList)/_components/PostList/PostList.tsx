'use client';

import { KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import { appear } from '@/styles/animation.css';
import Post from '@/types/post';

import PageList from '../PageList/PageList';
import PostCardList from '../PostCardList/PostCardList';

interface Props {
  title: KOR_CATEGORY_KEYS;
  posts: Post[];
  postQuantity?: number;
  children?: JSX.Element[];
}

const PostList = ({ posts, postQuantity }: Props) => {
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
