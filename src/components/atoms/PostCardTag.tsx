import Link from "next/link";
import styled from "styled-components";

type Props = {
  tag: string,
}

const PostCardTagBox = styled.span`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  padding: 6px 8px 4px 8px;
  margin-right: 6px;
  margin-top: 6px;
  border-radius: 12px;
  background-color: #fff;
  color: #000;
  font-weight: 700;
  transition: all 0.4s;

  &:hover {
    background-color: #d4d4d4;
    transform: translateY(-4px);
  }
`

const PostCardTag = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag}`}>
      <PostCardTagBox>
        {tag}
      </PostCardTagBox>
    </Link>
  )
}

export default PostCardTag;