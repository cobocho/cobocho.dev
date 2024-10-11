import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface PostImageProps {
  src: StaticImageData
  alt: string
}

export const PostImage = ({ src, alt }: PostImageProps) => {
  return (
    <figure className="flex w-full flex-col items-center gap-4">
      <Image
        src={src}
        width={src.width}
        height={src.height}
        blurDataURL={src.blurDataURL}
        alt={alt}
        loading="lazy"
        placeholder={src.src.includes('gif') ? 'empty' : 'blur'}
      />
      <figcaption className="text-content/50">{alt}</figcaption>
    </figure>
  )
}
