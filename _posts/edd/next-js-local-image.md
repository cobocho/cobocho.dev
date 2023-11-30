---
title: 'Next.js Image 컴포넌트 동적 로컬 이미지 해결기'
description: 'CLS를 피하고 싶어'
thumbnail: '/assets/thumbnails/edd/next-js-local-image.png'
date: '2023/05/14'
tags: ['블로그', 'Next.js', 'webpack']
---

# 개요

`next.js` 프레임워크는 내장 컴포넌트로 [Image](https://nextjs.org/docs/pages/api-reference/components/image) 컴포넌트가 존재한다. `Image` 컴포넌트는 이미지 최적화를 위해 제공되는 기능이 다양하다.

- `wemp` 확장자 자동 변환
- 이미지 퀄리티 스케일링
- `Lazy Loading`을 통한 **CLS** 방지

![Cumulative Layout Shift](/assets/blog/edd/next-js-local-image/cls.gif)

> [Cumulative Layout Shift(누적 레이아웃 이동, CLS) - web.dev](https://web.dev/i18n/ko/cls/)

이 외에도 여러 기능이 존재하지만 위 3가지로 인해 성능적인 측면과 UX적인 측면에서 큰 이점을 가질 수 있다.

# Image 컴포넌트 사용법

공식 문서를 기반으로 한 Lazy Loading이 적용된 이미지 컴포넌트 사용법은 다음과 같다.

```js
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image
        src="/profile.png"
        alt="alt"
        width={500} // optional(Remote Image)
        height={500} // optional(Remote Image)
        placeholder="blur" // optional
        blurDataURL="blurURL..." // optional(Remote Image)
      />
    </div>
  );
}
```

`placeholder`에 `blur`를 부여하면 아래 사진과 같은 효과를 볼 수 있다.

리모트 이미지의 경우에는 추가적으로 `blurDataURL`을 입력해주어야한다.

![레이지 로딩이 적용된 이미지](/assets/blog/edd/next-js-local-image/lazy-image.png)

# 하지만 로컬 이미지가 동적이라면?

현재 내가 만드는 블로그 같은 경우는 포스트의 이미지 컴포넌트에 `src`로 로컬 경로를 받으면 해당 경로를 할당한다.
하지만 이런 방식으로 구현한다면 `Image` 컴포넌트가 로컬 이미지로 취급하지 않고 리모트 이미지로 취급하기에 `placeholder`의 효과를 볼 수 없게 된다.

왜냐면 `import`로 불러온 이미지를 `src`에 넣는 케이스와 문자열 경로를 넣는 케이스와 내부에서 다르게 처리하기 때문인듯 하다.

![import를 통해 불러온 이미지를 콘솔에 찍었을 시](/assets/blog/edd/next-js-local-image/import-image.png)

보시다싶이 `import`를 통해 이미지를 불러올 경우 객체 형태로 불러오게 되며 프로퍼티로 `blurDataURL`과 원본 크기 또한 가지고 있다.

하지만 단순히 파일 경로를 문자열로 넣을 경우에는 `blurDataURL`나 `width` 같은 정보들이 없기 때문에 이를 일일히 입력해주어야한다.
_(물론 입력한다고 lazy loading이 적용되지는 않았다)_

하지만 `import`의 경우 동적인 값을 기반으로 불러올 수 없기 때문에 이를 해결할 방법을 찾아야 했다.

# 내가 해결한 방법

나는 이 문제를 해결하기 위해 `import` 대신에 `require()`를 사용하여 이미지를 가져오는 방식으로 수정했다.

기존의 코드는 다음과 같다.

```ts
const PostContentImg = ({ src, alt, ...props } : Props) => {
  return (
    <PostContentImgBox>
      <img src={src} alt={alt} />
      {alt && <figcaption className="image-desc">{alt}</figcaption>}
    </PostContentImgBox>
  )
}
```

이를 **동적 import** 로 바꾸기 위해 `require()`를 적용시켰다.

```ts
const PostContentImg = ({ src, alt } : Props) => {
  const image = require(`../../../public${src}`).default;
  const aspectRatio = image.width / image.height;

  return (
    <PostContentImgBox aspectRatio={aspectRatio}>
      <div className="image-box">
        <Image
          src={image}
          alt={alt}
          placeholder='blur'
          fill
          loading = 'lazy'
          sizes="100%"
        />
      </div>
      {alt && <figcaption className="image-desc">{alt}</figcaption>}
    </PostContentImgBox>
  )
}
```

이렇게 하면 이미지를 `props`의 경로에 따라 동적으로 가져올 수 있게 된다.

하지만 당연히 문제는 이것만으로 끝나지 않았다.

## 첫번째 이슈, 빌드 오류

![너가 왜 거기서 나와](/assets/blog/edd/next-js-local-image/build-error.jpg)

위와 같은 방법으로 작성 후 페이지에 들어가보니 예상치 못한 오류가 나타났다.

> ./public/robots.txt
> Module parse failed: Unexpected character ' ' (1:1)
> You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> | User-agent: \*
> | Allow: /

갑자기 뜬금없는 `robots.txt` 관련 오류가 나타났다.
어디서 연관이 생겼길래 `robots.txt`에 에러가 생겼는지 알 수가 없어서 일단 `robots.txt`을 제거하고 재빌드를 해보니 이번엔 사이트맵에서 동일한 오류가 났다.

현재 사용하고 있는 `next-sitemap` 라이브러리와 충돌이 일어난건지 `robots.txt`, `sitemap.xml`, `sitemap-0.xml` 이 3가지 파일에서 빌드시 에러 요소가 나타났다.

원인 불명이고 stackoverflow나 깃허브 이슈를 봐도 관련 내용이 없길래 이를 어쩌지 하다가 해결방법이 떠올랐다.

### 해결법

사실 해결이라기엔 뭐한게 그냥 문제의 근원을 없애버렸다.

그저 **웹팩 빌드 시 사이트맵과 robot.txt를 제외하는것.**

마치 교통사고를 줄이기 위해서 자동차를 없애는 무식한 방법이라 마음에 걸리긴 했지만 저 3개의 파일 자체가 빌드와 크게 상관이 없는 파일들이라 그냥 실행하기로 했다.

제거 방법으로는 `npm`을 통해 `ignore-loader`를 설치한 후 `next.config.js`에서 예외 처리를 실행했다.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /^.*\/(robots\.txt|sitemap(-\d+)?\.xml)$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
```

위와 같이 입력할 시 `robots.txt`, `sitemap.xml`, `sitemap-0.xml` 이 3가지 파일을 빌드시 제외하게 된다.
하지만 예외처리 한다고해서 `sitemap-0.xml`이 자동 생성 되지 않는것은 아니라서 SEO에는 문제가 없었다.

## 두번째 이슈, gif

첫번째 문제점을 고치자 두번째 문제점이 나왔다.
이번 이슈는 **Image 컴포넌트의 gif blurDataURL 미지원.**

![import를 통해 불러온 gif를 콘솔에 찍었을 시](/assets/blog/edd/next-js-local-image/import-gif.png)

만약 `gif`를 불러온 후 콘솔에 찍어보면 `blurDataURL`가 없는 걸 볼 수 있다.
그렇다보니 `gif`의 경우에는 `blurDataURL`를 추가적으로 입력해주어야한다.

```ts
const PostContentImg = ({ src, alt } : Props) => {
  const image = require(`../../../public${src}`).default;
  const [loaded, setLoaded] = useState(false);


  return (
    <PostContentImgBox>
      <div className="image-box">
        {
          image.src.includes('.gif') ?
            <Image
              src={image}
              alt={alt}
              placeholder='blur'
              blurDataURL={image.src}
              fill
              loading="lazy"
              sizes="100%"
            />
          :
            <Image
              src={image}
              alt={alt}
              placeholder='blur'
              fill
              loading = 'lazy'
              sizes="100%"
            />
        }
      </div>
      {alt && <figcaption className="image-desc">{alt}</figcaption>}
    </PostContentImgBox>
  )
}

export default PostContentImg;
```

이를 해결하기 위해 이미지 파일의 확장자에 대한 분기처리를 추가하였다.
이렇게만 해줘도 기본적으로 사이즈를 가지고 있기에 CLS는 일어나지 않지만, 시각적인 부분에서 이미지 영역에 대한 정보를 얻을 수 없다는 점이 아쉬웠다.

그래서 스켈레톤 UI까진 아니어도 간단하게 로드 전에 gif의 영역을 표시하도록 수정하였다.

```ts
const PostContentImgBox = styled.figure<{ aspectRatio: number, loaded: boolean }>`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  .image-box {
    position: relative;
    width: 80%;
    margin: 0 auto 10px auto;
    aspect-ratio: ${props => props.aspectRatio};
    background-color: ${props => props.loaded ? "transparent" : props.theme.blockColor};
  }

  .image-desc {
    color: #a6a6a6;
    text-align: center;
  }

  @media (max-width: 900px) {
    .post-img {
      max-width: 100%;
    }
  }
`

const PostContentImg = ({ src, alt } : Props) => {
  const image = require(`../../../public${src}`).default;
  const aspectRatio = image.width / image.height;
  const [loaded, setLoaded] = useState(false);

  function loadComplete() {
    setLoaded(true);
  }

  return (
    <PostContentImgBox aspectRatio={aspectRatio} loaded={loaded}>
      <div className="image-box">
        {
          image.src.includes('.gif') ?
            <Image
              src={image}
              alt={alt}
              placeholder='blur'
              blurDataURL={image.src}
              fill
              onLoad={loadComplete}
              loading='lazy'
              sizes="100%"
            />
          :
            <Image
              src={image}
              alt={alt}
              placeholder='blur'
              fill
              onLoad={loadComplete}
              loading='lazy'
              sizes="100%"
            />
        }
      </div>
      {alt && <figcaption className="image-desc">{alt}</figcaption>}
    </PostContentImgBox>
  )
}

export default PostContentImg;
```

`Image` 컴포넌트의 `onLoad`를 활용해서 이미지 로딩이 완료되는걸 판단하여 배경색을 변경하도록 수정하였다.

추가적으로 데스크탑 환경의 경우 레이아웃에서 포스트 영역의 가로 최대 80%만 차지하도록 구현하였는데,
이때 종횡비도 유지하기 위해 종횡비를 계산 후 컴포넌트에 부여하여 원본 비율을 유지하도록 변경하였다.
