import PostHeader from './_components/PostHeader/PostHeader';
import PostContent from './_components/PostContent/PostContent';
import PostWrapper from './_components/PostWrapper/PostWrapper';

import { getAllPosts, getPostBySlug } from '@/lib/api';
import { getMinRead } from '@/lib/utils';
import { Metadata } from 'next';
import { DOMAIN } from '@/constants/domain';

interface Params {
  params: {
    slug: string;
    category: string;
  };
}

export const generateMetadata = ({ params: { slug, category } }: Params): Metadata => {
  const post = getPostBySlug(slug, category);

  return {
    title: `${post.title} | ${DOMAIN}`,
    metadataBase: new URL(`https://${DOMAIN}`),
    openGraph: {
      title: `${post.title} | ${DOMAIN}`,
      description: post.description,
      images: [post.thumbnail.src],
    },
    twitter: {
      title: `${post.title} | ${DOMAIN}`,
      description: post.description,
      images: [post.thumbnail.src],
    },
  };
};

export function generateStaticParams() {
  const { posts } = getAllPosts(['slug', 'category']);

  return posts.map(({ slug, category }) => {
    return { slug, category };
  });
}

const Post = ({ params: { slug, category } }: Params) => {
  const post = getPostBySlug(slug, category);

  const minPerRead = getMinRead(post.content);

  return (
    <PostWrapper>
      <PostHeader
        title={post.title}
        description={post.description}
        category={post.category}
        date={post.date}
        tags={post.tags}
        minPerRead={minPerRead}
      />
      <PostContent post={post}>{post.content}</PostContent>
    </PostWrapper>
  );
};

export default Post;
