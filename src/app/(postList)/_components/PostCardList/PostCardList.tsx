'use client';

import { postViewFlag, usePostView } from '@/hooks/usePostView';
import Post from '@/types/post';

import PostCard from '../PostCard/PostCard';
import { postList } from '../PostList/PostList.css';

interface Props {
  posts: Post[];
}

const PostCardList = ({ posts }: Props) => {
  const { postView } = usePostView();

  return (
    <ul className={`${postList} ${postView === postViewFlag.one ? 'row' : ''}`}>
      {posts.map(({ title, category, thumbnail, description, date, slug, tags }) => {
        return (
          <li key={slug}>
            <PostCard
              slug={slug}
              category={category}
              title={title}
              thumbnail={thumbnail}
              description={description}
              date={date}
              tags={tags}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostCardList;
