import PostList from '@/app/_components/PostList/PostList';
import { allFields, getAllPosts } from '@/lib/api';

interface PageParams {
  params: {
    page: number;
  };
}

const Page = ({ params }: PageParams) => {
  const { posts, total } = getAllPosts(allFields, params.page);

  return (
    <>
      <PostList posts={posts} postQuantity={total} />
    </>
  );
};

export default Page;
