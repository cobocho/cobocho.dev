import { Metadata } from 'next';

import { BASIC_THUMBNAIL, DOMAIN } from '@/constants/domain';
import { getAllTags } from '@/lib/api';
import { sortDescending } from '@/lib/utils';

import Tags from './_components/Tags/Tags';

export const generateMetadata = (): Metadata => {
  return {
    title: `Tags | ${DOMAIN}`,
    metadataBase: new URL(`https://${DOMAIN}`),
    openGraph: {
      title: `Tags | ${DOMAIN}`,
      description: 'Tags List',
      images: [BASIC_THUMBNAIL],
    },
    twitter: {
      title: `Tags | ${DOMAIN}`,
      description: 'Tags List',
      images: [BASIC_THUMBNAIL],
    },
  };
};

const TagsPage = () => {
  const tags = sortDescending(getAllTags(), 'quantity');

  return <Tags tags={tags} />;
};

export default TagsPage;
