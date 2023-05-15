import React from "react"
import PostBody from "../moecules/PostContent";
import PostHeader from "../moecules/PostHeader";
import Post from "@/types/post";
import styled from "styled-components";
import Giscus from "../moecules/Giscuss";
import { motion } from "framer-motion";
import { appearFromLeft } from "@/styles/framer-motions";
import TOC from "../moecules/TOC";

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
    <>
      <PostpageBox>
        <motion.div 
          className="post-wrapper"
          variants={appearFromLeft}
          initial='hidden'
          animate='visible'
        >
          <PostHeader title={post.title} category={post.category} date={post.date} tags={post.tags}/>
          <PostBody post={post}>
            {post.content}
          </PostBody>
          <Giscus />
        </motion.div>
        <TOC />
      </PostpageBox>
    </>
  )
}

export default Postpage;