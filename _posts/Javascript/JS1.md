---
title: 'JS 포스트 1번'
description: 'JS 포스트 1번입니다.'
thumbnail: '/assets/blog/preview/cover.jpg'
date: '2022/07/01'
tags: ['프로토타입', '체이닝']
---
공식 레포지토리에 [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)

```ts
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts');

export function getAllCategories(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getSlugsByCategory(category: string) {
  const filesRoot = join(postsDirectory, category);
  const slugs = fs.readdirSync(filesRoot, 'utf-8')
    .map(slug => {
      return {
        slug,
        category,
      }
    });
  return slugs;
}

export function getPostBySlug(slug: string, category:string, fields: string[] = []) {
  const postMdFileRoot = join(postsDirectory, category, slug);
  const postMdFile = fs.readFileSync(postMdFileRoot, 'utf8');
  const { data, content } = matter(postMdFile);

  type Items = {
    [key: string]: string
  }

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = category;
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
  const posts = categories.map((category) => getSlugsByCategory(category))
    .flat()
    .map(({ slug, category }) => getPostBySlug(slug, category, fields));
    // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts;
}
```

![이미지](/assets/blog/javascript/JS1/JS.png)

# 개요
엘리스 1차 팀 프로젝트가 끝나고 다음 프로젝트까지 약 4주 가량의 시간이 생겼다.
그동안 커리큘럼 외에 개인적으로 어떤걸 공부할지 고민하던 중에, 기존에 배우다 멈춘 **Next.js**를 좀 더 공부하고 그걸 활용해서 뭔가 만들고 싶다는 생각이 들었다.

그렇게 어떤걸 만들지 고민하다가 결국 SSR과 SSG를 구현해보기에 가장 적합한 개인 블로그를 만들기로 결심하였다.

# 기술스택 고르기
> _"모든 프레임워크에는 **기술 부채**가 따른다."_
<span style="color: grey"> -프레임워크 없는 프론트엔드 개발- 중 발췌 </span>

블로그를 만들기로 결심한 이후에 가장 먼저 한 일은 바로 **기술스택**을 결정하는 일이었다.

## Typescript
### 이유
현재 프론트엔드 씬에서 바닐라 JS보다 많이 쓰이는 **Typescript**를 사용하기로 결정했다.
사실 TS를 써본적도 없고 정말 기초적인 이론만을 알고 있지만 그냥 만들어보면서 부딪혀보기로 했다.
## Next.js
SSG 기반 블로그를 만들때 가장 많이 사용되는 스택 2가지를 뽑으라면 아마 **Next.js**와 **Gatsby** 두 가지일 것이다.
그 외에 방법으로는 jekyll을 사용해서 자동화로 만드는 방식도 존재한다.

사실 단순한 블로그를 만드는데에는 SSR을 배제하고 Gatsby만 사용하여 만드는 방법 또한 추천할만한 방법이다.

하지만 현재 많은 기업에서 쓰이고 개인적으로도 평소에도 관심이 있었던 Next.js를 사용해보고 싶은 마음이 컸기에 Next.js를 사용하기로 결정했다.

## styled-components

기존에 내가 사용해본 컴포넌트 스타일링 라이브러리는 **CSS Module**과 **styled-components**가 있었다.
개인적으로는 CSS-in-CSS보다는 CSS-in-JS 스타일을 선호하여서 styled-components를 좀 더 자주 사용한다.
그렇기에 이번에도 styled-components를 사용하여 스타일링을 하기로 결정하였다.
Emotion을 배워서 적용시켜볼까 하는 생각도 있었지만 styled-components와 큰 차이가 없다는 얘기를 들어서 좀 더 나중에 사용해보기로 했다.
  
## Recoil(예정)

전역 상태관리 라이브러리는 Recoil을 사용할 생각이다.
전역 상태관리 라이브러리 같은 경우에는 기존에 Redux와 Redux Toolkit을 써본 적이 있다.
Redux는 몰라도 RTK를 쓰면서 불편함을 느꼈던 적은 없었기 때문에 RTK를 쓸까라는 생각을 했지만 요새 많이 쓰이는 Recoil이 궁금하기도 하고 예전부터 한번 사용해보고 싶은 마음이 있었기에 Recoil을 사용할 예정이다.

하지만 이번 주제가 블로그다 보니 전역상태를 관리할 경우는 다크모드 외에는 크게 없을것 같아서 이후에 필요한 시점이 올 때 적용할 예정이다.