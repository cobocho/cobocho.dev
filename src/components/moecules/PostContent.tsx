import React from "react"
import styled from "styled-components"
import PostContentText from "../atoms/PostContentText"
import ReactMarkdown from 'react-markdown'
import PostContentH1 from "../atoms/PostContentH1"
import PostContentH2 from "../atoms/PostContentH2"
import PostContentH3 from "../atoms/PostContentH3"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import PostContentImg from "../atoms/PostContentImg"
import Link from "next/link"
import Post from "@/types/post"
import Image from "next/image"

type Props = {
  children: string;
  post: Post;
}

const PostBodyBox = styled.div`
  position: relative;
  margin-bottom: 200px;
  font-size: 16px;

  * {
    margin-bottom: 20px;
  }
  
  li {
    margin-left: 20px;
    margin-bottom: 10px;
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
    background-color: ${(props) => props.theme.blockColor};
    color: ${(props) => props.theme.textColor};
    transition: all 0.5s;
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

  blockquote a {
    color: #60d3ca;
  }

  blockquote p {
    margin-bottom: 0;
  }

  strong {
    font-weight: 800;
  }

  em {
    color: #959595;
    font-style: italic;
  }

  pre {
    margin: 30px 0;
    box-shadow: 0px 0px 20px 0px rgba(255,255,255,0.2);
    -webkit-box-shadow: 0px 0px 20px 0px rgba(255,255,255,0.2);
    -moz-box-shadow: 0px 0px 20px 0px rgba(255,255,255,0.2);
  }

  code.small-code {
    padding: 4px 6px 1px 6px;
    margin-right: 3px;
    border-radius: 6px;
    background-color: ${(props) => props.theme.blockColor};
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    transition: all 0.5s;
  }

  .thumbnail {
    position: relative;
    width: 100%;
    aspect-ratio: 1.6 / 1;
    border-radius: 20px;
  }
`

const customComponent = {
  p({ ...props }) {
    const isImage = props.node.children[0].tagName === 'img';
    if (isImage) {
      return (
        <PostContentImg
          src={props.node.children[0].properties.src}
          alt={props.node.children[0].properties.alt}
        />
      )
    }
    return (
      <PostContentText>
        {props.children}
      </PostContentText>
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
          {props.children}
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

const PostBody = ({ children, post } : Props) => {
  const { thumbnail, title } = post;
  const thumbnailImg = require(`../../../public${thumbnail}`).default;

  return (
    <PostBodyBox>
      <div className="thumbnail">
        <Image
          src={thumbnailImg}
          fill
          sizes="100%"
          placeholder="blur"
          alt={`${title}-thumbnail`}
        />
      </div>
      <ReactMarkdown components={customComponent} className="post">
        {children}
      </ReactMarkdown>
    </PostBodyBox>
  )
}

export default PostBody; 