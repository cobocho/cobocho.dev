import styled from "styled-components";

type Props = {
  date: string,
}

const PostHeaderDateText = styled.p`
margin-bottom: 10px;
  font-size: 30px;
  font-weight: 700;
`

const PostHeaderDate = ({ date }: Props) => {
  return (
    <PostHeaderDateText>
      {date}
    </PostHeaderDateText>
  )
}

export default PostHeaderDate;