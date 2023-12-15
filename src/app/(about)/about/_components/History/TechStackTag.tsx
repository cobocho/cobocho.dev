import styled from 'styled-components';

interface Props {
  tech: string;
}

const TechStackTag = ({ tech }: Props) => {
  return <Container>{tech}</Container>;
};

const Container = styled.span`
  display: inline-block;

  height: 30px;

  padding: 14px;
  margin-right: 10px;
  margin-bottom: 10px;

  background-color: ${({ theme }) => theme.content};

  border-radius: 15px;

  font-size: 20px;
  font-weight: 400;
  line-height: 0.3;
  color: ${({ theme }) => theme.theme};

  box-shadow: 0px 0px 39px -5px rgba(0, 0, 0, 0.13);

  &:hover {
    cursor: pointer;
  }
`;

export default TechStackTag;
