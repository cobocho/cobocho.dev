import { allFields, getAllPosts } from '@/lib/api';

import PostList from '@/app/(postList)/_components/PostList/PostList';
import { BASIC_THUMBNAIL, DOMAIN, DOMAIN_KOR } from '@/constants/domain';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  const title = `${DOMAIN_KOR} | ${DOMAIN}`;
  const description = '김민규의 기술블로그';
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

const Home = () => {
  const { posts, total } = getAllPosts(allFields);

  return (
    <>
      <PostList posts={posts} postQuantity={total} />
    </>
  );
};

export default Home;
