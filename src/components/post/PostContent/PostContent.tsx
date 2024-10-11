/* eslint-disable jsx-a11y/heading-has-content */
import React, { useMemo } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { Post } from '@/interfaces/post'

import { PostAnchor } from './ContentElements/PostAnchor'
import { PostImage } from './ContentElements/PostImage'
import { PostCodeBlock } from './ContentElements/PostCodeBlock'

interface PostContentProps {
  post: Post
}

function replaceSpaceToHyphen(str: unknown) {
  if (typeof str === 'string') {
    return str.split(' ').join('-')
  }
}

export const PostContent = ({ post }: PostContentProps) => {
  const customComponents: Partial<Components> = useMemo(
    () => ({
      p: (props) => (
        <span {...props} className="text-content mb-8 block leading-[190%]" />
      ),
      h1: (props) => (
        <h1
          {...props}
          className="text-content py-20 text-4xl font-bold"
          id={replaceSpaceToHyphen(props.children)}
        />
      ),
      h2: (props) => (
        <h2
          {...props}
          className="text-content py-20 text-3xl font-bold"
          id={replaceSpaceToHyphen(props.children)}
        />
      ),
      h3: (props) => (
        <h3
          {...props}
          className="text-content py-20 text-2xl font-bold"
          id={replaceSpaceToHyphen(props.children)}
        />
      ),
      h4: (props) => (
        <h4
          {...props}
          className="text-content py-20 text-xl font-bold"
          id={replaceSpaceToHyphen(props.children)}
        />
      ),
      a: PostAnchor,
      img: (props) => {
        const { alt = '', src = '', ...rest } = props
        const image = post.images[src]

        return <PostImage {...rest} src={image} alt={alt} />
      },
      ol: (props) => (
        <ol {...props} className="mb-4 flex list-decimal flex-col gap-4 pl-4" />
      ),
      ul: (props) => (
        <ul {...props} className="mb-4 flex list-disc flex-col gap-4 pl-4" />
      ),
      code: (props) => {
        const match = /language-(\w+)/.exec(props.className!)

        if (!match) {
          return (
            <span className="mx-1 inline-block rounded-md bg-gray-100 px-2">
              {props.children}
            </span>
          )
        }

        const [, language] = match

        return (
          <PostCodeBlock language={language}>
            {String(props.children)}
          </PostCodeBlock>
        )
      },
    }),
    [post],
  )

  return (
    <article>
      <ReactMarkdown
        components={customComponents}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  )
}
