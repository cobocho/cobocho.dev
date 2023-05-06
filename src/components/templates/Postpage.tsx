import React from "react"
import PostBody from "../moecules/PostContent";
import PostHeader from "../moecules/PostHeader";
import Post from "@/types/post";
import styled from "styled-components";

type Props = {
  post: Post
}


const PostpageBox = styled.article`
  display: flex;

  .toc-area {
    position: absolute;
    width: 300px;
    height: 100%;
    right: -300px;
  }
`

const Postpage = ({ post } : Props) => {
  return (
    <PostpageBox>
      <div>
        <PostHeader title={post.title} category={post.category} date={post.date} tags={post.tags}/>
        <PostBody>
          {post.content}
        </PostBody>
      </div>
    </PostpageBox>
  )
}

export default Postpage;