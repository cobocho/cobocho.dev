import React from 'react';
import PostCardDate from '../atoms/PostCardDate';
import PostCardThumbnail from '../atoms/PostCardThumbnail';
import PostCardTitle from '../atoms/PostCardTitle';
import PostCardDescription from '../atoms/PostCardDescription';
import styled from 'styled-components';
import Link from 'next/link';

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

  .post-info {
    padding: 10px;
  }

  @media (hover: hover) and (pointer: fine) {
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
          <PostCardDate date={date} />
          <PostCardTitle title={title} />
          <PostCardDescription description={description} />
        </div>
      </PostCardBox>
    </Link>
  );
};

export default PostCard;
