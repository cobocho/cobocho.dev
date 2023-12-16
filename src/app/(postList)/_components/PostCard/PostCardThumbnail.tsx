import Image from 'next/image';

import PostCardTag from './PostCardTag';

import Post from '@/types/post';

import { postCardTags, postCardThumbnail, postCardThumbnailImage } from './PostCardThumbnail.css';

interface Props {
  src: Post['thumbnail'];
  alt: string;
  tags: string[];
}

function PostCardThumbnail({ src, alt, tags }: Props) {
  return (
    <div className={postCardThumbnail}>
      <Image
        className={postCardThumbnailImage}
        src={src}
        alt={alt}
        fill={true}
        sizes="100%"
        placeholder="blur"
        loading="lazy"
        style={{
          objectFit: 'cover',
          transition: 'all 0.5s',
        }}
      />
      <div className={postCardTags}>
        {tags.map((tag) => (
          <PostCardTag tag={tag} key={tag} />
        ))}
      </div>
    </div>
  );
}

export default PostCardThumbnail;
