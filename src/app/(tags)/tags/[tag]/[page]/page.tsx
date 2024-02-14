import PostList from '@/app/(postList)/_components/PostList/PostList';
import { KOR_CATEGORY_KEYS } from '@/constants/category-translate';
import { BASIC_THUMBNAIL, DOMAIN } from '@/constants/domain';
import { allFields, getAllPostsByTag, getAllTags } from '@/lib/api';
import { calculatePages } from '@/lib/utils';
import { Metadata } from 'next';

interface Params {
  params: {
    tag: string;
    page: string;
  };
}

export function generateStaticParams() {
  const tags = getAllTags();

  const params = Array.from(tags, (tag) => {
    const pages = calculatePages(tag.quantity);

    return pages.map((page) => ({
      tag: tag.tagName,
      page: String(page),
    }));
  });

  return params.flat();
}
export const generateMetadata = ({ params }: Params): Metadata => {
  const decodedTag = decodeURI(params.tag);
  const title = `${decodedTag} | ${DOMAIN}`;
  const description = `${decodedTag} Tag Posts`;
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

const TagPage = ({ params }: Params) => {
  const decodedTag = decodeURI(params.tag) as KOR_CATEGORY_KEYS;
  const { posts, total } = getAllPostsByTag(decodedTag, allFields, Number(params.page));

  return (
    <>
      <PostList title={decodedTag} posts={posts} postQuantity={total} />
    </>
  );
};

export default TagPage;
