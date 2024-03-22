---
title: 'Next.js에서 테스트 환경 구축하기 [1] Storybook'
description: '테스팅을 통해 안정적인 어플리케이션 유지하기'
date: '2024/03/21'
tags: ['블로그', 'Next.js', 'storybook', 'github actions']
---

# 프론트엔드에서의 테스트

![리팩토링을 전의 코드가 하나도 없다면 같은 프로그램이라 부를 수 있는가?](1.png)

개인 블로그를 구축한 이후, 여러 기술을 도입해보기하고 다른 기술로 마이그레이션을 진행하였다.

초기에 `Next.js 13` Page Routing을 `Next.js 14` App Routing으로 마이그레이션하였고, `styled-components`를 SSR 환경에 좀 더 부합하다고 생각했던 `Vanilla Extract`로 변경하기도 하였다. 이러한 기술 스택의 변경이 아니더라도 기존의 코드를 리팩토링하거나 새로운 기능을 추가하면서 현재 블로그의 코드는 처음 만들었을 당시의 코드와는 많은 차이를 가지게 되었다.

이처럼 프론트엔드가 아니더라도 **대부분의 소프트웨어의 코드는 변경 과정을 수도 없이 거치게 된다.** 하지만 모든 변경이 개발자의 의도와 딱딱 들어맞게 적용되지는 않는다. 단 한 줄의 변경사항이 한 프로그램을 완전히 무너뜨리게 될 수도 있다.

# 테스트 도입 이유

## 예기치 못한 빌드 오류

현재 내가 제작한 블로그의 경우 `Next.js`를 통해 구현되었다보니 `vercel`을 통해 배포를 관리하고 있다. `vercel`을 통해 배포하는 경우, `Next.js` 어플리케이션 빌드에 실패할 시 CI/CD를 강제 종료하고 이전 커밋에서 이루어진 배포 상태를 그대로 유지한다. 이러한 빌드 오류 발생 케이스를 최대한 줄이기 위해 빌드를 위한 커밋 이전에 CI/CD를 통해 검증과정을 추가하여 문제를 해결하려 하였다.

## 컴포넌트 주도 개발

프로그램 방법론에는 여러가지가 존재한다. **도메인 주도 개발(DDD, Domain-Driven Design)**, **테스트 주도 개발(TDD, Test-Driven Design)**, **행위 주도 개발(BDD, Behavior-Driven Development)** 등 많은 종류가 있으며, 이 중에는 서로 일부분 겹치는 관점을 가진 방법론 또한 존재한다.

개인적인 의견으로는 리액트를 기반으로한 프로그램의 경우 아키텍쳐의 핵심은 **컴포넌트(component)** 에 존재한다고 생각하였다. 그렇기에 리액트 프론트엔드 프로그램을 개발할 때에는 컴포넌트를 중심으로 개발하는 **[컴포넌트 주도 개발(Component-Driven Development)](https://www.chromatic.com/blog/component-driven-development/)** 가 가장 적절하다 생각하였고, 이를 위해 테스트를 도입하기로 결정하였다.

## 리팩토링에는 테스트가 필요하다

> 리팩토링은 분명 가치있는 독구지만, 그것만으로는 부족하다. 리팩터링을 제대로 하려면 불가피하게 저지르는 실수를 잡아주는 **견고한 테스트 스위트(test suite)** 가 뒷받침 돼야 한다. <br><div align="right">_- 마틴 파울러의 리팩터링 2판_</div>

리팩토링은 옳다. 하지만 테스트가 존재하지 않는 리팩토링의 경우, 리팩터링의 유효성을 완벽하게 확인하기 어렵다. 만약 리팩터링을 통해 코드가 수정된 후 해당 코드의 영향을 받는 코드들의 유효성은 어떻게 검사해야 할까? 만약 리팩터링한 코드가 프로그램의 이곳 저곳에 심어져 있어 에러의 범위가 넓어지는 **[산탄총 수술(Shotgun Surgery)](https://refactoring.guru/smells/shotgun-surgery)** 가 발생한다면 어떡할까?

이러한 상황은 테스트 커버리지를 넓히므로서 리팩토링 코드의 유효성을 검증할 수 있다. 물론 그 이전에 산탄총 수술이 발생하지 않을 코드를 설계하는 것이 더 중요하기는 하다.

# 테스트 환경 구축하기

## Storybook

![Storybook 예시](2.gif)

`Storybook`이란 격리된 환경에서 어플리케이션 외부의 UI 컴포넌트를 렌더링하여 어플리케이션을 컴포넌트 단위로 쪼개어 다양한 상황에 대한 렌더링 케이스를 미리 확인할 수 있다. 스토리북을 통해 컴포넌트 각각의 디자인을 독립된 상태로 확인할 수 있다.

```bash
npx storybook@latest init
```

위 커맨드를 실행하면 프로젝트 내에 `Storybook`을 설치할 수 있다.

### preview를 통해 스토리 래핑하기

`Storybook`을 설치하고 나면 루트 디렉토리에 `.storybook`이라는 폴더에 `main.ts`와 `preview.tsx`가 생성된다.

`main.ts`의 경우 다른 라이브러리의 `config.js`와 비슷한 역할을 한다 즉, `Storybook`의 설정을 조작할 수 있다.

`preview.tsx`의 경우 스토리북이 생성될 컴포넌트들에 공통적으로 적용될 `Story`를 의미한다.

```ts
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },

  decorators: [
    (Story) => {
      localStorage.setItem('dark_mode', '0');

      return (
        <ThemeContextProvider>
          <ModalContextProvider>
            <PostViewProvider>
              <div
                id="default-padding"
                style={{
                  padding: '16px',
                }}
              >
                <Story />
              </div>
            </PostViewProvider>
          </ModalContextProvider>
        </ThemeContextProvider>
      );
    },
  ],
};
```

위 코드의 경우 현재 블로그의 `preview.tsx`이다.
이 중에서 `decorators`를 주의깊게 보자.

```ts
decorators: [
    (Story) => {
      localStorage.setItem('dark_mode', '0');

      return (
        <ThemeContextProvider>
          <ModalContextProvider>
            <PostViewProvider>
              <div
                id="default-padding"
                style={{
                  padding: '16px',
                }}
              >
                <Story />
              </div>
            </PostViewProvider>
          </ModalContextProvider>
        </ThemeContextProvider>
      );
    },
  ],
```

`decorators`는 렌더링 함수를 배열로 받는 멤버이다. 모든 함수의 인자는 렌더링 타겟 컴포넌트로 설정되며 이를 통해 스토리북에 띄울 컴포넌트를 다른 컴포넌트나 DOM으로 래핑할 수 있다. `Next.js`로 비유하자면 일종의 **`RootLayout`** 이라고 표현할 수도 있다.

### 렌더링 케이스를 위한 유틸리티 컴포넌트

동일한 컴포넌트를 렌더링할 경우에도 여러 상황을 가정할 수 있다.
예를들어 현재 블로그의 경우 포스트 카드를 렌더링할때 2가지 요소로 부터 영향을 받는다.

1. 현재 어플리케이션이 **다크 모드**인가?
2. 현재 포스트 리스트가 **가로 보기** 인가?

![포스트 카드의 렌더링 케이스](3.png)

렌더링 케이스를 계산하면 총 4개가 나온다.

1. 라이트모드 / 가로 보기
2. 라이트모드 / 2개씩 보기
3. 다크모드 / 가로 보기
4. 다크모드 / 2개씩 보기

가장 기본 케이스인 `라이트모드 / 2개씩 보기`의 경우부터 확인하자.

#### 라이트모드 / 2개씩 보기

```ts
export const Default: Story = {
  name: '포스트 카드',

  decorators: [
    (Story) => {
      return (
        <RowPostCardRenderer rowMode={false}>
          <Story />
        </RowPostCardRenderer>
      );
    },
  ],
};
```

```ts
export const RowPostCardRenderer = ({ children, rowMode }: RowPostCardRendererProps) => {
  const { changePostView } = usePostView();

  useEffect(() => {
    if (rowMode) {
      changePostView(1);
    } else {
      changePostView(2);
    }
  }, []);

  return <>{children}</>;
};
```

각각의 컴포넌트마다 `useEffect`와 전역 상태 변경을 위한 커스텀 훅을 작성할 수도 있지만 `RowPostCardRenderer`라는 유틸리티 컴포넌트를 통해 전역 상태를 간단하게 스토리북에서 컨트롤할 수 있다.

#### 라이트모드 / 가로 보기

```ts
export const DefaultRow: Story = {
  name: '포스트 카드 (가로보기)',

  decorators: [
    (Story) => {
      return (
        <RowPostCardRenderer rowMode={true}>
          <Story />
        </RowPostCardRenderer>
      );
    },
  ],
};
```

기존에 만들어 놓은 유틸리티 컴포넌트를 통해 좀 더 간편하게 적용할 수 있다.

#### 다크모드 / 2개씩 보기

```ts
export const Darkmode: Story = {
  name: '포스트 카드 (다크 모드)',

  decorators: [
    (Story) => {
      return (
        <DarkmodeRenderer>
          <RowPostCardRenderer rowMode={false}>
            <Story />
          </RowPostCardRenderer>
        </DarkmodeRenderer>
      );
    },
  ],
};
```

```ts
export const DarkmodeRenderer = ({ children }: PropsWithChildren) => {
  const { toggleTheme } = useThemeToggle();

  useEffect(() => {
    toggleTheme();
  }, []);

  return <>{children}</>;
};
```

다크 모드 또한 동일한 방법으로 구현하면 좀 더 간편하게 스토리북 코드를 관리할 수 있다.

### play를 통한 유저 인터랙션 구현

만약 스토리북 내의 컴포넌트가 인터랙션에 따라 변경되는 UI가 존재한다면, `play` 메서드를 통해 유저의 인터랙션을 구현 할 수 있다.

이번에도 현재 블로그를 기준으로 예시를 보여주자면, 블로그 헤더에 존재하는 다크모드 토글을 클릭할 경우, 블로그의 현재 다크모드 여부가 변경된다. 이때 `play` 메서드를 통해 해당 인터랙션을 구현하여 UI의 변경을 확인한다.

```ts
export const Toggle: Story = {
  name: '다크 모드',

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId('dark-mode');

    await userEvent.click(toggleButton);
  },
};
```

`play` 함수가 인자로 받는 객체의 필드 중에는 `canvasElement`가 존재한다 `canvasElement`는 현재 스토리가 그려진 렌더링 환경을 의미한다. 여기서 `within` 함수를 통해 현재 테스트 렌더링 환경을 가져온 후 [React-Testing-Library의 쿼리](https://testing-library.com/docs/queries/about/)를 사용하여 인터랙션을 발생시킬 element를 지정한다.

![](4.gif)

이후 `userEvent`를 통하여 스토리의 인터랙션을 구현하면 스토리가 시작되면서 `play` 함수를 실행하여 인터랙션을 활성화하게 된다.
