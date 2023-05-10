import styled from "styled-components";

type Props = {
  src: string;
  alt: string;
}

const PostContentImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 100%;
  }

  .image-desc {
    font-size: 20px;
    color: lightgray;
    text-align: center;
  }
`

const PostContentImg = ({ src, alt, ...props } : Props) => {
  return (
    <PostContentImgBox>
      <img src={src} alt={alt} />
      <figcaption className="image-desc">{alt}</figcaption>
    </PostContentImgBox>
  )
}

export default PostContentImg;