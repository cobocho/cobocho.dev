import React from "react"
import PostBody from "../moecules/PostContent";
import PostHeader from "../moecules/PostHeader";
import Post from "@/types/post";
import styled from "styled-components";
import Toc from "../moecules/Toc";

type Props = {
  post: Post
}


const PostpageBox = styled.article`
  display: flex;
  animation: appear 1s forwards;

  .toc-area {
    position: absolute;
    width: 300px;
    height: 100%;
    right: -300px;
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

const Postpage = ({ post } : Props) => {
  return (
    <PostpageBox>
      <div>
        <PostHeader title={post.title} category={post.category} date={post.date} tags={post.tags}/>
        <PostBody>
          {post.content}
        </PostBody>
      </div>
      {/* <div className="toc-area">
        <Toc />
      </div> */}
    </PostpageBox>
  )
}

export default Postpage;