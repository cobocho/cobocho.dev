import React from "react"
import PostCardDate from "../atoms/PostCardDate"
import PostCardThumbnail from "../atoms/PostCardThumbnail"
import PostCardTitle from "../atoms/PostCardTitle"
import PostCardDescription from "../atoms/PostCardDescription"
import styled from "styled-components"
import Link from "next/link"

type Props = {
  slug: string
  title: string
  date: string
  thumbnail: string
  description: string
}

const PostCardBox = styled.article`
  width: fit-content;

  .post-thumbnail {
    height: 250px;
    overflow: hidden;
    border-radius: 20px;
  }

  &:hover img {
    filter: brightness(0.5);
    transform: scale(1.3);
  }

  .post-info {
    height: 100px;
    padding: 10px;
    background-color: #fff;
    z-index: 99;
  }
`

const PostCard = ({slug, title, thumbnail, date, description} : Props) => {
  return (
    <Link href={`/posts/${title}`}>
      <PostCardBox>
        <div className="post-thumbnail">
          <PostCardThumbnail src={thumbnail} alt={`${slug}-thumbnail`} />
        </div>
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