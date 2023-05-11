import Post from '@/types/post'
import { getAllPostsByTag, getAllTags } from '../../../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'
import { GetStaticPaths } from 'next'
import Category from '@/types/category'
import Tag from '@/types/tag'

type Props = {
  allPosts: Post[];
  tag: string;
}

type Params = {
  params: {
    tag: string
  };
}

export default function Index({ tag, allPosts }: Props) {
  return (
    <PostList title={tag} allPosts={allPosts}>
    </PostList>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = getAllTags();

  const paths = allTags.map(({ tagName } : Tag) => {
    return {
      params: {
        tag: tagName,
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Params) => {
  const { tag } = params;
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
    ]
  );

  return {
    props: { tag, allPosts },
  }
}