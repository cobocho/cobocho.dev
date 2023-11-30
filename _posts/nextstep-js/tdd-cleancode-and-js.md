---
title: 'TDD, 클린코드, 그리고 Javascript'
description: '당신의 코드는 안녕하신가요'
thumbnail: '/assets/thumbnails/nextstep-js/tdd-cleancode-and-js.png'
date: '2023/08/02'
tags: ['NEXTSTEP', 'TDD', 'jest', '객체지향', '클린코드']
---

이번에 **NEXTSTEP**에서 주관하는 **[TDD, 클린 코드 with JavaScript](https://edu.nextstep.camp/c/BRaNdTQx)** 강좌가 열려서 신청을 했다.

국내에 프론트엔드의 TDD 관련된 커리큘럼이 많지 않기도 하고 평소에도 정말 들어보고 싶었던 강의였기에 오픈알림 신청도 했던 강좌이다.

이번 글에서는 교육의 온보딩, 그리고 1단계 미션을 거치면서 얻은 개인적인 느낌들과 고민들을 정리해보려고 한다.

# TDD에 대한 오해

![](/assets/blog/nextstep-js/tdd-cleancode-and-js/1.png)

## TDD !== TESTCODE

많은 사람들에게 TDD가 무엇이냐고 물어보면 대부분은 이런 답변이 돌아온다.

> _"TDD 그거 테스트코드 짜면서 코딩하는거 아님?"_

하지만 많은 사람들의 생각과 달리 **TDD의 핵심은 테스트코드가 아니다.**

현실세계와 달리 소프트웨어는 불안정하고, 유동적이며, 불확실하다. 어제의 기능은 내일의 레거시가 될 수도 있고 내가 개발해야하는 소프트웨어의 사이즈는 사춘기 청소년의 감정선보다도 변화무쌍하다. 현실세계에서 변기는 용변을 받고 하수처리시설로 보낸다라는 기능에서 벗어나지 않지만 프로그래밍 세계에서의 변기는 갑자기 대공포 발사 기능이 추가 될 가능성 또한 존재 할 수가 있다.

이렇게 가혹한 현실에 놓여진 가여운 프로그래머들은 끊임없이 늘어났다 줄어드는 블랙홀과도 같은 소프트웨어를 다루면서 한 가지 고민에 빠졌다. **_'결국 우리는 이 소프트웨어 위기(software crisis) 에서 벗어날 수 없는것인가?'_**

기존의 방식에선 항상 동일한 문제가 나타났다. 소프트웨어가 확장될수록 추가적인 확장에 기하급수적인 비용이 든다는 것. TDD는 이러한 고전적인 사고방식에서 벗어나보기로했다.

TDD는 기존의 사고방식을 뒤집었다. 바로 **테스트코드를 우선적으로 만들고 테스트코드를 통과하는 코드를 작성한다.**
위의 문장을 읽었다면 방금 말한 _'TDD의 핵심은 테스트코드가 아니다'_ 라는 문구에 의문이 들 수도 있다.
물론 TDD에서 테스트코드는 정말 중요한 위치를 차지하고 있지만, 그렇다고 테스트코드가 TDD의 전부인것은 아니다. **테스트코드는 TDD의 의도치 않은 유용한 부산물일뿐이다.**

그렇다면 TDD의 핵심이 무엇이냐? TDD의 핵심은 **빠른 피드백**에 있다.
이는 TDD의 전신인 **[익스트림 프로그래밍(eXtreme Programming)](http://www.extremeprogramming.org/)** 에서부터 출발했다. XP의 핵심 가치로는 여러가지가 존재하지만 그 중에서도 **고객이 원하는 양질의 소프트웨어를 빠른 시간안에 전달하는 것**을 궁극적인 목표로 여긴다. 그렇기에 프로그래머는 수시로 발생하는 변경사항을 단기간에 프로토타입으로 제작하고 클라이언트에게 전달하여 최대한 빨리 제품의 피드백을 얻는다.

그렇다면 **클라이언트에게 도달하기 전에 프로그래밍 단계에서 부터 피드백을 얻을 방법은 없을까?**

이제 테스트 주도 개발이 빛을 발휘할 시간이다.

## TDD의 계단

### 실패하는 테스트케이스를 만든다

프로그래머는 구현 시작단계에서 테스트코드부터 작성한다.
우리는 이 과정에서 자연스럽게 한 가지를 생각하게된다. **'내가 만들고 싶은 결과물이 정녕 무엇인가?'**
우리 모두는 코딩을 하다가 지금 당장 눈 앞에 나타난 버그만 때려잡다 최종적인 목표를 까먹고 주화입마에 빠진 경험을 해본 적이 있을 것이다. TDD의 1단계는 이러한 현상을 방지해준다.

테스트코드를 우선적으로 작성하다보면 자연스럽게 우리가 목표로하는 **최소 기능과 구현 순서**에 대한 해답을 얻을 수 있다. 당연히 테스트코드를 작성하는데 최소 기능을 뒤로 하고 추가 기능부터 작성하는 프로그래머는 없을테니 말이다. 설마 블로그를 만드는데 포스팅 기능 이전에 댓글 부터 구현하려는 프로그래머가 존재할까?

### 테스트 케이스를 통과하는 코드를 작성한다

첫번째 단계에서 최소 기능은 정의되었다. 그렇다면 이젠 정성스레 만들어놓은 테스트코드를 통과시킬 실제 프로덕트를 개발할 시간이다.
우린 과거의 내가 만들어놓은 유산의 수혜를 누리기만 하면 된다. 테스트코드는 이미 목적별로 잘게 쪼개져있고 작동하는 최소한의 기능만을 목표로하는 하나의 잘 짜여진 기능명세서와도 같다. 우린 이 기능명세서를 보면서 코드를 하나하나 채워나가면 될 뿐이다.

### 리팩토링

두번째 단계까지 마무리했다면 남은건 리팩토링이다. 첫번째와 두번째의 단계를 착실히 거쳐왔다면 리팩토링을 하면서도 TDD의 영향력을 느낄 수 있을 것이다. 기존의 테스트코드를 통과하면서 추상화와 캡슐화, 상수화를 거치며 기존의 코드를 개선해나간다.

일주일동안 청소안한 화장실을 청소하는 것과 1년을 청소안한 화장실을 청소하는 것의 난이도 차이 천지차이다.

# 클린코드를 위한 방황

## 네이밍 지옥

![](/assets/blog/nextstep-js/tdd-cleancode-and-js/2.png)

개발을 하다보면 내가 프로그래밍을 하는건지 신생아 작명소 창업을 준비하려는건지 헷갈릴 때가 있다.
그 정도로 **프로그래머와 네이밍을 뗄래야 뗄 수 없는 사이**라는 증거이기도 하다.

### 좋은 네이밍을 하는 방법

커리큘럼을 진행하면서 좋은 네이밍에 대한 예시로 **[워드 커닝햄의 의도를 드러내는 네이밍](https://wiki.c2.com/?IntentionRevealingNames)** 이 제시되었다.
해당 아티클의 핵심을 요약하자면 메서드의 네이밍은 메서드가 **어떻게 작동하는지**가 아니라 **무엇을 하는지**를 기준으로 작성해야한다는 의미이다.

아티클에선 예시가 두가지 주어지는데 그 중 특정 값이 배열에서 위치하는 인덱스를 반환하는 메서드인 `indexOf`의 네이밍 과정에 대해서 알아보자.

#### 의도를 드러내라 -getLinearSearchPosition-

배열은 항상 선형으로 존재한다. 메서드는 **배열을 선형(Linear)으로 탐색하면서 위치(Position)를 찾아서(Search) 반환한다(get).**
따라서 메서드의 의도인 얻다(get) - 선형(Linear) - 탐색(Search) - 위치(Position)를 조합하여 네이밍한다.

#### 구현 방법을 숨겨라 -getSearchPosition-

코드를 사용하는 프로그래머는 이미 작성된 **메서드가 어떤 방법으로 작동하는지는 알 필요가 없다.** 제품 구현 단계에서 `sort` 메서드를 사용하면서 해당 메서드가 버블 정렬로 정렬되는지 Timsort 방식으로 정렬되는지 알아야 할 필요가 있을까?

따라서 메서드의 **구현 방식(Linear)을 네이밍에서 제거**한다.

#### 반환 타입에 대한 명확한 힌트를 제공해라 -indexOf-

최종적으로 반환 타입(index)을 사용자가 예상 할 수 있도록 네이밍을 문장화 시켜서 가장 적절한 메서드명을 완성시킨다.

# 미션을 진행하면서 느낀 고찰

## Validation의 담당자는 누구인가

대부분의 입력을 받는 과정이 존재하는 어플리케이션은 입력한 값의 유효성을 검사하는 Validation 로직을 포함하고 있다. 첫번째 미션이었던 **자동차 경주** 미션의 경우 사용자로부터 자동차들의 이름 리스트를 입력받는다. 어플리케이션을 구성하면서 가장 대표적이고 보편적인 디자인 패턴인 **MVC** 패턴을 기반으로 구조를 설계하였다. 설계 과정에서 MVC는 다음과 같이 나누어졌다.

- Controller
  - App
- Model
  - Car
  - Track
  - WinnerChecker
- View
  - Renderer

이때 Validation이 필요한 대상은 총 3가지가 존재했다.
바로 `자동차 이름 목록(array)`, `자동차 이름(string)`, `라운드(number)`

각각 대상들은 다음과 같은 Validation 과정을 거친다.

- `자동차 이름 목록(array)`
  - 최대 참가 인원
  - 최소 참가 인원
- `자동차 이름(string)`
  - 최대 글자
  - 최소 글자
- `라운드(number)`
  - 최대 라운드
  - 최소 라운드

그렇다면 해당 값들의 Validation은 어디에서 처리해야할까?
처음에는 Contoller에서 Validation을 관리하도록 구현하였다. 가장 근본적인 이유로 **'Error의 발생으로 인한 프로그램의 종료는 Controller에서 담당하는게 적절하다.'** 라고 생각하였기 때문이다.

하지만 Step 2에서 입력값이 늘어나면서 다시 한번 Validation의 위치에 대해서 생각해보았다. 과연 Contoller에서 모든 Validation을 관리하는게 타당한가? 이에 대한 의문을 해결하기 위해 구글링을 해서 다른 프로그래머들의 의견을 찾아보니 좀 오래되긴 했지만 [이런 포스트(Best Place for Validation in Model/View/Controller Model?)](https://stackoverflow.com/questions/5305854/best-place-for-validation-in-model-view-controller-model)를 찾을 수 있었다.

해당 질문에서 가장 많은 공감과 호응을 이끌어낸 답변은 **Validation은 Model에 위치해야 한다**는 답변이다. 나 또한 글을 읽어보니 꽤나 타당한 주장이라고 느껴졌는데 이유로는 아래 문구가 결정적이었다.

> _Having the validations at the model level allows data to theoretically be always correct.
> Model에서 유효성 검사를 실시함으로써 무결성을 유지할 수 있다._

위의 의견을 따라서 Validation을 Model로 이관하며 리팩토링을 진행했다. 하지만 Validation 대상 중 `자동차 이름 목록(array)`의 경우에는 일회성으로 사용되고 이후에는 배열의 원소들인 `자동차 이름(string)`로서만 사용되는데 이를 위해 `자동차 이름 목록(array)`의 Model을 생성하는게 과연 올바른가에 대한 고민이 생겼다.

최종적으로는 `자동차 이름 목록(array)`은 Model 레벨까지 가지 않고 Controller 단계에서 Validation을 처리하는 방향으로 구현하였다.

하지만 한가지 고민이 남아 있었는데 **그렇다면 프로그램의 흐름을 Model에서 제어해도 괜찮은가?** 라는 의문이 생겼다. 하지만 Model에서 프로그램을 직접 조작하는 것은 프로그램의 의존 관계가 뒤집힌 것이라고 판단되어 Validation에서는 Error를 throw 해주는 단계까지만 책임지고 Error를 catch해서 프로그램을 제어하는건 Controller가 담당하는 방향으로 수정했다.

이에 관해서 함께 코스를 수강하는 참가자 분들과 [discussion](https://github.com/next-step/js-racingcar/discussions/171)에서 각자의 의견을 나눴는데 다른 사람의 관점을 알아 볼 수 있는 기회여서 꽤나 뜻깊은 경험이었다고 생각한다.

## private method의 테스팅

객체지향에서 **추상화(Abstraciton) 만큼이나 중요하게 여겨지는 개념이 은닉화(hiding)이다.**
은닉화를 추구하면서 객체의 내부 데이터와 연산을 외부에서 접근하지 못하도록 만들어 객체의 무결성을 유지시킨다. 이렇게 기저에 깔린 규칙에 따라서 외부의 접근이 필요하지 않은 메서드의 경우 `private`를 통해 은닉화를 실현한다.

그렇다면 과연 **private method는 테스트가 필요할까?**
이에 대해서는 나 뿐만이 아니라 다른 수강생분들도 많은 의문을 제시했었는데 한 리뷰어 분이 정말 좋은 페이지를 하나 공유해주셨다.

참고로 굉장히 장문의 글이니 데이터 환경에서의 접속은 삼가하길

[https://shoulditestprivatemethods.com/](https://shoulditestprivatemethods.com/)

# 예상치 못하게 알게된 JS의 구조적 특징

## javascript는 결국 prototype이다

개인적으로 유틸리티 함수를 만들때 Class의 `static`을 활용해 정적 메서드로 만들어서 작성하는걸 즐겨하는 편이다.

일반적으로 Java같은 Class 기반 객체지향언어에서는 정적 메서드에서 `this`를 사용 할 수가 없다. 당연하게도 정적 메서드는 인스턴스가 생성되지 않는다는 가정하에 컴파일되기 때문이다. 하지만 js에서는 정적 메서드 내부에서 일부 조건에 한해서 `this`가 사용 가능하다.

예를 들어서 다음과 같은 Class가 존재한다고 가정해보자.

```js
class Utils {
  getA() {
    return 'A';
  }
  static getB() {
    return this.getA();
  }
}
```

해당 Class가 존재하는 런타임 환경에서 `Utils.getB()`를 호출할 시 `Uncaught TypeError: this.getA is not a function` 라는 에러가 날 것이다.

당연한 결과이다. 인스턴스가 존재하지 않는 상황에서 `this`에 접근하는건 어불성설이니.

하지만 위 코드를 아래와 같이 바꾼다면 정상적으로 작동한다.

```js
class Utils {
  static getA() {
    return 'A';
  }
  static getB() {
    return this.getA();
  }
}
```

이 상태에서 `Utils.getB()`를 호출할 시 `"A"`가 정상적으로 반환된다.
어째서 인스턴스가 생성되지도 않았는데 `this`로 접근 할 수 있던걸까?

아래 코드를 살펴보자.

```js
class Utils {
  static getThis() {
    return this;
  }
}
```

이 코드에서 인스턴스의 생성 없이 `Utils.getThis()`를 실행하면 어떤 값을 반환할까?

```js
class Utils {
  static getThis() {
    return this;
  }
}
```

답은 바로 인스턴스가 아닌 자기 자신인 Utils Class를 반환한다.
이는 javascript의 Class가 결국에는 생성자 함수로 이루어져있기 때문이다.

아까 전의 코드를 babel을 통해 es5 문법으로 트랜스파일링해보자.

```js
'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';

  return (
    (_typeof =
      typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

function _toPropertyKey(arg) {
  const key = _toPrimitive(arg, 'string');
  return _typeof(key) === 'symbol' ? key : String(key);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input;
  const prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    const res = prim.call(input, hint || 'default');
    if (_typeof(res) !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}

const Utils = /* #__PURE__ */ (function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }
  _createClass(Utils, null, [
    {
      key: 'getA',
      value: function getA() {
        return 'A';
      },
    },
    {
      key: 'getB',
      value: function getB() {
        return this.getA();
      },
    },
  ]);
  return Utils;
})();
```

굉장히 해석하기 복잡한 코드지만... 본론만 말하자면 `static`의 유무에 따라 메서드가 바인딩 되는 위치가 달라진다.
`Utils` 라는 생성자 함수를 작성하면서 정적 메서드는 `Object.defineProperty`를 통해 생성자 함수 `Utils`에 직접 바인딩 된다.

하지만 일반적인 메서드의 경우 생성자 함수가 반환하는 인스턴스에 바인딩된다.

정리하자면 **Javascript의 Class는 결국 Prototype 기반 객체를 생성하는 일종의 문법적 설탕(syntax sugar)이기 때문이다.**
(물론 완전한 문법적 설탕이라기엔 생성자 함수와 Class 간의 차이점이 분명히 존재한다)

# 최종 정리

미션을 진행하면서 많은 것들을 얻을 수 있었다.

오랜만에 바닐라 js를 다루면서 그간 잊고있었던 js의 괴랄한 작동 구조도 다시 한 번 느낄 수 있었고 스스로 어떻게 코드를 짜야할지도 생각해볼 수 있었던 시간이었다.

가장 좋았던 부분은 나의 코드에 대해서 정말로 상세한 코드리뷰를 받을 수 있었다는 점이 만족스러웠다.

![신나는 코드리뷰](/assets/blog/nextstep-js/tdd-cleancode-and-js/3.png)

추가적으로 비정기적으로 열리는 모각코나 코드리뷰 저자 워크숍 같은 번개도 굉장히 유익하고 많은 도움이 된 것 같았다.

앞으로 남은 스텝들도 기대가 된다.
