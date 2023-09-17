import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import PostCardDate from './PostCardDate';
import PostCardThumbnail from './PostCardThumbnail';
import PostCardTitle from './PostCardTitle';
import PostCardDescription from './PostCardDescription';

type Props = {
  title: string;
  category: string;
  date: string;
  thumbnail: string;
  description: string;
  slug: string;
  tags: string[];
};

const PostCardBox = styled.article`
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.5s;

  .post-info {
    padding: 20px;

    .top {
      min-height: 100px;
      border-bottom: 1px solid ${(props) => props.theme.borderColor};
    }

    .under {
      display: flex;
      justify-content: end;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: 0px 0px 22px -6px rgba(0, 0, 0, 0.4);
      transform: translateY(-10px);
    }

    &:hover img {
      filter: brightness(0.5) blur(4px);
      transform: scale(1.3);
    }

    &:hover .tags {
      transform: translateY(0);
    }
  }
`;

const PostCard = ({ slug, title, category, thumbnail, date, description, tags }: Props) => {
  return (
    <Link href={`/post/${category}/${slug}`}>
      <PostCardBox>
        <PostCardThumbnail
          src={thumbnail}
          alt={`${slug}-thumbnail`}
          tags={tags}
        />
        <div className="post-info">
          <div className="top">
            <PostCardTitle title={title} />
            <PostCardDescription description={description} />
          </div>
          <div className="under">
            <PostCardDate date={date} />
          </div>
        </div>
      </PostCardBox>
    </Link>
  );
};

export default PostCard;
