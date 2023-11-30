import { timeAgo } from '@/lib/utils';
import styled from 'styled-components';

interface Props {
	date: string;
}

const Container = styled.p`
	display: block;
	width: fit-content;

	padding-top: 10px;

	border-radius: 10px;

	color: ${({ theme }) => theme.content};
	font-weight: 300;
	letter-spacing: 0em;
`;

const PostCardDate = ({ date }: Props) => {
	const convertedDate = timeAgo(date);

	return <Container>{convertedDate}</Container>;
};

export default PostCardDate;
