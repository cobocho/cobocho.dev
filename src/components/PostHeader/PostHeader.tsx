import React from 'react';
import styled from 'styled-components';
import PostHeaderTitle from './PostHeaderTitle';
import PostHeaderTags from './PostHeaderTags';
import PostHeaderInfo from './PostHeaderInfo';
import PostHeaderCategory from './PostHeaderCategory';
import PostHeaderDescription from './PostHeaderDescription';

interface Props {
	title: string;
	date: string;
	description: string;
	tags: string[];
	category: string;
	minPerRead: number;
}

const PostHeader = ({ title, date, tags, description, category, minPerRead }: Props) => {
	return (
		<Container>
			<PostHeaderCategory category={category} />
			<PostHeaderTitle title={title} />
			<PostHeaderDescription description={description} />
			<PostHeaderInfo
				date={date}
				minPerRead={minPerRead}
			/>
			<PostHeaderTags tags={tags} />
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	padding-bottom: 10px;
	margin-bottom: 20px;
`;

export default PostHeader;
