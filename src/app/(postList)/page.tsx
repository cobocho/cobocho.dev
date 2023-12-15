import { allFields, getAllPosts } from '@/lib/api';

import PostList from '@/app/(postList)/_components/PostList/PostList';

const Home = () => {
  const { posts, total } = getAllPosts(allFields);

  return (
    <>
      <PostList posts={posts} postQuantity={total} />
    </>
  );
};

export default Home;
