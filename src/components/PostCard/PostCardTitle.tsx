import styled from 'styled-components';

interface Props {
  title: string;
}

const PostCartTitleText = styled.h2`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;
`;

const PostCardTitle = ({ title }: Props) => {
  return <PostCartTitleText>{title}</PostCartTitleText>;
};

export default PostCardTitle;
