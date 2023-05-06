import Post from '@/types/post'
import { getAllPosts, getAllCategories, getAllPostsByCategory, getAllTags } from '../../../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'
import { GetStaticPaths } from 'next'

type Props = {
  allPosts: Post[];
  categories: string[];
  category: string;
  allTags: string[];
}

type Params = {
  params: {
    category: string
  };
}

export default function Index({ allPosts, categories, category, allTags }: Props) {
  console.log(allTags);
  return (
    <Homepage categories={categories} category={category}>
      <PostList title={category} allPosts={allPosts}/>
    </Homepage>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllPosts([
    'slug',
    'title',
    'category',
    'tags',
    'date',
    'thumbnail',
    'description',
    'content'
  ]);

  const paths = allPosts.map((post) => {
    return {
      params: {
        category: post.category,
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Params) => {
  const { category } = params;
  const allPosts = getAllPostsByCategory(
    category,
    [
      'slug',
      'title',
      'category',
      'tags',
      'date',
      'thumbnail',
      'description',
      'content'
    ]
  );

  const categories = getAllCategories();
  const allTags = getAllTags(category);

  return {
    props: { allPosts, categories, category, allTags },
  }
}