import React from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';

type Category = {
	categoryName: string;
	quantity: number;
};

interface Props {
	children: JSX.Element;
	categories: Category[];
	category?: string;
}

const Homepage = ({ children, categories, category }: Props) => {
	return (
		<>
			<CategoriesList
				categories={categories}
				category={category}
			/>
			{children}
		</>
	);
};

export default Homepage;
