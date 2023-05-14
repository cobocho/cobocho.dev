---
title: 'Next.js로 나만의 블로그 만들기 [1] 기술 스택과 포스팅 구현'
description: '바닥부터 시작하는 기술 블로그 생성기'
thumbnail: '/assets/thumnails/blog/Next-Blog.png'
date: '2023/05/11'
tags: ['블로그', 'Next.js', 'styled-components']
---
# 개요
엘리스 1차 팀 프로젝트가 끝나고 다음 프로젝트까지 약 4주 가량의 시간이 생겼다.
그동안 커리큘럼 외에 개인적으로 어떤걸 공부할지 고민하던 중에, 기존에 배우다 멈춘 **Next.js**를 좀 더 공부하고 그걸 활용해서 뭔가 만들고 싶다는 생각이 들었다.

그렇게 어떤걸 만들지 고민하다가 결국 SSR과 SSG를 구현해보기에 가장 적합한 개인 블로그를 만들기로 결심하였다.

# 기술스택 고르기
> "모든 프레임워크에는 **기술 부채**가 따른다."
-프레임워크 없는 프론트엔드 개발- 중 발췌

블로그를 만들기로 결심한 이후에 가장 먼저 한 일은 바로 **기술스택**을 결정하는 일이었다.

## Typescript
![](/assets/blog/blog/make-blog-1/ts.png)

현재 프론트엔드 씬에서 바닐라 JS보다 많이 쓰이는 **Typescript**를 사용하기로 결정했다.
사실 TS를 제대로 써본적도 없고 정말 기초적인 이론만을 알고 있지만 그냥 만들어보면서 부딪혀보기로 했다.
## Next.js
![](/assets/blog/blog/make-blog-1/nextjs.png)

SSG 기반 블로그를 만들때 가장 많이 사용되는 스택 2가지를 뽑으라면 아마 **Next.js**와 **Gatsby** 두 가지일 것이다.
그 외에 방법으로는 jekyll을 사용해서 자동화로 만드는 방식도 존재한다.

사실 단순한 블로그를 만드는데에는 SSR을 배제하고 Gatsby만 사용하여 만드는 방법 또한 추천할만한 방법이다.

하지만 현재 많은 기업에서 쓰이고 개인적으로도 평소에도 관심이 있었던 Next.js를 사용해보고 싶은 마음이 컸기에 Next.js를 사용하기로 결정했다.

## styled-components
![](/assets/blog/blog/make-blog-1/styled-components.png)

기존에 내가 사용해본 컴포넌트 스타일링 라이브러리는 **CSS Module**과 **styled-components**가 있었다.
개인적으로는 CSS-in-CSS보다는 CSS-in-JS 스타일을 선호하여서 styled-components를 좀 더 자주 사용한다.
그렇기에 이번에도 styled-components를 사용하여 스타일링을 하기로 결정하였다.
Emotion을 배워서 적용시켜볼까 하는 생각도 있었지만 styled-components와 큰 차이가 없다는 얘기를 들어서 좀 더 나중에 사용해보기로 했다.
  
## Recoil
![](/assets/blog/blog/make-blog-1/recoil.png)

전역 상태관리 라이브러리는 Recoil을 사용할 생각이다.
전역 상태관리 라이브러리 같은 경우에는 기존에 Redux와 Redux Toolkit을 써본 적이 있다.
Redux는 몰라도 RTK를 쓰면서 불편함을 느꼈던 적은 없었기 때문에 RTK를 쓸까라는 생각을 했지만 요새 많이 쓰이는 Recoil이 궁금하기도 하고 예전부터 한번 사용해보고 싶은 마음이 있었기에 Recoil을 사용할 예정이다.

하지만 이번 주제가 블로그다 보니 전역상태를 관리할 경우는 다크모드 외에는 크게 없을것 같아서 이후에 필요한 시점이 올 때 적용할 예정이다.
 
# 포스팅 구현
## Readme 파일 가져오기
블로그 포스팅의 경우 Readme를 파싱해서 렌더링하는 방식으로 구현하려 했다.
그러기 위해선 우선 Readme를 어떻게 불러오는가에 대한 의문이 있었는데 Next.js의 공식 레포지토리에 [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)가 존재하여서 여기서 많은 참고를 했다.

공식 레포지포리에서 Readme를 읽어오는 방식은 다음과 같다.

```ts
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
```

간단하게 요약해서 설명하자면 루트 디렉토리에 존재하는 `_post` 폴더 내에 모든 파일을 읽어 온 후 해당 파일을 `gray-matter` 라이브러리를 통해 데이터와 콘텐트를 분리시킨 후 객체로 묶어서 배열화하는 방식이다.

이 방식 또한 충분히 훌륭하지만 나는 개인적으로 카테고리와 태그를 추가로 구현하고 싶어서 코드를 살짝 수정하였다.

```ts
// .../lib/api.ts

import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts');

interface Category {
  categoryName: string,
  quantity: number,
}

export function getAllCategories(): Category[] {
  const categories = fs.readdirSync(postsDirectory);
  const categoriesWithQuantity = categories.map(category => {
    const filesRoot = join(postsDirectory, category);
    const posts = fs.readdirSync(filesRoot).length;
    return { categoryName: category, quantity: posts };
  });
  return categoriesWithQuantity;
}

export function getSlugsByCategory(category: string) {
  const filesRoot = join(postsDirectory, category);
  const slugs = fs.readdirSync(filesRoot, 'utf-8')
    .map((slug) => {
      return {
        slug,
        category,
      }
    });
  return slugs;
}

export function getPostBySlug(slug: string, category:string, fields: string[] = []) {
  const postMdFileRoot = join(postsDirectory, category, slug);
  const postMdFile = fs.readFileSync(`${postMdFileRoot}`, 'utf8');
  const { data, content } = matter(postMdFile);

  type Items = {
    [key: string]: string
  }

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug.split(".md")[0];
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'category') {
      items[field] = category;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const categories = getAllCategories();
  const categoriesWithoutquantity = categories.map((item) => item.categoryName);
  const posts = categoriesWithoutquantity.map((category) => getSlugsByCategory(category))
    .flat()
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts;
}

export function getAllPostsByCategory(category: string, fields: string[] = []) {
  const posts = getSlugsByCategory(category)
    .map(({ slug, category }) => getPostBySlug(slug, category, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts;
}

export function getAllPostsByTag(tag: string, fields: string[] = []) {
  const posts = getAllPosts(fields)
    .filter(({ tags }) =>tags.includes(tag))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllTags(category?: string) {
  const allTags = category ? getAllPostsByCategory(category, ["tags"]) : getAllPosts(["tags"]);
  const tagsObj: { [key: string]: number } = {};
  allTags
    .map(item => item.tags)
    .flat()
    .forEach(item => {
      if (!tagsObj[item]) tagsObj[item] = 1;
      else tagsObj[item] += 1;
    });
  const tagKeys = Object.keys(tagsObj);
  const tags = tagKeys.map(tag => {
    return { 
      tagName: tag,
      quantity: tagsObj[tag], 
    }
  })

  return tags;
}

```

카테고리 같은 경우에는 `gray-matter` 라이브러리를 사용하기에 사실 front-matter에 categoy를 추가해서 구현하면 되긴 한다.
하지만 그럴경우 카테고리에 오타가 존재할 가능성이 있고 md 파일 하나하나 모두 카테고리를 직접 입력해야 했기에 좀 더 자동화 시키는 방식으로 구현했다.

카테고리의 경우에는 폴더 뎁스를 하나 더 추가해서 해당 디렉토리명을 카테고리로 묶어서 관리하기로 했다.

## Readme 파일 파싱하기

이제 불러온 파일을 포스트 페이지에서 파싱하여 렌더링 해야한다.

이전에 설치한 `gray-matter`로 `content`영역을 분리하는건 완료하였으니 이제 이 데이터를 `HTML`문서로 변환만 해주면 된다.

이러한 `string` 타입의 마크다운 파일을 변환해주는 `React-Markdown` 라이브러리를 활용하여 포스트를 구현하였다.

```ts
const customComponent = {
  p({ ...props }) {
    if (typeof props.children[0] === "object") {
      const element: any = props.children[0];
      return (
        { ...element }
      )
    }
    return (
      <PostContentP>
        {props.children}
      </PostContentP>
    )
  }, 
  a({ ...props }) {
    return (
      <Link href={props.href}>
        {props.children}
      </Link>
    )
  },
  h1({ ...props }) {
    return (
      <PostContentH1 id={props.children}>
        {props.children}
      </PostContentH1>
    )
  },
  h2({ ...props }) {
    return (
      <PostContentH2 id={props.children}>
        {props.children}
      </PostContentH2>
    )
  },
  h3({ ...props }) {
    return (
      <PostContentH3 id={props.children}>
        {props.children}
      </PostContentH3>
    )
  },
  img({...props}) {
    return (
      <PostContentImg
        src={props.src}
        alt={props.alt}
      />
    )
  },
  code({ ...props }) {
    const match = /language-(\w+)/.exec(props.className) as RegExpExecArray;
    if (!match) {
      return (
        <code className='small-code'>
          {String(props.children).replace(/\n$/, '')}
        </code>
      )
    }
    return (
      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
        {String(props.children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    )
  }
}

const PostBody = ({ children, post } : Props) => {
  return (
    <>
      <PostBodyBox>
        <img className="thumbnail" src={post.thumbnail} />
        <ReactMarkdown components={customComponent}>
          {children}
        </ReactMarkdown>
      </PostBodyBox>
    </>
  )
}
```

임포트한 `ReactMarkdown` 컴포넌트에 `children`으로 `content`를 삽입하면 알아서 마크다운을 파싱해준다.
하지만 추가적으로 `HTML` 컴포넌트를 커스텀하고 싶다면 `components`에 컴포넌트 집합 객체를 `props`로 부여하여 해결 할 수 있다.

코드블럭같은 경우는 `SyntaxHighlighter` 라이브러리를 활용하였다.
