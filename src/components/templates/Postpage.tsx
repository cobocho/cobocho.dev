import React from "react"
import PostBody from "../moecules/PostContent";
import PostHeader from "../moecules/PostHeader";
import Post from "@/types/post";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { category, slug } = router.query;
  return (
    <>
      <PostpageBox>
        <div className="post-wrapper">
          <PostHeader title={post.title} category={post.category} date={post.date} tags={post.tags}/>
          <PostBody post={post}>
            {post.content}
          </PostBody>
        </div>
      </PostpageBox>
    </>
  )
}

export default Postpage;