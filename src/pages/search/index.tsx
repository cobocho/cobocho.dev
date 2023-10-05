import { useState } from 'react';

import PostList from '@/components/PostList/PostList';
import SeoHead from '@/components/SeoHead/SeoHead';
import SearchBox from './components/SearchBox';

import PageType from '@/types/page';
import Post from '@/types/post';

import { getAllPosts } from '@/lib/api';

interface Props {
	allPosts: Post[];
	tag: string;
	postQuantity: number;
}

export default function Index({ allPosts }: Props) {
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchedPosts, setSearchedPosts] = useState<Post[]>([]);
	const [searchTitle, setSearchTitle] = useState<string>('');

	const searchPost = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!searchValue.trim()) return;
		const filteredPosts = allPosts.filter((post) => {
			const lowerCaseValue = searchValue.toLowerCase();

			if (post.title.toLowerCase().includes(lowerCaseValue)) return true;
			if (post.description.toLowerCase().includes(lowerCaseValue)) return true;
			if (post.tags.some((tag) => tag.toLowerCase().includes(lowerCaseValue))) return true;
		});
		setSearchTitle(`${filteredPosts.length} result for ${searchValue}`);
		setSearchedPosts(filteredPosts);
	};

	return (
		<>
			<SeoHead page={PageType.Search} />
			<SearchBox
				onSubmit={searchPost}
				setSearchValue={setSearchValue}
			/>
			<PostList
				title={searchTitle}
				allPosts={searchedPosts}
			></PostList>
		</>
	);
}

export const getStaticProps = () => {
	const allPosts = getAllPosts([
		'slug',
		'title',
		'category',
		'tags',
		'date',
		'thumbnail',
		'description',
	]);

	return {
		props: { allPosts },
	};
};
