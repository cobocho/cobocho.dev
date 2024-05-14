import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { DOMAIN } from '@/constants/domain';
import { replaceSpaceToHyphen } from '@/lib/utils';
import Post from '@/types/post';

import { postContent, postHeader, postThumbnail } from './PostContent.css';
import PostContentImg from './PostContentImg';
import {
  postContentTable,
  postContentTableHeader,
  postContentTD,
  postContentTH,
} from './PostContentImg.css';

interface Props {
  children: string;
  post: Post;
}

const PostContent = ({ children, post }: Props) => {
  const title = post.title;

  const customComponent: Partial<SpecialComponents> = useMemo(() => {
    return {
      p({ ...props }) {
        return <span className="text">{props.children}</span>;
      },

      a({ ...props }) {
        const sameDomain = props.href.includes(DOMAIN);

        return sameDomain ? (
          <Link href={props.href}>{props.children}</Link>
        ) : (
          <a target="_blank" href={props.href}>
            {props.children}
          </a>
        );
      },

      h1({ ...props }) {
        return (
          <h1 className={postHeader} id={replaceSpaceToHyphen(props.children[0])}>
            {props.children}
          </h1>
        );
      },

      h2({ ...props }) {
        return (
          <h2 className={postHeader} id={replaceSpaceToHyphen(props.children[0])}>
            {props.children}
          </h2>
        );
      },

      h3({ ...props }) {
        return (
          <h3 className={postHeader} id={replaceSpaceToHyphen(props.children[0])}>
            {props.children}
          </h3>
        );
      },

      h4({ ...props }) {
        return (
          <h4 className={postHeader} id={replaceSpaceToHyphen(props.children[0])}>
            {props.children}
          </h4>
        );
      },

      table({ ...props }) {
        return <table className={postContentTable}>{props.children}</table>;
      },

      thead({ ...props }) {
        return <thead className={postContentTableHeader}>{props.children}</thead>;
      },

      td({ ...props }) {
        return <td className={postContentTD}>{props.children}</td>;
      },

      th({ ...props }) {
        return <td className={postContentTH}>{props.children}</td>;
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
    <div className={postContent}>
      <div className={postThumbnail}>
        <Image
          src={post.thumbnail}
          sizes="100%"
          fill
          priority
          placeholder="blur"
          alt={`${title!}-thumbnail`}
        />
      </div>
      <ReactMarkdown
        components={customComponent}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        className="post"
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default PostContent;
