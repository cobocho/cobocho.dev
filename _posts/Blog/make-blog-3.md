---
title: 'Next.js로 나만의 블로그 만들기 [3] <meta> 태그를 활용해서 SEO 향상시키기'
description: '블로그 공유에 겉멋 추가하기'
thumbnail: '/assets/blog/thumnails/blog/make-blog-3.png'
date: '2023/05/12'
tags: ['블로그', 'Next.js', 'Open Graph', 'Twitter Card', 'SEO', 'favicon']
---
# 개요

일상 속에서 카카오톡이나 기타 메신저들을 사용하여 링크를 공유해본 경험이 다들 존재할 것이다.
링크를 공유할시 페이지의 썸네일과 간단한 정보들이 담기는걸 본 적이 있을텐데 이러한 기능은 SEO적인 측면에서 큰 도움이 된다.

## Open Graph

![Open Graph](/assets/blog/blog/make-blog-3/logo.png)

**오픈 그래프(Open Graph)** 란 `HTML`의 `meta` 태그 중 `og:XXX` 형태의 태그를 찾아서 웹 페이지를 공유할 때 이용자가 더욱 자세한 정보들을 얻을 수 있게 해주는 프로토콜의 일종이다.

### 적용법

오픈 그래프를 적용하는 법은 생각보다 간단하다. `HTML`의 `head` 영역에 오픈그래프가 요구하는 `meta` 태그 형식만 맞추어서 삽입하면 된다.

```ts
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
  image?: string,
  desc?: string,
}

type ctxType = {
  category?: string, 
  slug?: string, 
  tag?: string,
}

const getMetaData = (pageType: PageType, ctx: ctxType, post?: Post) : MetaDataType => {
  const { category, slug, tag } = ctx;
  const BASIC_THUMBNAIL = '/assets/seo/meta_thumbnail.png'
  const metaData = {
    title: '',
    url: '',
    desc: '',
    image: BASIC_THUMBNAIL
  };

  switch (pageType) {
    case PageType.Post:
      if (!post) break;
      metaData.title = `${post?.title} | ${DOMAIN}`,
      metaData.url = `${DOMAIN}/post/?${category}/${slug}`;
      metaData.desc = post.description;
      metaData.image = post.thumbnail;
      break;
    case PageType.Main:
      metaData.title = `${DOMAIN_KOR} | ${DOMAIN}`,
      metaData.url = `${DOMAIN}`;
      metaData.desc = `${DOMAIN_KOR}입니다`;
      break;
    case PageType.Category:
      metaData.title = `${category} | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/category/${category}`;
      metaData.desc = `${category} Category Posts`;
      break;
    case PageType.Tags:
      metaData.title = `Tags | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/tags`;
      metaData.desc = `Tags List`;
      break;
    case PageType.Tag:
      metaData.title = `${tag} | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/tags/${tag}`;
      metaData.desc = `${tag} Tag Posts`;
      break;
    case PageType.About:
      metaData.title = `About | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/about`;
      metaData.desc = 'About Myself';
      break;
  }
  
  return metaData;
}

const SeoHead = ({ post, page } : Props) => {
  const router = useRouter();
  const metaData = getMetaData(page, router.query, post);
  
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
      <link rel="icon" href="/assets/seo/favicons/favicon.ico" />
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
      <meta
        name="description"
        content={metaData.desc}
      />
      <title>{metaData.title}</title>
    </Head>
  )
}

export default SeoHead;
```

```html
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
```

오픈 그래프에는 여러가지 어트리뷰트 옵션이 있지만 위와 같은 기본사항만 입력해줘도 충분히 멋진 결과물을 얻을 수 있다.

`content` 어트리뷰트에는 각자 알맞은 값들을 할당해주면 된다.
썸네일 이미지 같은 경우에는 **1200*630px** 해상도가 권장된다.

나는 페이지별로 `content` 영역을 다르게 표현해주고 싶어서 페이지에 따른 메타데이터를 반환하는 함수를 따로 분리하였다.

```ts
const getMetaData = (pageType: PageType, ctx: ctxType, post?: Post) : MetaDataType => {
  const { category, slug, tag } = ctx;
  const BASIC_THUMBNAIL = '/assets/seo/meta_thumbnail.png'
  const metaData = {
    title: '',
    url: '',
    desc: '',
    image: BASIC_THUMBNAIL
  };

  switch (pageType) {
    case PageType.Post:
      if (!post) break;
      metaData.title = `${post?.title} | ${DOMAIN}`,
      metaData.url = `${DOMAIN}/post/?${category}/${slug}`;
      metaData.desc = post.description;
      metaData.image = post.thumbnail;
      break;
    case PageType.Main:
      metaData.title = `${DOMAIN_KOR} | ${DOMAIN}`,
      metaData.url = `${DOMAIN}`;
      metaData.desc = `${DOMAIN_KOR}입니다`;
      break;
    case PageType.Category:
      metaData.title = `${category} | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/category/${category}`;
      metaData.desc = `${category} Category Posts`;
      break;
    case PageType.Tags:
      metaData.title = `Tags | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/tags`;
      metaData.desc = `Tags List`;
      break;
    case PageType.Tag:
      metaData.title = `${tag} | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/tags/${tag}`;
      metaData.desc = `${tag} Tag Posts`;
      break;
    case PageType.About:
      metaData.title = `About | ${DOMAIN}`;
      metaData.url = `${DOMAIN}/about`;
      metaData.desc = 'About Myself';
      break;
  }
  
  return metaData;
}
```

### 결과

![메인 페이지](/assets/blog/blog/make-blog-3/main.png)

![포스트 페이지](/assets/blog/blog/make-blog-3/post.png)


게다가 [오픈 그래프의 적용 여부를 테스트해주는 사이트](https://www.opengraph.xyz/) 또한 존재한다.

## favicon

파비콘은 브라우저의 주소창에 표시되는 웹페이지를 대표하는 아이콘이다.
간단한 아이콘을 추가하여 유저에게 사이트에 대한 이미지를 심어줄 수 있다.

![유명 기업의 favicons](/assets/blog/blog/make-blog-3/favicons.png)

### favicon generator

이러한 favicon들을 브라우저가 요구하는 양식에 맞춰 [자동으로 생성해주는 사이트](https://www.favicon-generator.org/)가 있다.

192*192px의 png 파일을 업로드하면 다양한 양식의 아이콘 이미지 파일과 태그들을 출력해준다.

![세상엔 좋은 사이트들이 참 많습니다](/assets/blog/blog/make-blog-3/favicon-generator.png)

### 결과

![favicon이 적용된 모습](/assets/blog/blog/make-blog-3/favicon.png)