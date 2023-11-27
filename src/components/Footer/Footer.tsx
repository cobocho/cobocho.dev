import React from 'react';
import styled from 'styled-components';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return <Container>{`© ${currentYear}. Cobocho all rights reserved.`}</Container>;
};

const Container = styled.footer`
	position: relative;

	width: 100vw;
	height: 80px;

	text-align: center;
	font-weight: 300;

	background-color: ${(props) => props.theme.bgColor};

	opacity: 0.7;

	transition: all 0.5s;
`;

export default Footer;
