import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
}

const PostContentImgBox = styled.figure<{ aspectRatio: number, loaded: boolean }>`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  .image-box {
    position: relative;
    width: 80%;
    margin: 0 auto 10px auto;
    aspect-ratio: ${props => props.aspectRatio};
    background-color: ${props => props.loaded ? "transparent" : props.theme.blockColor};
  }

  .image-desc {
    color: #a6a6a6;
    text-align: center;
  }

  @media (max-width: 900px) {
    .image-box {
      width: 100%;
    }
  }
`

const PostContentImg = ({ src, alt } : Props) => {
  const image = require(`../../../public${src}`).default;
  const aspectRatio = image.width / image.height;
  const [loaded, setLoaded] = useState(false);

  function loadComplete() {
    setLoaded(true);
  }

  return (
    <PostContentImgBox aspectRatio={aspectRatio} loaded={loaded}>
      <div className="image-box">
        {
          image.src.includes('.gif') ?
            <Image
              src={image}
              alt={alt}
              placeholder='blur'
              blurDataURL={image.src}
              fill
              onLoad={loadComplete}
              loading="lazy"
              sizes="100%"
            />
          :
            <Image
              src={image}
              alt={alt}
              placeholder='blur'
              fill
              onLoad={loadComplete}
              loading = 'lazy'
              sizes="100%"
            />
        }
      </div>
      {alt && <figcaption className="image-desc">{alt}</figcaption>}
    </PostContentImgBox>
  )
}

export default PostContentImg;