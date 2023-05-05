import React from "react"
import PostCardDate from "../atoms/PostCardDate"
import PostCardThumbnail from "../atoms/PostCardThumbnail"
import PostCardTitle from "../atoms/PostCardTitle"
import PostCardDescription from "../atoms/PostCardDescription"
import styled from "styled-components"
import Link from "next/link"
import PostHeaderTitle from "../atoms/PostHeaderTitle"
import PostHeaderTag from "../atoms/PostHeaderTag"
import PostHeaderDate from "../atoms/PostHeaderDate"

type Props = {
  title: string
  date: string
  tags: string[]
}

const PostHeaderBox = styled.div`
`

const PostHeader = ({ title, date, tags} : Props) => {
  return (
    <PostHeaderBox>
      <PostHeaderTitle title={title}/>
      <PostHeaderDate date={date} />
      <div className="tags">
        {
          tags.map(tag => <PostHeaderTag tag={tag} key={tag} />)
        }
      </div>
    </PostHeaderBox>
  )
}

export default PostHeader;