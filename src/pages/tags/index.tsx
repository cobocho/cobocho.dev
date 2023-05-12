import { getAllTags } from '../../lib/api'
import Tag from '@/types/tag'
import TagsPage from '@/components/templates/TagsPage'
import SeoHead from '@/components/SeoHead'
import PageType from '@/types/page'

type Props = {
  allTags: Tag[];
}

export default function Index({ allTags }: Props) {
  return (
    <>
      <SeoHead page={PageType.Tags} />
      <TagsPage tags={allTags}>
      </TagsPage>
    </>
  )
}

export const getStaticProps = async () => {
  const allTags = getAllTags();

  return {
    props: { allTags },
  }
}