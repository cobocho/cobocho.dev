import styled, { ThemeProvider } from 'styled-components'
import { useRecoilValue } from 'recoil';
import { themeState } from '@/stores/theme';

type Props = {
	children: JSX.Element[],
}

const GlobalStyleBox = styled.div`
  position: relative;
  color: ${(props) => props.theme.textColor};
  font-weight: ${(props) => props.theme.fontWeight};;
  background-color: ${(props) => props.theme.bgColor};

  transition: all 0.5s;

  a {
    color: ${(props) => props.theme.textColor};
  }
`

const GlobalStyle = ({ children } : Props) => {
  return (
    <GlobalStyleBox>
      {children}
    </GlobalStyleBox>
  )
}

export default GlobalStyle;