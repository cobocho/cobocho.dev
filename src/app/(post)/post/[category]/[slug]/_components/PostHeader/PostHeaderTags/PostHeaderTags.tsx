import Link from 'next/link';
import TagIcon from '@/app/_components/Icons/TagIcon';
import { postHeaderTagIcon, postHeaderTags, postHeaderTagsList, postHeaderTagsListLink } from './PostHeaderTags.css';

interface Props {
  tags: string[];
}

const PostHeaderTags = ({ tags }: Props) => {
  return (
    <div className={postHeaderTags}>
      <div className={postHeaderTagIcon}>
        <TagIcon />
      </div>
      <ul className={postHeaderTagsList}>
        {tags.map((tag) => {
          return (
            <li key={tag}>
              <Link className={postHeaderTagsListLink} href={`/tags/${tag}/1`}>
                # {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostHeaderTags;
