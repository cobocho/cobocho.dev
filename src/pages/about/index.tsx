import AboutPage from '@/components/templates/AboutPage'
import SeoHead from '@/components/SeoHead'
import PageType from '@/types/page'

export default function Index() {
  return (
    <>
      <SeoHead page={PageType.Main} />
      <AboutPage />
    </>
  )
}