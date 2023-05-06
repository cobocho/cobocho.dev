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

  .post-wrapper {
    width: 100%;
  }
`

const Postpage = ({ post } : Props) => {
  return (
    <PostpageBox>
      <div className="post-wrapper">
        <PostHeader title={post.title} category={post.category} date={post.date} tags={post.tags}/>
        <PostBody>
          {post.content}
        </PostBody>
      </div>
    </PostpageBox>
  )
}

export default Postpage;