import { getMinRead } from '@/lib/getMinRead';
import PostHeader from './_components/PostHeader/PostHeader';
import PostContent from './_components/PostContent/PostContent';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import PostWrapper from './_components/PostWrapper/PostWrapper';

interface Params {
  params: {
    slug: string;
    category: string;
  };
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

export function generateStaticParams() {
  const { posts } = getAllPosts(['slug', 'category']);

  return posts.map(({ slug, category }) => {
    return { slug, category };
  });
}

export default Post;
