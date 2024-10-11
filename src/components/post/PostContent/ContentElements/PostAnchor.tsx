import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

interface PostAnchorProps extends PropsWithChildren {
  href?: string
}

export const PostAnchor = ({ href, children }: PostAnchorProps) => {
  if (!href) {
    return <>{children}</>
  }

  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className="text-blue-500 hover:underline">
      {children}
    </Link>
  )
}
