import React from "react"
import PostBody from "../moecules/PostContent";
import PostHeader from "../moecules/PostHeader";
import Post from "@/types/post";

type Props = {
  post: Post
}

const Postpage = ({ post } : Props) => {
  return (
    <>
      <PostHeader title={post.title} date={post.date} tags={post.tags}/>
      <PostBody>
        {post.content}
      </PostBody>
    </>
  )
}

export default Postpage;