import React from 'react';
import styled from 'styled-components';
import PostHeaderTitle from '../atoms/PostHeaderTitle';
import PostHeaderTag from '../atoms/PostHeaderTag';
import PostHeaderDate from '../atoms/PostHeaderDate';
import PostHeaderCategory from '../atoms/PostHeaderCategory';

type Props = {
  title: string;
  date: string;
  tags: string[];
  category: string;
  minPerRead: number;
};

const PostHeaderBox = styled.div`
  margin-bottom: 20px;

  .title-wrapper {
    display: flex;
    flex-direction: column;

    .info {
      display: flex;
      align-items: end;
      gap: 10px;
      margin-bottom: 10px;
      color: #979797;
    }
  }
`;

const PostHeader = ({ title, date, tags, category, minPerRead }: Props) => {
  return (
    <PostHeaderBox>
      <div className="title-wrapper">
        <PostHeaderTitle title={title} />
        <div className="info">
          <PostHeaderCategory category={category} />
          <div className="min-per-read">{minPerRead} min read</div>
        </div>
      </div>
      <PostHeaderDate date={date} />
      <div className="tags">
        {tags.map((tag) => (
          <PostHeaderTag
            tag={tag}
            key={tag}
          />
        ))}
      </div>
    </PostHeaderBox>
  );
};

export default PostHeader;
