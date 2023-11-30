import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { appearFromBottom } from '@/styles/framer-motions';

interface LinkProps {
	icon: JSX.Element;
	name: string;
	url: string;
}

interface Props {
	links: LinkProps[];
}

const URLList = ({ links }: Props) => {
	return (
		<Container variants={appearFromBottom}>
			{links.map((link) => {
				return (
					<URLItem key={link.name}>
						{link.icon}
						<em>{link.name}</em>
						<a
							target="_blank"
							href={link.url}
						>
							{link.url}
						</a>
					</URLItem>
				);
			})}
		</Container>
	);
};

const Container = styled(motion.ul)`
	display: flex;
	flex-direction: column;
`;

const URLItem = styled.li`
	display: flex;
	align-items: center;

	margin-bottom: 16px;
	padding-top: 4px;

	svg {
		margin-right: 10px;
		fill: ${({ theme }) => theme.content};
	}

	em {
		margin-right: 6px;
	}

	a {
		color: ${({ theme }) => theme.subContent};
		text-decoration: underline;
	}
`;

export default URLList;
