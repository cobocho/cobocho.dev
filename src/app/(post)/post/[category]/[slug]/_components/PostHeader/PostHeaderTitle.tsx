import styled from 'styled-components';

interface Props {
  title: string;
}

const PostHeaderTitle = ({ title }: Props) => {
  return <Container id="title">{title}</Container>;
};

const Container = styled.span`
  font-size: 60px;
  font-weight: 800;
  word-break: keep-all;

  @media (max-width: 900px) {
    font-size: 40px;
  }
`;

export default PostHeaderTitle;
