import Post from '@/types/post'
import { getPostBySlug, getAllPosts } from '../../../lib/api'
import { GetStaticPaths } from 'next';
import Postpage from '@/components/templates/Postpage';
import Head from 'next/head';

type Props = {
  post: Post
}

type Params = {
  params: {
    slug: string,
    category: string,
  };
}

export default function Index({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Postpage post={post} />
    </>
  )
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
    'content'
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


export const getStaticProps = async ({ params }: Params) => {
  const { slug, category } = params;
  const post = getPostBySlug(
    `${slug}.md`,
    category,
    [
      'title',
      'category',
      'tags',
      'date',
      'thumbnail',
      'description',
      'content'
  ]);

  return {
    props: { post },
  }
}