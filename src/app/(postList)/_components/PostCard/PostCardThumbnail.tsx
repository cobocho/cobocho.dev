import Image from 'next/image';
import styled from 'styled-components';
import PostCardTag from './PostCardTag';
import Post from '@/types/post';

interface Props {
  src: Post['thumbnail'];
  alt: string;
  tags: string[];
}

function PostCardThumbnail({ src, alt, tags }: Props) {
  return (
    <Container>
      <Image
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
      <div className="tags">
        {tags.map((tag) => (
          <PostCardTag tag={tag} key={tag} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
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

export default PostCardThumbnail;
