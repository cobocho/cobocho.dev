import Post from '@/types/post'
import { getAllCategories, getAllPosts, getAllTags } from '../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'
import Category from '@/types/category'
import SeoHead from '@/components/SeoHead'
import PageType from '@/types/page'
import { GetStaticPaths } from 'next'

type Props = {
  allPosts: Post[];
  categories: Category[];
  allTags: string[];
}

type Params = {
  params: {
    category: string
    page: string,
  };
}

export default function Index({ allPosts, categories, allTags }: Props) {
  const PostQuantity = categories.find(({categoryName}) => categoryName === 'All')!.quantity;
  return (
    <>
      <SeoHead page={PageType.Main} />
      <Homepage categories={categories}>
        <PostList PostQuantity={PostQuantity}  title={"Recent"} allPosts={allPosts}/>
      </Homepage>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
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

  const pageQuantity = Math.ceil(allPosts.length / 10);

  const paths = Array.from({ length: pageQuantity }, (v, i) => {
    return {
      params: {
        page: String(i + 1),
      },
    }
  });

  return { paths, fallback: false };
};


export const getStaticProps = ({ params } : Params) => {
  const { page } = params;
  const allPosts = getAllPosts([
    'slug',
    'title',
    'category',
    'tags',
    'date',
    'thumbnail',
    'description',
    'content'
  ],
    page
  );

  const allPostQuantity = getAllCategories()
    .reduce((acc, cur) => acc + cur.quantity, 0)
    

  const categories = [{ categoryName: 'All', quantity: allPostQuantity }, ...getAllCategories()];
  const allTags = getAllTags();

  return {
    props: { allPosts, categories, allTags },
  }
}