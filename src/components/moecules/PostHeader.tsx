import React from "react"
import styled from "styled-components"
import PostHeaderTitle from "../atoms/PostHeaderTitle"
import PostHeaderTag from "../atoms/PostHeaderTag"
import PostHeaderDate from "../atoms/PostHeaderDate"
import PostHeaderCategory from "../atoms/PostHeaderCategory"

type Props = {
  title: string;
  date: string;
  tags: string[];
  category: string;
}

const PostHeaderBox = styled.div`
  margin-bottom: 20px;
  
  .title-wrapper {
    display: flex;
    flex-direction: column;
  }
`

const PostHeader = ({ title, date, tags, category } : Props) => {
  return (
    <PostHeaderBox>
      <div className="title-wrapper">
        <PostHeaderTitle title={title}/>
        <PostHeaderCategory category={category}/>
      </div>
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