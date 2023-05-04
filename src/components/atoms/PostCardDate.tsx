import styled from "styled-components";

type Props = {
  date: string,
}

const PostCardDateText = styled.p`
  display: block;
  width: fit-content;
  padding: 5px 10px 3px 10px;
  margin-bottom: 6px;
  border-radius: 10px;
  background-color: #000;
  color: #fff;
  font-weight: 700;
`

const PostCardDate = ({ date }: Props) => {
  return (
    <PostCardDateText>
      {date}
    </PostCardDateText>
  )
}

export default PostCardDate;