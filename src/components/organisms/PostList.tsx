import React from "react"
import styled from "styled-components"
import PostCard from "../moecules/PostCard"
import Post from "@/types/post"

type Props = {
  allPosts: Post[];
}

const PostListBox = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
`

const PostList = ({ allPosts } : Props) => {
  return (
    <PostListBox>
      {
      allPosts.map(({ title, thumbnail, description , date, tags}) => {
        return <PostCard 
          key={title}
          title={title} 
          thumbnail={thumbnail}
          description={description}
          date={date}
          tags={tags}
          />
        })
      }
    </PostListBox>
    
  )
}

export default PostList;