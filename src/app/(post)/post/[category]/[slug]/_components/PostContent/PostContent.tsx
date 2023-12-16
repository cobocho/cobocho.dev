'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Link from 'next/link';
import Image from 'next/image';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { replaceSpaceToHyphen } from '@/lib/utils';

import PostContentImg from './PostContentImg';

import Post from '@/types/post';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

import { SpecialComponents } from 'react-markdown/lib/ast-to-react';

interface Props {
  children: string;
  post: Post;
}

const PostContent = ({ children, post }: Props) => {
  const title = post.title;

  const customComponent: Partial<SpecialComponents> = useMemo(() => {
    return {
      p({ ...props }) {
        const isImage = props.node.children[0].tagName === 'img';
        if (isImage) {
          const image = post.images[props.node.children[0].properties.src];

          return <PostContentImg image={image} alt={props.node.children[0].properties.alt} />;
        }
        return <p>{props.children}</p>;
      },

      a({ ...props }) {
        return <Link href={props.href}>{props.children}</Link>;
      },

      h1({ ...props }) {
        return <h1 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</h1>;
      },

      h2({ ...props }) {
        return <h2 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</h2>;
      },

      h3({ ...props }) {
        return <h3 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</h3>;
      },

      h4({ ...props }) {
        return <h4 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</h4>;
      },

      img({ ...props }) {
        const image = post.images[props.src];

        return <PostContentImg image={image} alt={props.alt} />;
      },

      code({ ...props }) {
        const match = /language-(\w+)/.exec(props.className!);

        if (!match) {
          return <code className="small-code">{props.children}</code>;
        }

        const [, language] = match;

        return (
          <SyntaxHighlighter style={vscDarkPlus} language={language}>
            {String(props.children)}
          </SyntaxHighlighter>
        );
      },
    };
  }, [post]);

  return (
    <Container>
      <div className="thumbnail">
        <Image src={post.thumbnail} fill sizes="100%" placeholder="blur" loading="lazy" alt={`${title!}-thumbnail`} />
      </div>
      <ReactMarkdown
        components={customComponent}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        className="post"
      >
        {children}
      </ReactMarkdown>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin-bottom: 200px;

  font-size: 16px;
  line-height: 28px;

  * {
    margin-bottom: 20px;
  }

  p {
    line-height: 32px;
    white-space: pre-wrap;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    padding: ${LAYOUT_VARIABLES.headerHeight} 0 20px 0;

    line-height: 44px;
    font-weight: 600;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 24px;
  }

  li {
    margin: 5px 0 5px 20px;
  }

  a {
    font-weight: 500;
    color: #1a9ed7;

    &:hover {
      font-weight: 600;
      text-decoration: underline;
    }
  }

  iframe {
    width: 100%;
  }

  blockquote {
    position: relative;

    padding: 30px 30px;

    color: ${({ theme }) => theme.content};
    font-weight: 300;

    transition: all 0.5s;
  }

  blockquote::before {
    content: '';
    display: block;

    position: absolute;
    left: 0;
    top: 0;

    width: 10px;
    height: 100%;

    background-color: #494949;
  }

  blockquote p {
    margin-bottom: 0;
  }

  strong {
    font-weight: 600;
  }

  em {
    color: #676767;
    font-style: italic;
  }

  del {
    color: ${({ theme }) => theme.subContent};
  }

  pre {
    margin: 30px 0;

    border-radius: 10px;

    box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.05);

    overflow: hidden;
  }

  code.small-code {
    padding: 4px 6px 1px 6px;
    margin-right: 3px;

    border-radius: 6px;
    background-color: ${({ theme }) => theme.middle};

    color: ${({ theme }) => theme.content};

    transition: all 0.5s;
  }

  .thumbnail {
    position: relative;

    width: 100%;
    aspect-ratio: 1.6 / 1;

    border-radius: 20px;

    img {
      border-radius: 10px;
    }
  }
`;

export default PostContent;
