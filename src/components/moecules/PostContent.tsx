import React from "react"
import styled from "styled-components"
import PostContentP from "../atoms/PostContentP"
import ReactMarkdown from 'react-markdown'
import PostContentH1 from "../atoms/PostContentH1"
import PostContentH2 from "../atoms/PostContentH2"
import PostContentH3 from "../atoms/PostContentH3"
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import PostContentImg from "../atoms/PostContentImg"
import remarkGfm from 'remark-gfm';
import Link from "next/link"

type Props = {
  children: string;
}

const PostBodyBox = styled.div`
  font-size: 18px;
  opacity: 0;
  animation: appearPost 1s 0.2s forwards;

  * {
    margin-bottom: 20px;
  }

  li {
    margin-left: 20px;
  }

  a {
    font-weight: 700;
    color: #008d81;
  }

  blockquote {
    position: relative;
    overflow: hidden;
    padding: 20px 30px;
    border-radius: 10px;
    background-color: #f1f1f1;
  }

  blockquote::before {
    content: "";
    display: block;
    width: 10px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #000;
  }

  blockquote p {
    margin-bottom: 0;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  code.small-code {
    position: relative;
    top: 1px;
    padding: 4px 6px 1px 6px;
    border-radius: 6px;
    color: #000;
    font-weight: 500;
    background-color: #f1f1f1;
  }

  @keyframes appearPost {
    0% {
      transform: translateX(-30px);
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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
  a({ ...props }) {
    return (
      <Link href={props.href}>
        {props.children}
      </Link>
    )
  },
  h1({ ...props }) {
    return (
      <PostContentH1 id={props.children}>
        {props.children}
      </PostContentH1>
    )
  },
  h2({ ...props }) {
    return (
      <PostContentH2 id={props.children}>
        {props.children}
      </PostContentH2>
    )
  },
  h3({ ...props }) {
    return (
      <PostContentH3 id={props.children}>
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
  code({ ...props }) {
    const match = /language-(\w+)/.exec(props.className) as RegExpExecArray;
    if (!match) {
      return (
        <code className='small-code'>
          {String(props.children).replace(/\n$/, '')}
        </code>
      )
    }
    return (
      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
        {String(props.children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    )
  }
}

const PostBody = ({ children } : Props) => {
  return (
    <>
      <PostBodyBox>
        <ReactMarkdown components={customComponent}>
          {children}
        </ReactMarkdown>
      </PostBodyBox>
    </>
  )
}

export default PostBody; 