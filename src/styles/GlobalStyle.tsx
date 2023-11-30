import styled from 'styled-components';

interface Props {
  children: JSX.Element[];
}

const GlobalStyleBox = styled.div`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

  position: relative;

  background-color: ${({ theme }) => theme.theme};

  font-family: Pretendard, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeight};
  color: ${({ theme }) => theme.content};

  transition: background-color 0.5s;

  a {
    color: ${({ theme }) => theme.content};
  }
`;

const GlobalStyle = ({ children }: Props) => {
  return <GlobalStyleBox>{children}</GlobalStyleBox>;
};

export default GlobalStyle;
