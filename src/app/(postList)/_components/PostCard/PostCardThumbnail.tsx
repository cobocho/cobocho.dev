import Image from 'next/image';

import PostCardTag from './PostCardTag';

import Post from '@/types/post';

import { postCardTags, postCardThumbnail, postCardThumbnailImage } from './PostCardThumbnail.css';
import { postViewFlag, usePostViewContext } from '@/hooks/usePostViewContext';

interface Props {
  src: Post['thumbnail'];
  alt: string;
  tags: string[];
}

const DEFAULT_THUMBNAIL_WIDTH = 400;

const calculateQuality = (width: number) => {
  if (width <= DEFAULT_THUMBNAIL_WIDTH) return 100;

  return Math.floor(100 / Math.floor(width / DEFAULT_THUMBNAIL_WIDTH));
};

function PostCardThumbnail({ src, alt, tags }: Props) {
  const { postView } = usePostViewContext();

  return (
    <div className={postCardThumbnail}>
      <Image
        className={postCardThumbnailImage}
        src={src}
        alt={alt}
        fill={true}
        sizes="100%"
        quality={calculateQuality(src.width)}
        priority
        placeholder="blur"
      />
      {postView === postViewFlag.two && (
        <div className={postCardTags}>
          {tags.map((tag) => (
            <PostCardTag tag={tag} key={tag} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCardThumbnail;
