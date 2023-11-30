import SearchIcon from '@/components/Icons/SearchIcon';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';
import { appearFromLeft } from '@/styles/framer-motions';
import styled from 'styled-components';

interface Props {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchBox = ({ setSearchValue, onSubmit }: Props) => {
	return (
		<motion.div
			className="list-title-wrapper"
			variants={appearFromLeft}
			initial="hidden"
			animate="visible"
		>
			<Container onSubmit={onSubmit}>
				<input
					type="text"
					name="search"
					id="search"
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button type="submit">
					<SearchIcon />
				</button>
			</Container>
		</motion.div>
	);
};

const Container = styled.form`
	display: flex;
	align-items: center;
	gap: 20px;

	width: 100%;
	max-width: 600px;
	height: 50px;

	margin-bottom: 20px;

	input {
		width: 80%;
		height: 100%;

		padding: 0 20px;

		background-color: ${({ theme }) => theme.middle};
		border-radius: 16px;
		border: none;

		font-size: 24px;
		outline: none;
	}

	button {
		display: flex;
		align-items: center;

		background-color: transparent;

		border: none;
		border-radius: 10px;

		fill: ${({ theme }) => theme.content};
		color: ${({ theme }) => theme.subContent};

		cursor: pointer;
	}
`;

export default SearchBox;
