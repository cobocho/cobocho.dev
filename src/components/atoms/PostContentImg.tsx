import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
}

const PostContentImgBox = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 80%;
  }

  .image-desc {
    color: lightgray;
    text-align: center;
  }

  @media (max-width: 900px) {
    img {
      max-width: 100%;
    }
  }
`

const PostContentImg = ({ src, alt, ...props } : Props) => {
  return (
    <PostContentImgBox>
      <img src={src} alt={alt} />
      {alt && <figcaption className="image-desc">{alt}</figcaption>}
    </PostContentImgBox>
  )
}

export default PostContentImg;