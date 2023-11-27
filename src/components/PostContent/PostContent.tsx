import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Link from 'next/link';
import Image from 'next/image';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { replaceSpaceToHyphen } from '@/lib/utils';

import PostContentH1 from './PostContentH1';
import PostContentH2 from './PostContentH2';
import PostContentH3 from './PostContentH3';
import PostContentH4 from './PostContentH4';
import PostContentText from './PostContentText';
import PostContentImg from './PostContentImg';

import Post from '@/types/post';

interface Props {
	children: string;
	post: Post;
}

const customComponent = {
	p({ ...props }) {
		const isImage = props.node.children[0].tagName === 'img';
		if (isImage) {
			return (
				<PostContentImg
					src={props.node.children[0].properties.src}
					alt={props.node.children[0].properties.alt}
				/>
			);
		}
		return <PostContentText>{props.children}</PostContentText>;
	},

	a({ ...props }) {
		return <Link href={props.href}>{props.children}</Link>;
	},

	h1({ ...props }) {
		return (
			<PostContentH1 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</PostContentH1>
		);
	},

	h2({ ...props }) {
		return (
			<PostContentH2 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</PostContentH2>
		);
	},

	h3({ ...props }) {
		return (
			<PostContentH3 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</PostContentH3>
		);
	},

	h4({ ...props }) {
		return (
			<PostContentH4 id={replaceSpaceToHyphen(props.children[0])}>{props.children}</PostContentH4>
		);
	},

	img({ ...props }) {
		return (
			<PostContentImg
				src={props.src}
				alt={props.alt}
			/>
		);
	},

	code({ ...props }) {
		const match = /language-(\w+)/.exec(props.className) as RegExpExecArray;
		if (!match) {
			return <code className="small-code">{props.children}</code>;
		}
		return (
			<SyntaxHighlighter
				style={vscDarkPlus}
				language={match[1]}
				PreTag="div"
				{...props}
			>
				{String(props.children).replace(/\n$/, '')}
			</SyntaxHighlighter>
		);
	},
};

const PostContent = ({ children, post }: Props) => {
	const thumbnailImg = require(`../../../public${post.thumbnail}`);
	const title = post.title;

	return (
		<Container>
			<div className="thumbnail">
				<Image
					src={thumbnailImg!}
					fill
					sizes="100%"
					placeholder="blur"
					loading="lazy"
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

		color: ${(props) => props.theme.textColor};
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
		opacity: 0.4;
	}

	pre {
		margin: 30px 0;

		border-radius: 10px;

		overflow: hidden;

		box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.05);
		-webkit-box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.05);
		-moz-box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.05);

		div {
			margin: 0 !important;
		}
	}

	code.small-code {
		padding: 4px 6px 1px 6px;
		margin-right: 3px;

		border-radius: 6px;
		background-color: ${(props) => props.theme.blockColor};

		color: ${(props) => props.theme.textColor};

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
