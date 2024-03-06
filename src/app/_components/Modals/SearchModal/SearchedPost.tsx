import Link from 'next/link';

import { useModal } from '@/hooks/useModal';
import Post from '@/types/post';

import {
  searchedPostItem,
  searchedPostItemCategory,
  searchedPostItemText,
} from './SearchedPost.css';

interface Props {
  post: Post;
}

const SearchedPost = ({ post }: Props) => {
  const { toggleModal } = useModal();

  return (
    <li className={searchedPostItem}>
      <span className={searchedPostItemCategory}>{post.category}</span>
      <Link href={`/post/${post.category}/${post.slug}`} onClick={toggleModal}>
        <p className={searchedPostItemText}>{post.title}</p>
      </Link>
    </li>
  );
};

export default SearchedPost;
