import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { appearFromBottom } from '@/styles/framer-motions';

interface Props {
	title: string;
	children: React.ReactNode;
	className?: string;
	toggleMode?: boolean;
}

const HistoryItem = ({ title, children, className, toggleMode }: Props) => {
	const [toggle, setToggle] = useState<boolean>(false);

	return (
		<Container className={className ? className : ''}>
			<Title variants={appearFromBottom}>
				{title}{' '}
				{toggleMode && (
					<ToggleButton
						onClick={() => {
							setToggle((prev) => !prev);
						}}
						toggle={toggle}
					>
						▴
					</ToggleButton>
				)}
			</Title>
			{toggleMode ? toggle ? children : <></> : children}
		</Container>
	);
};

const Container = styled.div``;

const ToggleButton = styled.button<{ toggle: boolean }>`
	margin-left: 20px;
	font-size: 20px;
	background-color: transparent;
	border: none;

	cursor: pointer;

	transform: rotateX(${({ toggle }) => (toggle ? 180 : 0)}deg);
	transition: transform 0.5s;
`;

const Title = styled(motion.h3)`
	display: flex;
	align-items: center;
	width: fit-content;
	font-size: 40px;
	font-weight: 700;
	padding: 3px 50px 0 3px;
	margin-bottom: 20px;
	border-bottom: 1px solid ${(props) => props.theme.textColor};
`;

export default HistoryItem;
