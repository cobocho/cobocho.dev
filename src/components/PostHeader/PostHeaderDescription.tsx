import React from 'react';
import styled from 'styled-components';

interface Props {
	description: string;
}

const PostHeaderDescription = ({ description }: Props) => {
	return <Container>{description}</Container>;
};

const Container = styled.div`
	padding: 10px;

	font-weight: 500;

	opacity: 0.5;

	border-left: 4px solid ${(props) => props.theme.textColor};
`;

export default PostHeaderDescription;
