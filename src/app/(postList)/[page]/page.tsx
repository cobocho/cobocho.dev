import PostList from '@/app/(postList)/_components/PostList/PostList';
import { BASIC_THUMBNAIL, DOMAIN, DOMAIN_KOR } from '@/constants/domain';
import { allFields, getAllPosts } from '@/lib/api';
import { calculatePages } from '@/lib/utils';
import { Metadata } from 'next';

interface PageParams {
  params: {
    page: number;
  };
}

export const generateMetadata = ({ params }: PageParams): Metadata => {
  const title = `${params.page} Page | ${DOMAIN}`;
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

export function generateStaticParams() {
  const { total } = getAllPosts(['title']);
  const pages = calculatePages(total);

  return pages.map((page) => {
    return {
      page: String(page),
    };
  });
}

const Page = ({ params }: PageParams) => {
  const { posts, total } = getAllPosts(allFields, params.page);

  return <PostList title="recent" posts={posts} postQuantity={total} />;
};

export default Page;
