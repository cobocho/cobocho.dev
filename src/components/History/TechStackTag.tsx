import { KOR_CATEGORY } from '@/constants/category-translate';
import Link from 'next/link';
import styled from 'styled-components';

interface Props {
	tech: string;
}

const TechStackTagBox = styled.span`
	display: inline-block;
	height: 30px;
	padding: 14px;
	margin-right: 10px;
	margin-bottom: 10px;
	background-color: ${({ theme }) => theme.content};
	font-size: 20px;
	font-weight: 400;
	line-height: 0.3;
	color: ${({ theme }) => theme.theme};
	border-radius: 15px;
	box-shadow: 0px 0px 39px -5px rgba(0, 0, 0, 0.13);
	-webkit-box-shadow: 0px 0px 39px -5px rgba(0, 0, 0, 0.13);
	-moz-box-shadow: 0px 0px 39px -5px rgba(0, 0, 0, 0.13);

	&:hover {
		cursor: pointer;
	}
`;

const TechStackTag = ({ tech }: Props) => {
	return <TechStackTagBox>{tech}</TechStackTagBox>;
};

export default TechStackTag;
