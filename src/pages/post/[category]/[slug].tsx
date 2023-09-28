import { GetStaticPaths } from 'next';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { getPostBySlug, getAllPosts } from '../../../lib/api';

import Post from '@/types/post';
import PageType from '@/types/page';

import SeoHead from '@/components/SeoHead/SeoHead';

import PostHeader from './components/PostHeader/PostHeader';
import PostContent from './components/PostContent/PostContent';
import Giscus from './components/Giscus/Giscus';

import { appearFromLeft } from '@/styles/framer-motions';

import { getMinRead } from '@/lib/getMinRead';
import TOC from './components/TOC/TOC';

interface Props {
	post: Post;
}

type Params = {
	params: {
		slug: string;
		category: string;
	};
};

const PostpageBox = styled.article`
	display: flex;

	.post-wrapper {
		width: 100%;
	}
`;

export default function Index({ post }: Props) {
	const minPerRead = getMinRead(post.content);

	return (
		<>
			<SeoHead
				post={post}
				page={PageType.Post}
			/>
			<PostpageBox>
				<motion.div
					className="post-wrapper"
					variants={appearFromLeft}
					initial="hidden"
					animate="visible"
				>
					<PostHeader
						title={post.title}
						category={post.category}
						date={post.date}
						tags={post.tags}
						minPerRead={minPerRead}
					/>
					<PostContent post={post}>{post.content}</PostContent>
					<Giscus />
				</motion.div>
				<TOC />
			</PostpageBox>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const allPosts = getAllPosts([
		'slug',
		'title',
		'category',
		'tags',
		'date',
		'thumbnail',
		'description',
		'content',
	]);

	const paths = allPosts.map((post) => {
		return {
			params: {
				category: post.category,
				slug: post.slug,
			},
		};
	});

	return { paths, fallback: false };
};

export const getStaticProps = ({ params }: Params) => {
	const { slug, category } = params;
	const post = getPostBySlug(`${slug}.md`, category, [
		'title',
		'category',
		'tags',
		'date',
		'thumbnail',
		'description',
		'content',
	]);

	return {
		props: { post },
	};
};
