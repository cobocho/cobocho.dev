import React from "react"
import styled from "styled-components"
import PostContentP from "../atoms/PostContentP"
import ReactMarkdown from 'react-markdown'
import PostContentH1 from "../atoms/PostContentH1"
import PostContentH2 from "../atoms/PostContentH2"
import PostContentH3 from "../atoms/PostContentH3"
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import PostContentImg from "../atoms/PostContentImg"

type Props = {
  children: string;
}

const PostBodyBox = styled.div`
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
      <PostContentP>
        {props.children}
      </PostContentP>
    )
  },
  h1({ ...props }) {
    return (
      <PostContentH1>
        {props.children}
      </PostContentH1>
    )
  },
  h2({ ...props }) {
    return (
      <PostContentH2>
        {props.children}
      </PostContentH2>
    )
  },
  h3({ ...props }) {
    return (
      <PostContentH3>
        {props.children}
      </PostContentH3>
    )
  },
  img({...props}) {
    return (
      <PostContentImg
        src={props.src}
        alt={props.alt}
      />
    )
  },
  code({ className, children, ...props }: SyntaxHighlighterProps) {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code>{children}</code>
    );
  },
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