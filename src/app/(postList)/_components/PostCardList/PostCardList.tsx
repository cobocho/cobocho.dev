'use client';

import { postViewFlag, usePostViewContext } from '@/hooks/usePostViewContext';
import Post from '@/types/post';

import PostCard from '../PostCard/PostCard';
import { postList } from '../PostList/PostList.css';

interface Props {
  posts: Post[];
}

const PostCardList = ({ posts }: Props) => {
  const { postView } = usePostViewContext();

  return (
    <ul className={`${postList} ${postView === postViewFlag.one ? 'row' : ''}`}>
      {posts.map(({ title, category, thumbnail, description, date, slug, tags }) => {
        return (
          <div key={slug}>
            <PostCard
              slug={slug}
              category={category}
              title={title}
              thumbnail={thumbnail}
              description={description}
              date={date}
              tags={tags}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default PostCardList;
