import React from "react"
import styled from "styled-components"
import PostCard from "../moecules/PostCard"
import Post from "@/types/post"
import { motion } from "framer-motion";
import { postItem } from "@/styles/framer-motions";

type Props = {
  title: string;
  allPosts: Post[];
  children?: JSX.Element[];
}

const PostListBox = styled.div`
  animation: appearPosts 1s forwards;

  li {
    list-style: none;
  }

  .list-title {
    display: block;
    height: 62px;
    margin-bottom: 20px;
    font-family: 'Bebas Neue', 'Do Hyeon', cursive;
    font-size: 48px;
    line-height: 1.1;
    
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
`

const PostList = ({ title, allPosts } : Props) => {
  return (
    <PostListBox>
      <h2 className="list-title">
        {title}
      </h2>
      <ul className="post-list">
        {
        allPosts.map(({ title, category, thumbnail, description , date, slug, tags}) => {
          return (
            <motion.li 
              variants={postItem}
              initial='hidden'
              animate='visible'
              exit={{ opacity: 0 }}
              key={slug}
            >
              <PostCard 
                slug={slug}
                category={category}
                title={title} 
                thumbnail={thumbnail}
                description={description}
                date={date}
                tags={tags}
              />
            </motion.li>
          )
          })
        }
      </ul>
    </PostListBox>
  )
}

export default PostList;