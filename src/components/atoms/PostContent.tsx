import React from "react"
import styled from "styled-components"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import Image from "next/image"

type Props = {
  children: string;
}

const PostBodyBox = styled.article`
  h1 {  
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`

const Text = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
`

const customComponent = {
  p({ ...props }) {
    if (typeof props.children[0] === "object") {
      const element: any = props.children[0];
      return (
        { ...element }
      )
    }
    return (
      <Text>
        {props.children}
      </Text>
    )
  },
  img({...props}) {
    return (
      <Image src={props.src} alt={props.alt} width={300} height={200} />
    )
  }
}

const PostBody = ({ children } : Props) => {
  return (
    <PostBodyBox>
      <ReactMarkdown components={customComponent}>
        {children}
      </ReactMarkdown>
    </PostBodyBox>
  )
}

export default PostBody;