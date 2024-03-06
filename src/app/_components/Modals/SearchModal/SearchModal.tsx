import { useMemo, useState } from 'react';

import Post from '@/types/post';

import AppearBottom from '../../Motion/AppearBottom';
import Modal from '../Modal/Modal';
import SearchedPost from './SearchedPost';
import { searchedPostList, searchFailed } from './SearchedPost.css';
import SearchForm from './SearchForm';

interface Props {
  posts: Post[];
}

const searchPost = (posts: Post[], query: string) => {
  if (query.length === 0) return [];

  return posts.filter((post) => post.title.toUpperCase().includes(query.toUpperCase()));
};

const SearchModal = ({ posts }: Props) => {
  const [query, setQuery] = useState<string>('');

  const searchedPosts = useMemo(() => searchPost(posts, query), [query, posts]);

  return (
    <Modal>
      <Modal.Header>검색</Modal.Header>
      <SearchForm setQuery={setQuery} />
      <ul className={searchedPostList}>
        {searchedPosts.length > 0 ? (
          <AppearBottom>
            {searchedPosts.map((post) => (
              <SearchedPost key={post.title} post={post} />
            ))}
          </AppearBottom>
        ) : query.length > 0 ? (
          <AppearBottom className={searchFailed}>
            <p>undefined!</p>
          </AppearBottom>
        ) : (
          <></>
        )}
      </ul>
    </Modal>
  );
};

export default SearchModal;
