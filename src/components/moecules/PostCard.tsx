import React from "react"
import PostCardDate from "../atoms/PostCardDate"
import PostCardThumbnail from "../atoms/PostCardThumbnail"
import PostCardTitle from "../atoms/PostCardTitle"
import PostCardDescription from "../atoms/PostCardDescription"
import styled from "styled-components"
import Link from "next/link"

type Props = {
  title: string
  date: string
  thumbnail: string
  description: string
  tags: string[]
}

const PostCardBox = styled.article`
  width: 100%;
  animation: appear 1s forwards;

  &:hover img {
    filter: brightness(0.5) blur(4px);
    transform: scale(1.3);
  }

  &:hover .tags {
    transform: translateY(0);
  }

  .post-info {
    padding: 10px;
    background-color: #fff;
  }

  @keyframes appear {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const PostCard = ({ title, thumbnail, date, description, tags} : Props) => {
  return (
    <Link href={`/posts/${title}`}>
      <PostCardBox>
        <PostCardThumbnail src={thumbnail} alt={`${title}-thumbnail`} tags={tags}/>
        <div className="post-info">
          <PostCardTitle title={title} />
          <PostCardDate date={date}/>
          <PostCardDescription description={description}/>
        </div>
      </PostCardBox>
    </Link>
    
  )
}

export default PostCard;