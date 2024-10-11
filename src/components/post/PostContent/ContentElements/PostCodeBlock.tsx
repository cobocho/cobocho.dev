/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface PostCodeBlockProps {
  language: string
  children: string
}

export const PostCodeBlock = ({ children, language }: PostCodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      PreTag="div"
      showLineNumbers
      customStyle={{
        borderRadius: '1rem',
        marginBottom: '3rem',
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}
