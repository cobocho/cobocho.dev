'use client';

import { postHeader } from './PostHeader.css';
import PostHeaderCategory from './PostHeaderCategory/PostHeaderCategory';
import PostHeaderDescription from './PostHeaderDescription/PostHeaderDescription';
import PostHeaderInfo from './PostHeaderInfo/PostHeaderInfo';
import PostHeaderTags from './PostHeaderTags/PostHeaderTags';
import PostHeaderTitle from './PostHeaderTitle/PostHeaderTitle';

interface Props {
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  minPerRead: number;
}

const PostHeader = ({ title, date, tags, description, category, minPerRead }: Props) => {
  return (
    <div className={postHeader}>
      <PostHeaderCategory category={category} />
      <PostHeaderTitle title={title} />
      <PostHeaderDescription description={description} />
      <PostHeaderInfo date={date} minPerRead={minPerRead} />
      <PostHeaderTags tags={tags} />
    </div>
  );
};

export default PostHeader;
