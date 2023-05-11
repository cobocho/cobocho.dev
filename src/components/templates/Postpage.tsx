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
      <Head>
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`www.cobocho.dev/post/${category}/${slug}`} />
        <meta property="og:image" content={post.thumbnail} />
        <meta
          property="og:description"
          content={post.description}
        />      
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:domain" content="cobocho.dev" />
        <meta property="twitter:url" content={`www.cobocho.dev/post/${category}/${slug}`} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.thumbnail} />
      </Head>
      
      <PostpageBox>
        <div className="post-wrapper">
          <PostHeader title={post.title} category={post.category} date={post.date} tags={post.tags}/>
          <PostBody>
            {post.content}
          </PostBody>
        </div>
      </PostpageBox>
    </>
  )
}

export default Postpage;