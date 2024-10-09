---
title: '이펙티브 소프트웨어 테스팅 with Typescript -테스트 주도 개발-'
description: '테스트를 통해 추구하는 생산성'
date: '2024/05/19'
tags: ['테스트', 'jest', 'TDD']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

이번에는 **테스트 주도 개발**_(test driven development)_ 에 대해서 알아보자. 간략하게 말해서 TDD는 코드를 약간 작성하고 테스트한다는 기존의 방식과는 달리 구현해야할 작은 기능을 표현하는 테스트를 우선적으로 작성한다. 이후, 실패하는 테스트를 통과하게 만들고 이를 리팩토링하는 과정을 의미한다.

작은 예제를 통해 TDD를 알아보자.

# 첫 번째 TDD 세션

우리가 만들 프로그램은 로마 숫자를 정수형으로 바꾸는 소프트웨어이다. 로마 숫자는 일곱개의 기호를 가지고 수를 표현한다.

- I. unus, 1
- V. quinque, 2
- X. decem, 10
- L. quinquaginta, 50
- C. centum, 100
- D. quingenti, 500
- M. mille, 1,000

로마인들은 수를 표현하기 위해 이 기호를 조합한다. 이때 두 가지 규칙이 있다.

- 오른쪽에 있는 숫자가 더 작거나 같은 값을 가지면 더 높은 값을 가진 숫자에 더한다.
- 왼쪽에 있는 숫자가 더 작은 값을 가지면 더 높은 값을 가진 숫자에서 차감한다.

예를 들어 숫자 `XV`는 `15(10 + 5)`이며 `XXIV`는 `24(10 + 10 - 1 + 5)`이다.

이번 TDD 세션의 목표는 문자열 로마 숫자를 받아서 정수형의 아라비아 숫자로 반환하는 것이다.

우선 예시를 만들어 프로그램의 입력과 기대하는 출력을 생각하자.

- 단일 문자를 사용한 경우

  - 입력값: `I`, 기댓값: `1`
  - 입력값: `V`, 기댓값: `5`
  - 입력값: `X`, 기댓값: `10`

- 여러 문자를 사용한 경우 (뺄셈X)

  - 입력값: `II`, 기댓값: `2`
  - 입력값: `III`, 기댓값: `3`
  - 입력값: `VI`, 기댓값: `6`
  - 입력값: `XVII`, 기댓값: `17`

- 간단한 뺄셈 규칙

  - 입력값: `IV`, 기댓값: `4`
  - 입력값: `IX`, 기댓값: `9`

- 여러 문자를 사용하며 뺄셈 규칙을 사용하는 경우

  - 입력값: `XIV`, 기댓값: `14`
  - 입력값: `XXIX`, 기댓값: `29`

_TDD를 할때는 코너 케이스보다는 정상 경로와 비즈니스 규칙에 우선 집중하자_

이제 우리는 예시 목록에서 가장 간단한 케이스를 기반으로 자동 테스트를 작성하자. 이후 테스트를 통과할만큼 코드를 작성한 후 코드를 개선하고 과정을 반복한다.

```ts
describe('RomanNumeralConverter', () => {
  it.each([
    { numberInRoman: 'I', expected: 1 },
    { numberInRoman: 'V', expected: 5 },
    { numberInRoman: 'X', expected: 10 },
  ])(`sould uneders stand Symbol`, ({ numberInRoman, expected }) => {
    const converter = new RomanNumeralConverter();

    const result = converter.convert(numberInRoman);

    expect(result).toBe(expected);
  });
});
```

우선 입력값이 단일 문자인 경우에 대한 테스트 코드를 작성한다.

```ts
class RomanNumeralConverter {
  public convert(numberInRoman: string): number {
    return 0;
  }
}
```

테스트를 실행하기 위한 스켈레톤 코드를 작성한다. 이후 현재 목표 테스트를 통과할 코드를 구현한다.

```ts
class RomanNumeralConverter {
  public static table: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  public convert(numberInRoman: string): number {
    if (numberInRoman.length === 1) {
      return RomanNumeralConverter.table[numberInRoman];
    }

    return 0;
  }
}
```

이제 우리는 테스트가 예상대로 통과하는 것을 알 수 있다.

```ts
it.each([
  { numberInRoman: 'II', expected: 2 },
  { numberInRoman: 'III', expected: 3 },
  { numberInRoman: 'VI', expected: 6 },
  { numberInRoman: 'XVIII', expected: 18 },
  { numberInRoman: 'XXIII', expected: 23 },
  { numberInRoman: 'DCCLXVI', expected: 766 },
])('should under stand multiple char numbers', ({ numberInRoman, expected }) => {
  const converter = new RomanNumeralConverter();

  const result = converter.convert(numberInRoman);

  expect(result).toBe(expected);
});
```

이제 두 번째 시나리오에 대한 테스트 코드를 작성한다.

```ts
public convert(numberInRoman: string): number {
  let finalNumber = 0

  for (let i = 0; i < numberInRoman.length; i++) {
    finalNumber += RomanNumeralConverter.table[numberInRoman[i]]
  }

  return finalNumber
}
```

이는 간단한 반복문을 통해 구현할 수 있다. 다음으로 차감 규칙이 작동하도록 하자.

```ts
it.each([
  { numberInRoman: 'IV', expected: 4 },
  { numberInRoman: 'XIV', expected: 14 },
  { numberInRoman: 'XL', expected: 40 },
  { numberInRoman: 'XLI', expected: 41 },
  { numberInRoman: 'CCXCIV', expected: 294 },
])('should under stand subtractive notation', ({ numberInRoman, expected }) => {
  const converter = new RomanNumeralConverter();

  const result = converter.convert(numberInRoman);

  expect(result).toBe(expected);
});
```

차감 규칙을 수행하는 여러 입력값을 제공하는 테스트를 만들었다. 다시 해당 테스트를 통과할 코드를 작성하자. 이에 대한 구현은 조금 더 까다롭다.

```ts
public convert(numberInRoman: string): number {
  let finalNumber = 0
  let lastNeighbour = 0 // 1

  for (let i = numberInRoman.length - 1; i >= 0; i--) { // 2
    const current = RomanNumeralConverter.table[numberInRoman[i]] // 3

    let multiplier = 1

    if (current < lastNeighbour) {
      multiplier = -1 // 4
    }

    finalNumber += current * multiplier // 5
    lastNeighbour = current // 6
  }
  return finalNumber
}
```

1. 마지막 방문한 숫자를 유지한다.
2. 문자를 순회한다. 하지만 이제는 오른쪽부터 왼쪽으로 진행한다.
3. 현재 로마 숫자의 십진수 값을 구한다.
4. 만약 이전 숫자가 현재 숫자보다 값이 크면 현재 숫자에 `-1`을 곱해 음수로 만든다.
5. 현재 숫자를 `finalNumber`에 더한다. 현재 숫자는 계산 규칙에 따라 양수나 음수가 된다.
6. `lastNeighbour`를 현재 숫자로 갱신한다.

이제 초반에 있는 모든 예시를 구현했으므로 다른 경우를 생각해보자, 예를 들어 `VXL` 같은 유효하지 않은 숫자가 있다. 이 또한 TDD를 통해서 해결해보자.

# 처음 맛본 TDD에 대한 고찰

이전과 같은 반복 개발 프로세스는 다음과 같다.

1. 구현하고자 하는 기능을 기능 조각에 대해 단위 테스트를 작성한다. 테스트는 실해한다.
2. 기능을 구현한다. 테스트는 통과한다.
3. 제품 코드와 테스트 코드를 리팩터링한다.

![Red-Green-Refactor Cycle](1.png)

이 프로세스 주기를 **빨강-초록-리팩터 주기**_red-green-refactor cycle_ 라고 한다.
이러한 접근법은 다음과 같은 이점이 있다.

**요구사항을 먼저 살펴본다**

TDD 주기에서 개발을 위한 테스트는 기본적으로 요구사항을 수행한다. 이 접급법은 지금 해결해야 하는 문제에 대해 코드를 작성하고 불필요한 코드를 작성하지 않게 해준다.

**제품 코드 작성 속도를 완전히 제어한다**

풀고자 하는 문제를 잘 알고 있으면 더 복잡한 테스트를 한 번에 작성할 수 있다. 하지만 어떻게 해결해야 할지 모른다면 작은 부분으로 나누어서 먼저 테스트를 작성한다.

**피드백이 빠르다**

TDD 주기를 통해 기능 개발을 한번에 하나씩 수행하면서 발생하는 새로운 문제들을 쉽게 발견한다.

**테스트 가능한 코드를 작성한다**

테스트를 먼저 작성하면 구현 전 처음부터 테스트를 할 수 있는 방법을 고민하게 된다.

**설계에 대한 피드백을 얻을 수 있다**

테스트는 종종 개발 중인 클래스나 구성요소의 첫번ㅉ때 클라이언트가 된다. TDD를 사용하면 설계상 발생하는 문제점을 일찍 발견할 수 있게 된다.

# 현업에서의 TDD

어떤 개발자들은 TDD를 사랑하지만 TDD를 사용하지 말라는 개발자도 있다. 역시나 은탄환은 없기에 우리는 이에 대해 생각해보아야 한다.

# 관련 repositories

- [original code (java)](https://github.com/effective-software-testing/code/blob/main/ch8)
- [typescript ver.](https://github.com/cobocho/effective-software-testing-typescript/tree/main/ch08)
