import Post from '@/types/post'
import { getAllPosts, getAllCategories, getAllPostsByCategory, getAllTags } from '../../lib/api'
import PostList from '@/components/organisms/PostList'
import Homepage from '@/components/templates/Homepage'
import { GetStaticPaths } from 'next'
import Category from '@/types/category'
import Tag from '@/types/tag'
import TagsPage from '@/components/templates/TagsPage'

type Props = {
  allTags: Tag[];
}

export default function Index({ allTags }: Props) {
  return (
    <TagsPage tags={allTags}>
    </TagsPage>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const allTags = getAllTags();

//   const paths = allTags.map(({tag}) => {
//     return {
//       params: {
//         tag,
//       },
//     };
//   });

//   return { paths, fallback: false };
// };

export const getStaticProps = async () => {
  const allTags = getAllTags();

  return {
    props: { allTags },
  }
}