import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { appearFromLeft, orchestrateTags } from '@/styles/framer-motions';

import TechStackTag from './TechStackTag';
import { TechStackProps } from '@/constants/techStacks';

interface Props {
	techStacks: TechStackProps[];
}

const TechStackList = ({ techStacks }: Props) => {
	if (!techStacks) return <></>;

	return (
		<Container variants={orchestrateTags}>
			{techStacks.map(({ name }) => {
				return (
					<motion.li
						key={name}
						variants={appearFromLeft}
					>
						<TechStackTag tech={name} />
					</motion.li>
				);
			})}
		</Container>
	);
};

const Container = styled(motion.ul)`
	display: flex;
	flex-wrap: wrap;
	list-style-type: none;
`;

export default TechStackList;
