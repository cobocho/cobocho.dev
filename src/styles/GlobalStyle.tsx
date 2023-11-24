import styled from 'styled-components';

interface Props {
	children: JSX.Element[];
}

const GlobalStyleBox = styled.div`
	@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css');

	position: relative;

	background-color: ${(props) => props.theme.bgColor};

	font-family: Pretendard, sans-serif;
	font-weight: ${(props) => props.theme.fontWeight};
	color: ${(props) => props.theme.textColor};

	transition: all 0.5s;

	a {
		color: ${(props) => props.theme.textColor};
	}
`;

const GlobalStyle = ({ children }: Props) => {
	return <GlobalStyleBox>{children}</GlobalStyleBox>;
};

export default GlobalStyle;
