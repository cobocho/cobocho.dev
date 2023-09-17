import styled from 'styled-components';

type Props = {
  date: string;
};

const PostCardDateText = styled.p`
  display: block;
  width: fit-content;
  padding-top: 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: 400;
  letter-spacing: 0em;
`;

const PostCardDate = ({ date }: Props) => {
  return <PostCardDateText>{date}</PostCardDateText>;
};

export default PostCardDate;
