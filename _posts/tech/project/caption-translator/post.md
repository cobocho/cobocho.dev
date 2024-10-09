---
title: 'DeepL + AWS Lambda + plasmo로 나만의 자막 번역 확장 프로그램 만들기'
description: '간단하게 만드는 나만의 확장 프로그램'
date: '2024/06/28'
tags: ['plasmo', 'aws', 'aws lambda', '익스텐션']
---

# 들어가며

이번에 백로그 어딘가에 묵히고 묵혀둔 Canvas 및 Three.js 강의를 다시 듣기 시작하면서 Three.js에 흥미가 생기던 도중 [three.js journey](https://threejs-journey.com/)라는 한 강의 사이트를 발견했다. 95달러라는 가격을 보고 조금 비싸지 않나...? 라는 생각도 했지만 총 93시간이라는 어마무시한 강의 시간과 레딧에서의 긍정적인 평가들을 본 이후 꽤나 괜찮은것 같아서 구매를 하려 했다.

다만 아쉬운 점 하나는 **한글 자막 미지원.** 기술 문서와 다르게 영어 자막같이 휘리릭 넘어가는 문장들은 영알못인 나에겐 크나큰 장벽처럼 느껴진다. 제작자도 현재 [다국어 지원](https://x.com/bruno_simon/status/1682023137440059392)을 진행 중에 있지만 한국어가 언제 지원될 지는 미지수인 상황... 그래서 기왕 이렇게 된거 프로그라피 팀프로젝트를 하면서 얻은 익스텐션 개발 경험을 한번 적용 시켜보려고 한다.

# 익스텐션 개발을 위한 프레임워크, Plasmo

익스텐션을 개발할 때에는 여러 방법이 있다. 하나부터 열까지 직접 구현하는 방식도 있고, 혹은 `Vite`나 `Rollup` 같은 번들러에 [CRXJS](https://crxjs.dev/vite-plugin) 같은 플러그인을 적용시킬 수도 있다. 하지만 이번에는 이러한 방법이 아닌 `plasmo`를 이용하여 구현하려고 한다.

![plasmo framework](1.png)

plasmo 프레임워크는 **브라우저 확장 프로그램을 쉽게 만들고 테스트 할 수 있게 해주는 프레임워크**이다. 내부적으로 크로스 브라우징을 지원하여 하나의 코드베이스로 여러 브라우저 익스텐션을 동시에 제작 가능하다. 추가적으로 프레임워크 내부에서 익스텐션을 구현하는데 사용되는 스토리지나 메세징을 사용하는 코드 또한 API를 통해 추상화 되어있으며 익스텐션 배포의 기준이 되는 `manifest` 또한 자동으로 빌드 과정에서 생성해준다.

우선 확장 프로그램을 개발하기 전에 확장 프로그램이 어떤식으로 환경이 구성되는지 아키텍쳐를 우선적으로 알아보자.

## 확장 프로그램 아키텍쳐

![확장 프로그램의 아키텍쳐 요약 (manifest v2 기준)](2.png)

확장 프로그램의 경우에는 여러 페이지나 스크립트들이 각자 다른 컨텍스트를 가지고 있는다. 확장 프로그램의 컨텍스트들은 대략 다음과 같다.

1. Popup

팝업(Popup)은 브라우저의 URL 부근에 위치하는 툴바에 아이콘을 눌렀을 때 나오는 영역이다.

2. Content Script

콘텐츠 스크립트(Content Script)의 경우 방문하는 페이지 내부에서 실행된다.

3. Background

백그라운드는 브라우저의 서비스 워커 컨텍스트를 통해 실행된다.

물론 이외에도 Side Panel, Option, New Tab 등 여러 환경이 존재하지만 이번에 사용할 컨텍스트는 **Popup**과 **Content Script**이다. 브라우저 익스텐션의 경우 각각의 환경들이 모두 다르게 운영되기 때문에 Messaging과 Storage를 통해 소통한다.

우리는 `Popup` 영역에서 익스텐션의 환경설정을 관리하고 `Content Script` 영역에서 실제 비즈니스 로직을 실행할 예정이다.

## 프로젝트 세팅

```bash
pnpm create plasmo
```

우선 위 커맨드를 통해 `plasmo` 프로젝트의 보일러 플레이트를 생성하자.

![](4.png)

그럴 경우 위와 같은 폴더 구조가 기본적으로 설정된다.
여기에 루트 폴더에 `content.ts`를 생성해주자.

```ts
console.log('Content Script!');
```

이후 `content.ts`에 정상 작동 여부를 확인하는 간단한 코드를 입력한다. 코드를 작성한 뒤 터미널에 `pnpm run dev`를 입력하면 HMR이 적용된 상태로 `build` 폴더 내부에 `chrome-mv3-dev` 라는 폴더가 생길 것이다. 빌드 경우 기본적으로는 크롬을 기준으로 생성이되며 [CLI](https://docs.plasmo.com/framework/workflows/faq#what-are-the-officially-supported-browser-targets)를 통해 타겟 브라우저를 설정할 수 있다.

![](5.png)

생성된 폴더를 브라우저의 익스텐션 페이지에 등록해준다.

이제 실제 브라우저에 확장 프로그램을 적용시키기 위해 크롬의 확장 프로그램 탭으로 이동한 뒤 `압축해제된 확장 프로그램을 로드합니다.`를 클링ㄱ하여 방금 생성된 폴더를 선택해서 적용시켜주자. _만약 위 버튼이 보이지 않는다면 확장 프로그램 탭의 개발자모드를 활성화한다._

![](6.png)

위와 같이 `content.ts`가 정상적으로 실행되는 것을 알 수 있다.

> 추가적으로 HMR에 대해 알아서 새로고침을 해주는 [Extensions Reloader](https://chromewebstore.google.com/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) 익스텐션을 설치하는 것을 추천한다.

## Content Script에서 자막 찾아내기

우선 우리가 만들 익스텐션의 경우 모든 페이지에서 작동되지 않는다. 우리가 원하는 페이지에서만 작동하도록 코드를 수정하자.

```ts
async function translateCaption = () => {
}

const main = async () => {
  if (location.href.includes("threejs-journey.com/lessons/")) {
    translateCaption()
    return
  }
}

main()
```

간단하게 `location.href`가 `"threejs-journey.com/lessons/"`를 포함하는지 판별하는 코드를 통해 `translateCaption` 함수 실행 여부를 결정해주자.

![](7.png)

이제 실제 우리가 번역을 하고 싶은 텍스트를 찾아내야한다. `three.js journey`의 경우 자막을 나타내는 DOM의 선택자가 위와 같다는 것을 알 수 있다.

```ts
const translateCaption = async () => {
  const captionDiv = $<HTMLDivElement>('.js-tracks-text');
  console.log(captionDiv.textContent);

  requestAnimationFrame(() => translateCaption());
};
```

`translateCaption` 내부에서 `querySelector`를 통해 자막의 존재를 확인하면 된다. 이떄, 자막의 경우에는 영상의 진행도에 따라 달라지니 `requestAnimationFrame` API를 통해 주기적으로 자막의 업데이트 여부를 확인해준다.

![](9.gif)

위 영상처럼 자막에 업데이트의 따라 값을 가져오는 것을 알 수 있다. 하지만 위 코드의 경우 쓸모없는 요청을 반복해서 하게 되니 최적화 작업을 어느정도 해주자.

```ts
let then = Date.now();
let lastCaption = '';

const $ = <T extends Element>(selector: string) => document.querySelector(selector) as T;

const translateCaption = async () => {
  if (Date.now() - then > 50) {
    // 1
    const captionDiv = $<HTMLDivElement>('.js-tracks-text');
    const captionText = captionDiv.textContent.trim(); // 1
    const isBlankText = captionText.length === 0;
    const isSameCaption = lastCaption === captionText;

    if (!captionDiv) {
      // 2
      requestAnimationFrame(() => translateCaption());
      return;
    }

    if (isBlankText || isSameCaption) {
      // 3, 4
      requestAnimationFrame(() => translateCaption());
      return;
    }

    lastCaption = captionText;

    console.log(captionText);
  }

  requestAnimationFrame(() => translateCaption());
};
```

이제 번역 로직의 경우는 다음 조건을 모두 충족한 경우에만 실행된다.

1. 가장 최근 실행으로부터 최소 50ms가 지난 경우
2. 자막 DOM이 존재하는 경우
3. 자막이 빈 문자열이 아닌 경우
4. 자막이 가장 최근 가져온 내용과 동일하지 않은 경우

이제 자막의 내용을 찾아냈으니 DeepL API를 통해서 번역을 요청하자.

# DeepL API 발급

[DeepL](https://www.deepl.com/ko/translator)에 회원가입 후 계정 페이지에서 DeepL API를 요청하기 위한 키를 발급 받을 수 있다.
DeepL API의 경우 무료 요금제에서 한달에 500,000자까지 번역을 지원한다.

하지만 DeepL API의 경우에는 보안상의 이유로 **서버 사이드 환경의 요청**만을 허용한다. 이를 위해 간단한 서버를 구축하는 방법도 존재하지만 이번에는 좀 더 간편하게 AWS Lambda를 통해 요청을 구현해보자.

# AWS Lambda로 API 구축하기

![](11.png)

AWS 콘솔에서 Lambda를 통해 들어간 후 `함수 생성`을 클릭하면 다음과 같은 페이지가 나온다. 람다의 이름을 입력해준다.

## Lambda Function URL

![](12.png)

클라이언트에서 Lambda에 요청을 보내기 위해서는 당연하게도 URL이 필요하다. 일반적으로는 [AWS API Gateway](https://aws.amazon.com/ko/api-gateway/)를 통해 REST API를 관리하는 경우가 많지만 우리가 사용할 익스텐션의 경우 함수 하나만을 실행하는 것이 전부이니 [Lambda Function URL](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/lambda-urls.html)을 통해 간단하게 엔드포인트를 만들어주자.

추가적으로 CORS를 방지하기 위해 관련 옵션 또한 설정해주자.

## DeepL API 요청 구현

![](13.png)

함수를 생성하면 Node.js 기준으로 위와 같은 화면이 나온다. 우리는 이제 람다 내부에서 DeepL 요청을 보내는 로직을 작성하면 된다.

```ts
export const handler = async (event) => {
  const { text } = JSON.parse(event.body);

  const translateResponse = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'DeepL-Auth-Key {{YOUR_API_KEY}}',
    },
    body: JSON.stringify({
      text: [text],
      target_lang: 'KO',
    }),
  });

  const result = await translateResponse.json();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };

  return response;
};
```

요청의 `headers`에는 이전에 발급 받은 DeepL 키를 입력한다.

위와 같이 인자로 받은 `event`의 body 객체를 JSON 파싱하여 `text`를 가져온 후 `https://api-free.deepl.com/v2/translate`로 `POST` 요청을 보내준다. `body`의 경우에는 `text`에 번역할 문장을 배열에 담아 넘겨준다.

우리의 번역 타켓 언어는 한글이므로 `target_lang`에는 `"KO"`를 설정한다.

# API 연동

이제 익스텐션에서 만들어 놓은 람다에 요청을 보낼 시간이다.

```ts
const translate = async (text: string) => {
  try {
    const response = await fetch(process.env.PLASMO_PUBLIC_TRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });

    const result = (await response.json()) as {
      translations: {
        text: string;
      }[];
    };

    return result.translations[0].text;
  } catch (e) {
    return '번역 실패) ' + e;
  }
};
```

간단한 요청 함수와 에러 핸들링 로직이 담겨있는 함수를 만들어주자. 이제 해당 함수를 호출하면 다음과 같은 결과물을 볼 수 있다.

![실시간으로 번역되는 자막](14.gif)

이제 번역된 텍스트를 실제 페이지에 주입해주면 된다.

## 페이지에 번역 자막 표시하기

```ts
const createTranslatedCaption = (captionText: string, parentNode: HTMLElement) => {
  const translatedCaption = document.createElement('div');

  translatedCaption.textContent = captionText;
  translatedCaption.className = 'translated-caption';

  $('.translated-caption')?.remove();
  parentNode.style.display = 'flex';
  parentNode.style.flexDirection = 'column';
  parentNode.prepend(translatedCaption);
};
```

간단한 DOM 생성 함수를 만들어주자. 순서는 다음과 같다.

1. `div`를 하나 생성한다.
2. 인자로 받은 번역 텍스트를 `textContent`에 넣어준다.
3. 클래스를 설정한다.
4. 만약 기존에 번역 자막 DOM이 존재한다면 제거한다.
5. 번역 자막의 컨테이너 DOM을 세로정렬한다.
6. 번역 자막의 컨테이너 DOM에 생성한 번역 자막 DOM을 맨 앞에 넣어준다.

위 함수를 비즈니스 로직에 추가해주자.

```ts
const translateText = await translate(captionText);
const parentNode = captionDiv.parentNode! as HTMLDivElement;

createTranslatedCaption(translateText, parentNode);
```

결과는 다음과 같다.

![](15.gif)

# Storage를 통한 캐싱 구축

만약 일정한 부분을 반복해서 볼 경우에는 동일한 자막을 보게 된다. 이때, 현재 코드의 경우에는 동일한 자막에 대해 똑같은 요청을 반복하게 된다. 따라서 우리는 익스텐션의 **Storage API**를 통해서 간단한 캐싱을 구현해보자.

다음 코드와 같은 유틸리티 함수를 만들어준다.

```ts
import { Storage } from '@plasmohq/storage';

const storage = new Storage();

const CAPTION_CACHE_KEY = 'caption-cache';

export const getStorage = async <T>(key: string): Promise<Awaited<T | undefined>> => {
  const captionCache = ((await storage.get(CAPTION_CACHE_KEY)) as Awaited<T> | undefined) || {};

  return captionCache[key];
};

export const setStorage = async (key: string, value: any) => {
  const captionCache = ((await storage.get(CAPTION_CACHE_KEY)) as Record<string, any>) || {};

  if (Object.keys(await storage.getAll()).length > 1_000) {
    await clearStorage();
  }

  const newCaptionCache = {
    ...captionCache,
    [key]: value,
  };

  return storage.set(CAPTION_CACHE_KEY, newCaptionCache);
};

export const clearStorage = async () => {
  return storage.remove(CAPTION_CACHE_KEY);
};
```

구현 자체는 사실 로컬 스토리지 API를 사용해본 개발자라면 굉장히 익숙할 것이다. 다만 차이점은 `setStorage`를 통해 자막을 저장할 때 자막 캐시 스토리지의 값이 1,000개 이상이라면 초기화하는 로직이 추가되었을뿐이다.

```ts
const savedCaption = await getStorage<string>(captionText);
const parentNode = captionDiv.parentNode! as HTMLDivElement;
lastCaption = captionText;

if (savedCaption) {
  createTranslatedCaption(savedCaption, parentNode);
  requestAnimationFrame(() => translateCaption());
  return;
}

const translateText = await translate(captionText);

await setStorage(captionText, translateText);
createTranslatedCaption(translateText, parentNode);
```

이제 작동 코드에서 해당 유틸리티를 불러온다. 만약 캐시된 자막이 존재한다면, 요청 없이 그 값을 바로 보여주고, 캐시된 자막이 없다면 람다에 요청을 보낸다.

![캐싱되지 않은 경우](16.gif)

![캐싱된 경우](17.gif)

위와 같이 캐싱된 경우가 미묘하게 빠른 것을 볼 수 있다.

# 팝업을 통해 작동 유무 구현하기

만약 자막 번역의 작동 여부를 설정하고 싶다면 Option 페이지나 Popup을 이용할 수 있다. 이번엔 팝업을 통해 자막 번역의 작동 유무를 설정해보자.
우선 기존에 프로젝트를 설정하면서 루트 폴더에 `popup.tsx`가 생긴 것을 알 수 있다. `popup.tsx`의 기본적인 요소는 리액트와 같다.

여기에 `Storage API`를 통해 간단한 On/Off 기능을 추가해주자.

```ts
import { useLayoutEffect, useState } from "react"

import { clearStorage, getStorage, setStorage } from "~utils/storage"

function IndexPopup() {
  const [on, setOn] = useState(false)

  const onClickClear = async () => {
    const all = await clearStorage()
    console.log(Object.keys(all))
  }

  useLayoutEffect(() => {
    const setDefaultOn = async () => {
      const translateOn = await getStorage<boolean>("translate")

      if (translateOn === undefined) {
        await setStorage("translate", false)
        setOn(false)
        return
      }

      setOn(translateOn)
    }

    setDefaultOn()
  }, [])

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>Clear Caption Storage</h2>
      <button onClick={onClickClear}>Clear</button>
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => {
          setStorage("translate", e.target.checked ? true : false)
          setOn(e.target.checked)
        }}
      />
    </div>
  )
}

export default IndexPopup
```

추가적으로 캐싱을 지우는 버튼 또한 구현하였다. 이제 Content Script에서도 작동유무를 판별하는 코드를 추가해주자.

```ts
const translateEnabled = await getStorage<boolean>('translate');

if (!translateEnabled) {
  $('.translated-caption')?.remove();
  requestAnimationFrame(() => translateCaption());
  return;
}
```

번역 함수의 최상단에 `translateEnabled`를 가져오면서 이후 로직의 실행 유무를 결정할 수 있게 되었다.

# 번외, Background SW 사용하기

사실 AWS 람다를 사용하지 않고도 API 요청을 할 수 있는 방법이 있다. 바로, [Background Service Worker](https://docs.plasmo.com/framework/background-service-worker)를 사용하는 법. `Background SW`의 경우에는 서비스 워커에서 실행되기에 DeepL의 브라우저 베이스에서 호출이 금지되는 정책을 회피할 수 있다.

`background/messages` 경로에 `translate.ts`를 만들어주자.

```ts
// translate.ts

import type { PlasmoMessaging } from '@plasmohq/messaging';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const text = req.body.text;

  const translateResponse = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `DeepL-Auth-Key ${process.env.PLASMO_PUBLIC_DEEPL_KEY}`,
    },
    body: JSON.stringify({
      text: [text],
      target_lang: 'KO',
    }),
  });

  const result = await translateResponse.json();

  res.send({
    translate: result.translations[0].text,
  });
};

export default handler;
```

이후 위처럼 람다 함수에서 사용했던 로직을 백그라운드에서 실행하도록 작성한다. 다만 차이점은 기존에 서버에서 값을 반환해주던 람다와는 달리 `Messaging API`를 통해 백그라운드와 Content Script가 통신한다는 점이다. 이제 Content Script에서도 해당 코드를 호출하는 통신 로직을 추가하자.

```ts
// content.ts

import { sendToBackground } from '@plasmohq/messaging';

const translate = async (text: string) => {
  try {
    const response = await sendToBackground({
      name: 'translate',
      body: {
        text,
      },
    });

    return response.translate;
  } catch (e) {
    return '번역 실패) ' + e;
  }
};
```

간단하게 위처럼 기존의 코드를 수정해주면 된다. 최종 코드는 다음 레포지토리에서 확인 할 수 있다.

[레포지토리](https://github.com/cobocho/ai-caption-extension)

# References

- [plasmo docs](https://docs.plasmo.com/)
- [Chrome extension develop docs](https://developer.chrome.com/docs/extensions/develop?hl=ko)
- [AWS Lambda](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/welcome.html)
