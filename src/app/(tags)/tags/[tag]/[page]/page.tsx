import PostList from '@/app/(postList)/_components/PostList/PostList';
import { allFields, getAllPostsByTag, getAllTags } from '@/lib/api';

interface Params {
  params: {
    tag: string;
    page: string;
  };
}

const TagPage = ({ params }: Params) => {
  const decodedTag = decodeURI(params.tag);
  const { posts, total } = getAllPostsByTag(decodedTag, allFields, Number(params.page));

  return (
    <>
      <PostList title={decodedTag} posts={posts} postQuantity={total} />
    </>
  );
};

export default TagPage;
