import { getMinRead } from '@/lib/getMinRead';
import PostHeader from './_components/PostHeader/PostHeader';
import PostContent from './_components/PostContent/PostContent';
import { getPostBySlug } from '@/lib/api';

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
    <>
      <PostHeader
        title={post.title}
        description={post.description}
        category={post.category}
        date={post.date}
        tags={post.tags}
        minPerRead={minPerRead}
      />
      <PostContent post={post}>{post.content}</PostContent>
    </>
  );
};

export default Post;
