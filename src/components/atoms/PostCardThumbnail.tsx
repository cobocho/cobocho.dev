import Image from 'next/image'
import styled from 'styled-components';
import PostCardTag from './PostCardTag';

type Props = {
  src: string,
  alt: string,
  tags: string[],
};

const ThumbnailBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.6 / 1;
  overflow: hidden;
  isolation: isolate;
  border-radius: 20px;
  box-shadow: 0px 0px 39px -5px rgba(0,0,0,0.13);
  -webkit-box-shadow: 0px 0px 39px -5px rgba(0,0,0,0.13);
  -moz-box-shadow: 0px 0px 39px -5px rgba(0,0,0,0.13);

  .tags {
    position: absolute;
    bottom: 20px;
    left: 20px;
    transform: translateY(100px);
    transition: transform 0.5s;
  }
`

const PostCardThumbnail = ({ src, alt, tags }: Props) => {
  return (
    <ThumbnailBox>
      <Image
        src={`${src}`}
        alt={alt}
        fill={true}
        sizes='100%'
        style={{
          objectFit: 'cover',
          transition: "all 0.5s",
        }}
      />
      <div className='tags'>
        {
          tags.map(tag => <PostCardTag tag={tag} key={tag}/>)
        }
      </div>
      
    </ThumbnailBox>
    
  )
}

export default PostCardThumbnail;
