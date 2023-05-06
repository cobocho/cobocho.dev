import React from "react"
import styled from "styled-components"
import PostCard from "../moecules/PostCard"
import Post from "@/types/post"

type Props = {
  title: string;
  allPosts: Post[];
}

const PostListBox = styled.section`
  animation: appear 1s forwards;

  .list-title {
    font-family: 'Bebas Neue', 'Do Hyeon', cursive;
    font-size: 48px;
    margin-bottom: 20px;
  }
  
  .post-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }

  @media (max-width: 900px) {
    .post-list {
      display: flex;
      flex-direction: column;
    }
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

const PostList = ({ title, allPosts } : Props) => {
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