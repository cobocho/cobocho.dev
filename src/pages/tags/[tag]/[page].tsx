import Post from '@/types/post'
import { getAllPostsByTag, getAllTags } from '../../../lib/api'
import PostList from '@/components/organisms/PostList'
import { GetStaticPaths } from 'next'
import Tag from '@/types/tag'
import SeoHead from '@/components/SeoHead'
import PageType from '@/types/page'

type Props = {
  allPosts: Post[];
  tag: string;
}

type Params = {
  params: {
    tag: string
    page: string
  };
}

export default function Index({ tag, allPosts }: Props) {
  return (
    <>
      <SeoHead page={PageType.Tag} />
      <PostList title={tag} allPosts={allPosts}>
      </PostList>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = getAllTags();

  const paths = allTags.map((tag : Tag) => {
    const withPage = [];
    const lastPage = Math.ceil(tag.quantity / 10);
    for (let i = 1; i <= lastPage; i++) {
      const params = {
        tag: tag.tagName,
        page: String(i),
      }
      withPage.push({ params });
    }

    return withPage;
  })
  .flat();

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Params) => {
  const { tag, page } = params;
  const allPosts = getAllPostsByTag(
    tag,
    [
      'slug',
      'title',
      'category',
      'tags',
      'date',
      'thumbnail',
      'description',
    ],
    page
  );

  return {
    props: { tag, allPosts },
  }
}