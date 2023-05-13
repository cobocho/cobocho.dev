import Image from "next/image";
import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
}

const PostContentImgBox = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > span {
    position: relative !important;
    & .autoImage {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }


  .image-desc {
    color: lightgray;
    text-align: center;
  }

  @media (max-width: 900px) {
    .post-img {
      max-width: 100%;
    }
  }
`

const PostContentImg = ({ src, alt, ...props } : Props) => {
  return (
    <PostContentImgBox>
      <span>
        <Image
          className="autoImage"
          src={src}
          alt={alt}
          fill={true}
          sizes="100%"
          placeholder="blur"
          blurDataURL={src}
          loading='lazy'
          decoding='async'
        />
      </span>
      {alt && <figcaption className="image-desc">{alt}</figcaption>}
    </PostContentImgBox>
  )
}

export default PostContentImg;