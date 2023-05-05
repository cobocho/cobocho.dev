import styled from "styled-components";

type Props = {
  date: string,
}

const PostHeaderDateText = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  color: #979797;

  @media (max-width: 900px) {
    font-size: 18px;
  }
`

const PostHeaderDate = ({ date }: Props) => {
  return (
    <PostHeaderDateText>
      updated {date}
    </PostHeaderDateText>
  )
}

export default PostHeaderDate;