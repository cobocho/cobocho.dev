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
    max-width: 100%;
    margin-bottom: 10px;
  }

  .image-desc {
    margin-bottom: 20px;
    font-size: 20px;
    color: lightgray;
    text-align: center;
  }
`

const PostContentImg = ({ src, alt } : Props) => {
  return (
    <PostContentImgBox>
      <img src={src} alt={alt} />
      <figcaption className="image-desc">{alt}</figcaption>
    </PostContentImgBox>
  )
}

export default PostContentImg;