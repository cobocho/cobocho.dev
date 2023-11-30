import Post from '@/types/post';
import { PostField, getAllPostsByTag, getAllTags } from '../../../lib/api';
import PostList from '@/components/PostList/PostList';
import { GetStaticPaths } from 'next';
import Tag from '@/types/tag';
import SeoHead from '@/components/SeoHead/SeoHead';
import PageType from '@/types/page';

interface Props {
  allPosts: Post[];
  tag: string;
  postQuantity: number;
}

type Params = {
  params: {
    tag: string;
    page: string;
  };
};

export default function Index({ tag, allPosts, postQuantity }: Props) {
  return (
    <>
      <SeoHead page={PageType.Tag} />
      <PostList title={tag} posts={allPosts} postQuantity={postQuantity}></PostList>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const allTags = getAllTags();

  const paths = allTags
    .map((tag: Tag) => {
      const withPage = [];
      const lastPage = Math.ceil(tag.quantity / 10);
      for (let i = 1; i <= lastPage; i++) {
        const params = {
          tag: tag.tagName,
          page: String(i),
        };
        withPage.push({ params });
      }

      return withPage;
    })
    .flat();

  return { paths, fallback: false };
};

export const getStaticProps = ({ params }: Params) => {
  const { tag, page } = params;
  const postQuantity = getAllTags().find(({ tagName }) => tagName === tag)?.quantity;
  const fields = Object.values(PostField);
  const allPosts = getAllPostsByTag(tag, fields, Number(page));

  return {
    props: { tag, allPosts, postQuantity },
  };
};
