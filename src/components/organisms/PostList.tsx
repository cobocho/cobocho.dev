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
      allPosts.map(({ title, category, thumbnail, description , date, slug, tags}) => {
        return <PostCard 
          key={slug}
          slug={slug}
          category={category}
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