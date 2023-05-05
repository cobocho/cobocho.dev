import React from "react"
import styled from "styled-components"
import PostContentP from "../atoms/PostContentP"
import ReactMarkdown from 'react-markdown'
import Image from "next/image"
import PostContentH1 from "../atoms/PostContentH1"
import PostContentH2 from "../atoms/PostContentH2"
import PostContentH3 from "../atoms/PostContentH3"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  children: string;
}

type codeProps = {
  inline: string,
  className: string,
  children: React.ReactNode,
}

const PostBodyBox = styled.article`
`

const customComponent = {
  p({ ...props }) {
    console.log(props);
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
      <Image src={props.src} alt={props.alt} width={300} height={200} />
    )
  },
  code({ inline, className, children, ...props }: codeProps) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        language={match[1]}
        PreTag="div"
        {...props}
        style={materialDark}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code {...props}>{children}</code>
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