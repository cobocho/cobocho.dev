'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

import {
  postContentImage,
  postContentImageBox,
  postContentImageDescription,
  postContentImageWrapper,
} from './PostContentImg.css';

interface Props {
  image: StaticImageData;
  alt: string;
}

const PostContentImg = ({ image, alt }: Props) => {
  const [width, setWidth] = useState('0px');

  useEffect(() => {
    const isMobile = LAYOUT_VARIABLES.breakPoint > window.innerWidth;
    const computedWidth = isMobile
      ? '100%'
      : image.width > LAYOUT_VARIABLES.breakPoint
        ? `${LAYOUT_VARIABLES.breakPoint}px`
        : `${image.width}px`;
    setWidth(computedWidth);
  }, [image.width]);

  return (
    <figure className={postContentImageWrapper}>
      <div
        className={postContentImageBox}
        style={{
          width,
          aspectRatio: image.width / image.height,
        }}
      >
        <Image
          className={postContentImage}
          src={image}
          alt={alt}
          placeholder="blur"
          blurDataURL={image.blurDataURL ?? image.src}
          fill
          loading="lazy"
          sizes="100%"
          unoptimized={image.src.includes('gif')}
        />
      </div>
      {alt && <figcaption className={postContentImageDescription}>{alt}</figcaption>}
    </figure>
  );
};

export default PostContentImg;
