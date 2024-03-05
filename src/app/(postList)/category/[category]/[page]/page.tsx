import { Metadata } from 'next';
import React from 'react';

import PostList from '@/app/(postList)/_components/PostList/PostList';
import { KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import { BASIC_THUMBNAIL, DOMAIN } from '@/constants/domain';
import { allFields, getAllCategories, getAllPostsByCategory } from '@/lib/api';
import { calculatePages } from '@/lib/utils';

interface PageParams {
  params: {
    category: KOR_CATEGORY_KEYS;
    page: string;
  };
}

export function generateStaticParams() {
  const categories = getAllCategories().filter((category) => category.categoryName !== 'all');

  const params = Array.from(categories, (category) => {
    const pages = calculatePages(category.quantity);

    return pages.map((page) => ({
      category: category.categoryName,
      page: String(page),
    }));
  });

  return params.flat();
}

export const generateMetadata = ({ params }: PageParams): Metadata => {
  const title = `${params.category} | ${DOMAIN}`;
  const description = `${params.category} Categoy Posts`;
  const images = [BASIC_THUMBNAIL];

  return {
    title,
    metadataBase: new URL(`https://${DOMAIN}`),
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
  };
};

const Category = ({ params }: PageParams) => {
  const { posts, total } = getAllPostsByCategory(params.category, allFields, Number(params.page));

  return (
    <>
      <PostList title={params.category} posts={posts} postQuantity={total} />
    </>
  );
};

export default Category;
