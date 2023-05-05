import React from "react"
import PostBody from "../moecules/PostContent";
import PostHeader from "../moecules/PostHeader";
import Post from "@/types/post";
import styled from "styled-components";

type Props = {
  post: Post
}


const PostpageBox = styled.article`
  animation: appear 1s forwards;

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

const Postpage = ({ post } : Props) => {
  return (
    <PostpageBox>
      <PostHeader title={post.title} category={post.category} date={post.date} tags={post.tags}/>
      <PostBody>
        {post.content}
      </PostBody>
    </PostpageBox>
  )
}

export default Postpage;