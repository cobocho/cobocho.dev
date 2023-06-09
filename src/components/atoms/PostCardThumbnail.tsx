import Image from 'next/image';
import styled from 'styled-components';
import PostCardTag from './PostCardTag';
import img from '../../../public/assets/blog/thumnails/Blog/make-blog-3.png';

type Props = {
  src: string;
  alt: string;
  tags: string[];
};

const ThumbnailBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.6 / 1;
  overflow: hidden;
  isolation: isolate;

  .tags {
    position: absolute;
    bottom: 20px;
    left: 20px;
    transform: translateY(100px);
    transition: transform 0.5s;
  }
`;

function PostCardThumbnail({ src, alt, tags }: Props) {
  const image = require(`../../../public${src}`).default;
  return (
    <ThumbnailBox>
      <Image
        src={image}
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
      <div className="tags">
        {tags.map((tag) => (
          <PostCardTag
            tag={tag}
            key={tag}
          />
        ))}
      </div>
    </ThumbnailBox>
  );
}

export default PostCardThumbnail;
