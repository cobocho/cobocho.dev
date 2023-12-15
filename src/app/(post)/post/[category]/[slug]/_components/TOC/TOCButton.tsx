import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const TOCButton = ({ children, onClick }: Props) => {
  return (
    <Container type="button" onClick={onClick}>
      {children}
    </Container>
  );
};

const Container = styled.button`
  padding: 12px 12px 8px 12px;

  border: none;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.middle};

  box-shadow: 0px 0px 30px -6px rgba(0, 0, 0, 0.1);

  transform: scale(1.2);
  transition: all 0.4s;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.content};
    box-shadow: 0px 10px 30px -6px rgba(112, 112, 112, 0.3);
    transform: scale(1.3) translateY(-4px);
  }

  span {
    color: ${({ theme }) => theme.content};
  }
`;

export default TOCButton;
