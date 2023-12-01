---
title: '타입스크립트는 어째서 타입의 형태를 좇는가'
description: '타입스크립트의 구조적 타이핑 훑어보기'
thumbnail: '/assets/blog/typescript/structural-typing/thumbnail.png'
date: '2023/11/29'
tags: ['typescript', '구조적 타이핑']
---

# 들어가며

모두 알다시피 타입스크립트는 **정적 타이핑** 언어이다.
즉 런타임 이전에 개발(컴파일) 단계에서부터 직접 타입을 지정해주어야한다.
하지만 타입스크립트의 타입 시스템은 다른 정적 타이핑 언어와는 조금 다르게 작동하는 부분이 존재한다.
다른 정적 타이핑 언어와의 기묘한 차이점을 만드는 타입스크립트의 **구조적 타이핑**에 대해서 알아보자.

# 구조적 타이핑(structural typing)이란?

타입스크립트의 공식문서에서는 구조적 타이핑을 다음과 같이 설명하고 있다.

> 구조적 타이핑이란 오직 **멤버만으로 타입을 관계시키는 방식**입니다.

멤버만으로 타입을 관계시킨다는 내용이 무슨 의미일까?
다음 타입스크립트 코드를 예시로 살펴보자.

```ts
interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;

// ✅ pass!
p = new Person();
```

위 코드를 읽어보면 다음과 같이 해석할 수 있다.

1. 변수 `p`의 타입을 `name: string` 프로퍼티를 가진 `Named`로 제한한다.
2. `p`에 `name: string` 프로퍼티를 가진 `Person` 인스턴스를 할당한다.
3. 타입스크립트 컴파일러는 해당 할당 과정에서 이루어진 타입 체킹에 오류를 발생시키지 않는다.

단순한 코드이지만 미묘한 기시감이 들기도 한다.

_'Person 클래스는 Named의 구현체가 아닌데 어째서 타입이 허용되지?'_ 라는 생각이 들 것이다.

이는 위에서 설명한 것과 같이 타입스크립트가 **객체의 멤버로만 타입을 확인하는 구조적 서브타이핑**을 기반으로 타입시스템을 구축하였기 때문이다. 구조적 서브타이핑을 채택하면서 타입스크립트는 타입을 체크할때 타입의 동일성을 확인하는 것이 아닌 객체의 멤버를 기준으로 판별하게 된다.

```ts
interface Named {
  name: string;
}
let x: Named;

let y = { name: 'Alice', location: 'Seattle' };

// ✅ pass!
x = y;
```

다른 케이스로 멤버 프로퍼티가 더 많더라도 제한된 타입의 멤버를 가졌다면, 즉 최소요건을 충족했다면 동일하게 적용된다.

## 명목적 타이핑과의 차이

명목적 타이핑과의 차이점을 코드로 살펴보자면 다음과 같다.

```ts
interface Named {
  name: string;
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

let p: Named;
p = new Person('Alice');
```

위와 같은 타입스크립트 코드를 명목적 타이핑 언어인 Java로 바꿔보면 다음과 같다.

```java
interface Named {
    String getName();
}

class Person {
    private String name;
    public Person(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}

// 🚨 error!
Named n = new Person("Alice");
```

명목적 타이핑 언어인 자바에서는 해당 코드를 컴파일시 에러가 발생한다.
`new Person("Alice")`에는 `Named` 인터페이스의 요구조건을 모두 충족하였지만, `Person`은 `Named` 인터페이스의 구현체가 아니므로 에러가 발생한다.
위 에러를 해결해주기 위해서는 `Person` 클래스를 `Named` 인터페이스의 구현체로 만들어 타입의 동일성을 명시적으로 정의하여야한다.

```java

interface Named {
    String getName();
}

// implements를 통해 `Person`이 `Named`의 구현체인것을 명시한다.
class Person implements Named {
    private String name;
    public Person(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}

// ✅ pass!
Named n = new Person("Alice");
```

# 구조적 타이핑의 도입 배경

위 내용을 보면서 확실하게 말할 수 있는 한가지는 **구조적 타이핑은 명목적 타이핑보다 타입 안정성이 떨어진다는 점**이다.
그렇다면 타입스크립트는 어째서 구조적 타이핑이라는 개념을 채택한 것일까?

이는 타입스크립트가 정적 타이핑을 추구하면서도 자바스크립트에서의 경험을 모방하기 위해서이다.
그렇기에 타입스크립트는 자바스크립트의 **덕 타이핑(Duck Typing)** 과 매우 유사한 형태의 구조적 타이핑 개념을 구축하였다.

덕 타이핑과 유사한 구조적 타이핑을 채택하면서 동적 타이핑 언어를 사용하던 자바스크립트 유저들은 타입스크립트로의 전환 과정에서 높은 적응력을 얻을 수 있었다.

그렇다면 덕 타이핑은 과연 무엇일까?

## 🦆 오리처럼 걷고, 오리처럼 울면 오리다 (Duck Typing)

![카리스마 대빵큰오리](/assets/blog/typescript/structural-typing/1.png)

> “When I see a bird that walks like a duck and swims like a duck and quacks like a duck, I call that bird a duck.”
> "내가 만약 오리처럼 걷고, 오리처럼 헤엄치고, 오리 같은 꽥꽥소리를 내는 새를 보았다면, 난 그 새를 오리라고 부를 것이다."
> < 인디애나의 시인, 제임스 윗컴 라일리 >

덕 타이핑은 [오리 실험](https://en.wikipedia.org/wiki/Duck_test)이라고 부르는 귀추법을 본 따 고안된 프로그래밍 개념이다.
말 그대로 오리처럼 생기고 행동하면 오리라는 의미이다. ~~비슷한 한국 속담으로 "코에 걸면 코걸이 귀에 걸면 귀걸이"가 있다.~~

좀 더 부연설명하자면 **특정 객체의 행동을 사용하지만 타입 체크를 런타임으로 미루는 것**이라고 볼 수 있다.

# 구조적 타이핑의 함정

![덕 타이핑의 함정](/assets/blog/typescript/structural-typing/2.png)

> [오리처럼 꽥꽥거리고 오리처럼 곡물을 먹고 먹은 곡물을 배설하는 **기계 오리**를 오리라 볼 수 있는가?](https://en.wikipedia.org/wiki/Digesting_Duck)

구조적 타이핑은 덕 타이핑의 장점을 얻었지만, 동시에 단점 또한 존재한다.
타입 체크가 명목적 타이핑에 비해 느슨하다보니, 의도치 않은 결과 또한 도출될 수가 있다.

코드를 예시로 들어보면 다음과 같다.

```ts
class Duck {
  quack() {
    return '꽥꽥! 🦆';
  }
}

class Goose {
  quack() {
    return '난 거위야 멍청아.';
  }
}

const shout = (target: Duck) => {
  console.log(target.quack());
};

shout(new Duck()); // '꽥꽥! 🦆'
shout(new Goose()); // '난 거위야 멍청아.'
```

위와 같이 `shout` 함수의 `target`의 타입을 `Duck`의 인스턴스만 허용하도록 작성하였지만 `Duck`의 멤버를 가지고있는 `Goose`의 인스턴스가 들어와도 에러가 발생하지 않는다.

이러한 방식은 개발자가 예기치 못한 상황을 발생시킬 가능성 또한 존재한다.
이를 해결하기 위해서는 타입을 좁혀 연산하는 **타입 가드**를 통해 어느정도 해결이 가능하다.

```ts
const shout = (target: Duck) => {
  if (target instanceof Duck) {
    console.log(target.quack());
  }
};
```

## 구조적 타이핑으로 인해 발생 할 수 있는 실수

```ts
interface Cube {
  width: number;
  height: number;
  depth: number;
}

const calcVolume = (cube: Cube) => {
  let result = 0;

  for (const axis of Object.keys(cube)) {
    if (result === 0) {
      // 🚨 Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Cube'.
      result = cube[axis];
      continue;
    }
    // 🚨 Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Cube'.
    const length = cube[axis];
    result *= length;
  }

  return result;
};

calcVolume({
  width: 10,
  height: 10,
  depth: 10,
});
```

위 코드의 경우 `cube[axis]`가 `any`로 추론된다. 이유는 구조적 타이핑으로 인해 요구되는 멤버 외의 필드를 보유할 가능성이 존재하기 때문이다.

```ts
const fakeCube = {
  width: 10,
  height: 10,
  depth: 10,
  quack: '꽥꽥',
};

calcVolume(fakeCube);
```

위 코드의 경우에도 구조적 타이핑으로 인해 컴파일 에러가 발생하지 않는다. 하지만 실제 코드를 실행하면 멤버 외 필드로 인해 예상과는 다른 결과를 얻게 된다.

### 해결방안 1. 타입 단언

첫번째 방법으로 타입 단언을 통해 문제를 해결할 수 있는데 세가지 방법이 존재한다.
`Object.keys`의 반환 값은 `string[]`이다. 이에 대한 타입을 타입 단언을 통해 해결할 수 있다.

#### `key`에 타입 단언 추가하기

```ts
interface Cube {
  width: number;
  height: number;
  depth: number;
}

const calcVolume = (cube: Cube) => {
  let result = 0;

  for (const axis of Object.keys(cube)) {
    if (result === 0) {
      result = cube[axis as keyof Cube];
      continue;
    }
    const length = cube[axis as keyof Cube];
    result *= length;
  }

  return result;
};

calcVolume({
  width: 10,
  height: 10,
  depth: 10,
});
```

첫번째 방법은 얻은 객체의 `key`에 타입 단언을 추가한다.

위 코드처럼 `cube[axis]`에 `as keyof Cube`로 인해 `Cube`의 `key`를 타입으로서 가져온다.
`Cube`의 `key`를 `keyof`를 통해 가져오게 된다면 `cube[axis as keyof Cube]`에는 `number`만이 존재한다는 것을 추론한다.

#### `key` 배열에 타입 단언 추가하기

```ts
interface Cube {
  width: number;
  height: number;
  depth: number;
}

const calcVolume = (cube: Cube) => {
  let result = 0;

  for (const axis of Object.keys(cube) as Array<keyof Cube>) {
    if (result === 0) {
      result = cube[axis];
      continue;
    }
    const length = cube[axis];
    result *= length;
  }

  return result;
};

calcVolume({
  width: 10,
  height: 10,
  depth: 10,
});
```

두번째 방법은 `key`의 배열에 타입 단언을 추가한다.
`Object.keys(cube)`에 `as Array<keyof Cube>`를 통해 [제네릭](https://www.typescriptlang.org/ko/docs/handbook/2/generics.html)을 이용하여 동일하게 추론이 가능하다.

### 해결방안 2. 인덱스 시그니쳐

```ts
interface Cube {
  width: number;
  height: number;
  depth: number;
  [key: string]: number;
}

const calcVolume = (cube: Cube) => {
  let result = 0;

  for (const axis of Object.keys(cube)) {
    if (result === 0) {
      result = cube[axis];
      continue;
    }
    const length = cube[axis];
    result *= length;
  }

  return result;
};

calcVolume({
  width: 10,
  height: 10,
  depth: 10,
});
```

다른 방법으로는 [인덱스 시그니쳐](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)를 사용하여 객체의 속성을 `number`로 추론시킬 수 있다.

### 해결방안 3. 타입 가드 함수 만들기

```ts
interface Cube {
  width: number;
  height: number;
  depth: number;
}

const keyof = <T extends Object>(obj: Object) => {
  return Array.from(Object.keys(obj)) as Array<keyof T>;
};

const calcVolume = (cube: Cube) => {
  let result = 0;

  for (const axis of keyof<Cube>(cube)) {
    if (result === 0) {
      result = cube[axis];
      continue;
    }
    const length = cube[axis];
    result *= length;
  }

  return result;
};

calcVolume({
  width: 10,
  height: 10,
  depth: 10,
});
```

`keyof`라는 함수를 만들어 제네릭으로 단언할 객체 타입을 입력받아, 단언된 상태의 `key` 배열을 반환하도록 구현한다.

# 구조적 타이핑의 특이 케이스

```ts
const fakeCube = {
  width: 10,
  height: 10,
  depth: 10,
  quack: '꽥꽥',
};

calcVolume(fakeCube);
```

위에 해당 코드에서 컴파일 에러가 발생하지 않는다는 설명이 존재했는데, 사실 이 코드에는 또다른 사실이 있다.

```ts
calcVolume({
  width: 10,
  height: 10,
  depth: 10,
  // 🚨 Object literal may only specify known properties, and 'quack' does not exist in type 'Cube'.(2353)
  quack: '꽥꽥',
});
```

해당 코드를 매개변수에서 객체 리터럴을 통해 바로 전달할 시 프로퍼티 정의 관련 타입 에러가 발생한다.
이 부분은 `tsconfig.json`의 `suppressExcessPropertyErrors`가 `false`일시 타입 에러가 발생된다.

이는 타입스크립트의 [신선도(Freshness)](https://radlohead.gitbook.io/typescript-deep-dive/type-system/freshness) 시스템으로 인해 타입에러가 발생한다.

타입스크립트 컴파일러는 변수에 할당되지 않고 매개변수에 바로 생성된 객체 리터럴의 경우 속성을 더욱 엄격하게 검사한다.

# References

<hr>

- [TypeScript 타입 시스템 뜯어보기: 타입 호환성 - Toss Tech](https://toss.tech/article/typescript-type-compatibility)
- [타입스크립트의 구조 타이핑 - yceffort](https://yceffort.kr/2021/06/typescript-structual-typing)
- [Effective TypeScript](https://effectivetypescript.com/)
- [JavaScript and Duck Typing](https://medium.com/front-end-weekly/javascript-and-duck-typing-7d0f908e2238)
- [모던 리액트 Deep Dive](https://wikibook.co.kr/react-deep-dive/)
