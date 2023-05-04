import React from "react"
import styled from "styled-components"
import PostCard from "../moecules/PostCard"
import Post from "@/types/post"

type Props = {
  allPosts: Post[];
}

const PostListBox = styled.main`
  width: fit-content;
`

const PostList = ({ allPosts } : Props) => {
  console.log(allPosts);
  return (
    <PostListBox>
      {
      allPosts.map(({slug, title, thumbnail, description , date}) => {
        return <PostCard 
          slug={slug}
          key={slug}
          title={title} 
          thumbnail={thumbnail}
          description={description}
          date={date}/>
        })
      }
    </PostListBox>
    
  )
}

export default PostList;