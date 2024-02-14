import { KOR_CATEGORY, KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import Link from 'next/link';
import { postHeaderCategory, postHeaderCategoryLink } from './PostHeaderCategory.css';

interface Props {
  category: string;
}

const PostHeaderCategory = ({ category }: Props) => {
  const transCategory = KOR_CATEGORY[category as KOR_CATEGORY_KEYS];

  return (
    <div className={postHeaderCategory}>
      <Link className={postHeaderCategoryLink} href={`/`}>
        HOME
      </Link>
      /
      <Link className={postHeaderCategoryLink} href={`/category/${category}/1`}>
        {transCategory || category}
      </Link>
      /
    </div>
  );
};

export default PostHeaderCategory;
