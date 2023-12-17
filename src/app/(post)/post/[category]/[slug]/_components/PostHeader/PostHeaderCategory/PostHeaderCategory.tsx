import { KOR_CATEGORY } from '@/constants/category-translate';
import Link from 'next/link';
import { postHeaderCategory, postHeaderCategoryLink } from './PostHeaderCategory.css';

interface Props {
  category: string;
}

const PostHeaderCategory = ({ category }: Props) => {
  let transCategory;

  if (KOR_CATEGORY[category]) transCategory = KOR_CATEGORY[category];

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
