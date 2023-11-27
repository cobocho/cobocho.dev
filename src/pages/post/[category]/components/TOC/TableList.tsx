import { SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
	head: Element;
	isCurrentHead: boolean;
}

const TableList = ({ head, isCurrentHead }: Props) => {
	if (!head) return <></>;

	return (
		<Container className={`${head.nodeName}-header ${isCurrentHead && 'selected'}`}>
			<a href={`#${head.id}`}>{head.textContent}</a>
		</Container>
	);
};

const Container = styled.li`
	--header-depth-gap: 15px;

	margin-bottom: 0.3rem;

	font-size: 0.9rem;
	font-weight: 400;

	list-style: none;

	opacity: 0.4;

	transition: all 0.2s;

	&.selected {
		opacity: 0.7;
		transform: scale(1.05);
	}

	&.selected::before {
		content: '';

		position: absolute;
		left: -10px;
		top: 0;

		display: block;

		width: 3px;
		height: 100%;

		background-color: ${(props) => props.theme.textColor};

		opacity: 0.5;
	}

	a {
		color: ${(props) => props.theme.textColor};
	}

	&.H2-header {
		margin-left: var(--header-depth-gap);
	}

	&.H3-header {
		margin-left: calc(var(--header-depth-gap) * 2);
	}
`;

export default TableList;
