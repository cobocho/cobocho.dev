import { DOMAIN, DOMAIN_KOR } from "@/constants/domain"
import PageType from "@/types/page"
import Post from "@/types/post"
import Head from "next/head"
import { useRouter } from "next/router"

type Props = {
  post?: Post,
  page: PageType,
}

type MetaDataType = {
  title: string,
  url: string,
  image: string,
  desc: string,
}

const SeoHead = ({ post, page } : Props) => {
  const router = useRouter();
  const BASIC_THUMBNAIL = '/assets/seo/meta_thumbnail.png'

  const metaData : MetaDataType = {
    title: '',
    url: '',
    desc: '',
    image: BASIC_THUMBNAIL,
  };

  if (page === PageType.Post && post) {
    const { category, slug } = router.query;
    metaData.title = `${post.title} | ${DOMAIN}`,
    metaData.url = `${DOMAIN}/post/${category}/${slug}`;
    metaData.desc = post.description;
    metaData.image = post.thumbnail;
  }

  if (page === PageType.Main) {
    metaData.title = `${DOMAIN_KOR} | ${DOMAIN}`,
    metaData.url = `${DOMAIN}`;
    metaData.desc = `${DOMAIN_KOR}입니다`;
  }
  
  if (page === PageType.Category) {
    const { category } = router.query;
    metaData.title = `${category} | ${DOMAIN}`;
    metaData.url = `${DOMAIN}/category/${category}/`;
    metaData.desc = `${category} 카테고리 포스트`;
  }

  if (page === PageType.Tags) {
    metaData.title = `Tags | ${DOMAIN}`;
    metaData.url = `${DOMAIN}/tags`;
    metaData.desc = `태그 포스트`;
  }

  if (page === PageType.Tag) {
    const { tag } = router.query;
    metaData.title = `${tag} | ${DOMAIN}`;
    metaData.url = `${DOMAIN}/tags/${tag}/`;
    metaData.desc = `${tag} 태그 포스트`;
  }
  
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="57x57" href="/assets/seo/favicons/apple-icon-57x57.png"></link>
      <link rel="apple-touch-icon" sizes="60x60" href="/assets/seo/favicons/apple-icon-60x60.png"></link>
      <link rel="apple-touch-icon" sizes="72x72" href="/assets/seo/favicons/apple-icon-72x72.png"></link>
      <link rel="apple-touch-icon" sizes="76x76" href="/assets/seo/favicons/apple-icon-76x76.png"></link>
      <link rel="apple-touch-icon" sizes="114x114" href="/assets/seo/favicons/apple-icon-114x114.png"></link>
      <link rel="apple-touch-icon" sizes="120x120" href="/assets/seo/favicons/apple-icon-120x120.png"></link>
      <link rel="apple-touch-icon" sizes="144x144" href="/assets/seo/favicons/apple-icon-144x144.png"></link>
      <link rel="apple-touch-icon" sizes="152x152" href="/assets/seo/favicons/apple-icon-152x152.png"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/seo/favicons/apple-icon-180x180.png"></link>
      <link rel="icon" type="image/png" sizes="192x192"  href="/assets/seo/favicons/android-icon-192x192.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/seo/favicons/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="96x96" href="/assets/seo/favicons/favicon-96x96.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/seo/favicons/favicon-16x16.png"></link>
      <meta name="msapplication-TileColor" content="#2A2A2A" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#2A2A2A" />
      <meta property="og:title" content={metaData.title} />
      <meta property="og:url" content={metaData.url} />
      <meta property="og:image" content={metaData.image} />
      <meta
        property="og:description"
        content={metaData.desc}
      />      
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:domain" content={DOMAIN} />
      <meta property="twitter:url" content={metaData.url} />
      <meta name="twitter:title" content={metaData.title} />
      <meta name="twitter:description" content={metaData.desc} />
      <meta name="twitter:image" content={metaData.image} />
      <title>{metaData.title}</title>
    </Head>
  )
}

export default SeoHead;