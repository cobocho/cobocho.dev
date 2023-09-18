import styled from 'styled-components';

type Props = {
  children: string;
  onClick?: () => void;
};

const TOCButton = ({ children, onClick }: Props) => {
  return (
    <Container
      type="button"
      onClick={onClick}
    >
      <span className="material-symbols-outlined">{children}</span>
    </Container>
  );
};

const Container = styled.button`
  padding: 8px 8px 4px 8px;

  border: none;

  background-color: transparent;

  opacity: 0.6;
  transform: scale(1.2);

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    opacity: 1;
    transition: all 0.4s;
  }

  span {
    color: ${(props) => props.theme.textColor};
  }
`;

export default TOCButton;
