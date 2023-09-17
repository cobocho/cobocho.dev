import Link from "next/link";
import styled from "styled-components";

type Props = {
  tag: string,
}

const PostHeaderTagBox = styled.span`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 6px 10px 4px 10px;
  margin-right: 8px;
  margin-bottom: 10px;
  border: 1px solid #000;
  border-radius: 20px;
  background-color: #fff;
  color: #000;
  font-size: 20px;
  font-weight: 600;
  transition: all 0.5s;

  &:hover {
    background-color: #d7d7d7;
    cursor: pointer;
  }


  @media (max-width: 900px) {
    font-size: 14px;
  }
`

const PostHeaderTag = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag}/1`}>
      <PostHeaderTagBox>
        {tag}
      </PostHeaderTagBox> 
    </Link>
  )
}

export default PostHeaderTag;