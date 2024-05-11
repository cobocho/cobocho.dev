---
title: '이펙티브 소프트웨어 테스팅 with Typescript -명세 기반 테스트-'
description: '명세 기반 테스트를 통한 테스트 케이스 작성하기'
date: '2024/05/12'
tags: ['테스트', 'jest', '명세 기반 테스트']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

소프트웨어를 개발함에 있어 가장 중요한 요소는 **요구사항**이다. 개발자는 요구사항을 통해 소프트웨어가 무엇을 해야하고 하면 안되는지를 파악할 수 있다. 이번 포스트에서는 **명세 기반 테스트**를 통해서 테스트를 체계적으로 도출하는 방법을 알아보려고 한다.

# 요구사항이 모든 걸 말한다

예를 들어보자. 개발자는 새로운 요구사항을 받으면 요구사항을 분석해 메서드 목록을 작성한다. _(해당 메서드의 기능은 "주어진 문자열에서 두 태그 사이에 존재하는 모든 부분 문자열을 반환하는 것"이다)_ 이후 개발자는 해당 메서드의 이름을 `substringBetween`으로 지었다. 그리고 해당 메서드에 대한 요구사항을 도출한다.

**메서드: `substringBetween`**

어떤 문자열에서 `start`와 `end` 태그로 구분되는 부분 문자열을 모두 찾아서 배열로 반환한다.

- `str`: 주어진 문자열. `null`일 경우 `null`을 반환한다. 빈 문자열이라면 `[]`를 반환한다.
- `open`: 찾으려는 문자열의 시작 문자열. `null`일 경우 `null`을 반환한다.
- `close`: 찾으려는 문자열의 끝 문자열. `null`일 경우 `null`을 반환한다.

> ex) `str` = `"axcaycazc"` `open` = `"a"` `close` = `"c"` 라면 출력은 `["x", "y", "z"]`

이름 초안으로 구현하였을 때는 다음과 같다.

```ts
export class StringUtils {
  private static readonly EMPTY_STRING_ARRAY: string[] = [];

  private static isEmpty(cs: string | null): boolean {
    return cs === null || cs.length === 0;
  }

  public static substringsBetween(
    str: string | null,
    open: string,
    close: string,
  ): string[] | null {
    if (str === null || StringUtils.isEmpty(open) || StringUtils.isEmpty(close)) {
      // 1
      return null;
    }

    const strLen: number = str.length;

    if (strLen === 0) {
      // 2
      return StringUtils.EMPTY_STRING_ARRAY;
    }

    const closeLen: number = close.length;
    const openLen: number = open.length;
    const list: string[] = [];
    let pos: number = 0; // 3

    while (pos < strLen - closeLen) {
      let start: number = str.indexOf(open, pos); // 4

      if (start < 0) {
        // 5
        break;
      }

      start += openLen;

      const end: number = str.indexOf(close, start); // 6

      if (end < 0) {
        // 7
        break;
      }

      list.push(str.substring(start, end)); // 8
      pos = end + closeLen; // 9
    }

    if (list.length === 0) {
      // 10
      return null;
    }

    return list;
  }
}
```

1. 조건 불만족시 `null`을 반환한다.
2. 빈 문자열이면 `[]`를 반환한다.
3. 문자열에서 검색중인 위치를 나타내는 포인터
4. 다음 `open` 태그 위치를 찾는다.
5. `open`가 더이상 없으면 반복문을 종료한다.
6. `end` 태그의 위치를 찾는다.
7. `end`가 더이상 없으면 반복문을 종료한다.
8. `open`과 `end` 사이 문자열을 얻어온다.
9. 포인터의 위치를 방금 찾은 `end` 바로 뒤로 바꾼다.
10. 부분 문자열이 없을시 `null`을 반환한다.

이제 첫번째 구현을 완료하였으니 테스트를 작성하자. **명세 테스트** 와 **경계 테스트**를 작성할 순간이다. 이 메서드의 정상 동작을 판단하는 가장 좋은 방법은 가능한 모든 입출력 조합을 테스트하는 것이다. 하지만 완벽한 테스트는 불가능하므로 우리는 실용적인 테스트를 작성해야한다.

## 요구사항 입출력을 이해하기

요구사항은 되게 세 부분으로 이루어져 있다.

1. 프로그램 또는 메소드는 무엇을 수행하는가.
2. 프로그램이 받는 입력 데이터는 어떠한가.
3. 프로그램 입력을 어떻게 출력으로 변환 하는가.

이에 대한 추론은 다음과 같다.

1. 이 메서드의 목표는 문자에서 `open`과 `close` 태그로 구분된 모든 부분 문자를 모은다.
2. 프로그램은 세 종류의 매개변수를 받는다

- `str`: 추출 대상 문자열
- `open`: 부분 문자열의 시작
- `close`: 부분 문자열의 끝

3. 프로그램은 찾아낸은 모든 문자열을 배열로 반환한다

## 여러 입력값의 수행을 탐색하기.

메서드가 수행하는 작업을 탐색 하면 메서드를 잘 이해할 수 있다.

프로그램이 잘 돌아가는 케이스를 보면 `str` 은 `"abcd"`, `open`은 `a`, `close`는 `d`를 받는다. 반환 값은 `["bc"]`가 될 것이라 기대한다.

```ts
it('간단한 입력', () => {
  expect(StringUtils.substringsBetween('abcd', 'a', 'd')).toEqual(['bc']);
});
```

단위 테스트의 수행 결과가 올바르게 반환하는 것을 확인했다.

다음으로 부분 문자열을 좀 더 많이 넣어보자. `str` 은 `"abcdabcdab"`, `open`은 `a`, `close`는 `d`를 받는다. 반환 값은 `["bc", "bc"]`가 될 것이라 기대한다.

```ts
it('여러개의 입력.', () => {
  expect(StringUtils.substringsBetween('abcdabcdab', 'a', 'd')).toEqual(['bc', 'bc']);
});
```

이번에도 단위 테스트는 정상적으로 통과되었다.

이번엔 `open`, `close` 태그를 긴 문자열로 해도 동일하게 동작하는지 확인해보자. `str` 은 `"aabcddaabfddaab"`, `open`은 `aa`, `close`는 `bb`를 받는다. 반환 값은 `["bc", "bf"]`가 될 것이라 기대한다.

```ts
it('1글자보다 긴 open close 태그', () => {
  expect(StringUtils.substringsBetween('aabcddaabfddaab', 'aa', 'dd')).toEqual(['bc', 'bf']);
});
```

마찬가지로 단위 테스트는 정상적으로 통과되었다.
이렇게 프로그램의 동작에 대한 명확한 이미지를 가지게 되면 탐색을 중단한다.

## 테스트 가능한 입출력 구획을 탐색하기

프로그램에 정확성을 확신 할 수 있도록 입출력에 우선순위를 매기고 그 일부를 선택해야 한다. 프로그램에 대해 가능한 입력과 출력은 사실상 무한대지만 일부 입력 집합에 대해 관계 없이 동일한 방식으로 동작한다.

테스트 의 구획을 특별 했으면 이 프로세스를 반복 적용해서 프로그램이 다르게 동작 하는 다른 부류를 찾을 것이다. 이런 탐색을 체계적으로 하는 방법은 다음과 같이 생각하는것이다.

1. 각각의 입력에 대해 내가 전달하는 입력이 어떤 부류인지 생각한다.
2. 각 입력과 다른 입력의 조합에 대해 생각한다.
3. 이 프로그램에서 기대하는 여러 부류의 출력에 대해 생각한다.

우선 개별 입력으로 시작을 해 보자.

#### `str`

`str`은 어떠한 문자이라도 가능하다. 명세에는 `null`과 빈 문자열이 있을 경우에 대해 언급한다. 따라서 우리는 문자열의 길이에 대해 집중해 보도록 하자.

- `null`
- 빈 문자열
- 길이가 `1`인 문자열
- 길이가 `1`보다 큰 문자열

#### `open`

역시나 어떤 것이든 될 수 있다. `null`가 빈 문자열로 시도해 볼 것이다. 또한 마찬가지로 문자열의 길이에 대해 집중하자.

- `null`
- 빈 문자열
- 길이가 `1`인 문자열
- 길이가 `1`보다 큰 문자열

#### `close`

이전 매개변수와 동일 하다.

- `null`
- 빈 문자열
- 길이가 `1`인 문자열
- 길이가 `1`보다 큰 문자열

마지막으로 출력에 대해 생각하자. 이 매서드는 부분 문자열 베열을 반환한다. 이에 따라 여러 다른 출력 집합을 생각할 수 있다.

#### 문자열 배열

- `null`
- 빈 문자열 배열
- 요소가 하나인 경우
- 요소가 여러개인 경우

#### 개별 문자열

- 빈 문자열 배열
- 문자가 하나인 경우
- 문자가 여러개인 경우

출력 결과를 고민 하다 보면은 복잡한 프로그램의 경우 이전에 보지 못했던 입력 케이스를 찾을 수 있다.

## 경계 분석하기

소프트웨어에서 버그는 입력 도메인의 경계에서 대부분 발생한다.

구획을 설계 할 때 한 구획은 다른 구획과 **가까운 경계**를 지닌다. 프로그래머가 경계 근처에 발생 하는 버그를 만들 확률은 다른 입력값을에 비해 더 크다. 경계를 발견할 때마다 경계를 이동시키며 프로그램에 어떤 일이 일어나는지 테스트 한다. 두가지를 테스트 해야 하는데 하나는 **경계 위의 접점**에 대한 테스트이고 하나는 **경계 밖에서 가장 가까운 접점**. 즉 **거점** 대한 테스트이다.

우리는 이번 테스트에서 경계를 식별하며 두 개의 테스트를 고안할 수 있다.

- `str`이 `open`과 `close`를 모두 포함하고 그 사이에 문자가 **없는** 경우.
- `str`이 `open`과 `close`를 모두 포함하고 그 사이에 문자가 **있는** 경우.

우리는 두번째 케이스를 이미 수행했기에 해당 테스트를 제할 수 있다.

## 테스트 케이스 고안하기

입력, 출력, 경계를 적절하게 해부하였으니 이제 우리는 테스트 케이스를 만들 수 있다. 위에서 나온 경우의 수를 모두 조합하면 `4 * 4 * 4 * 5 = 320`, 즉 320개의 테스트가 나오므로 우리는 이 중에서 구획에 대한 실용성을 생각해야 한다. 즉, 우리는 **관련성이 떨어지는 테스트 케이스들로만 테스트를 구축** 하여야 한다.

먼저 예외 케이스는 다음과 같다.

- T1: `str`이 `null`인 경우
- T2: `str`이 빈 문자열인 경우
- T3: `open`이 `null`인 경우우
- T4: `open`이 빈 문자열인 경우우
- T5: `close`가 `null`인 경우
- T6: `close`가 빈 문자열인 경우

다음으로 `str`의 길이가 `1`인 경우는 다음과 같다.

- T7: `str`에 문자가 하나면서 `open`과 일치하는 경우
- T8: `str`에 문자가 하나면서 `close`와 일치하는 경우
- T9: `str`에 문자가 하나면서 `open`, `close`와 모두 일치하는 경우
- T10: `str`에 문자가 하나면서 `open`, `close`와 모두 일치하지 않는 경우

다음으로 `str`의 길이가 `1`보다 크고 `open`과 `close`의 길이가 `1`인 경우는 다음과 같다.

- T11: `str`이 `open`, `close`를 모두 포함하지 않는 경우
- T12: `str`이 `open`만 포함하는 경우
- T13: `str`이 `close`만 포함하는 경우
- T14: `str`이 `open`, `close`를 모두 포함하는 경우
- T15: `str`이 `open`, `close`를 모두 여러번 포함하는 경우

다음으로 `str`의 길이가 `1`보다 크고 `open`과 `close`의 길이가 `1`보다 큰 경우는 다음과 같다.

- T11: `str`이 `open`, `close`를 모두 포함하지 않는 경우
- T12: `str`이 `open`만 포함하는 경우
- T13: `str`이 `close`만 포함하는 경우
- T14: `str`이 `open`, `close`를 모두 포함하는 경우
- T15: `str`이 `open`, `close`를 모두 여러번 포함하는 경우

마지막으로 경계 테스트는 다음과 같다.

- T21: `str`이 `open`, `close`를 모두 포함하지만 그 사이 문자가 없는 경우

## 테스트 케이스 자동화하기

이제 테스트를 자동화 할 차례다.

**예외 케이스**

```ts
it('str이 null이거나 빈 문자열', () => {
  expect(substringsBetween(null, 'a', 'b')).toBeNull(); // T1
  expect(substringsBetween('', 'a', 'b')).toEqual([]); // T2
});

it('open이 null이거나 빈 문자열', () => {
  expect(substringsBetween('abc', null, 'b')).toBeNull(); // T3
  expect(substringsBetween('abc', '', 'b')).toBeNull(); // T4
});

it('close가 null이거나 빈 문자열', () => {
  expect(substringsBetween('abc', 'a', null)).toBeNull(); // T5
  expect(substringsBetween('abc', 'a', '')).toBeNull(); // T6
});
```

**`str` 길이가 `1`인 경우**

```ts
it('str 길이가 1인 경우', () => {
  expect(substringsBetween('a', 'a', 'b')).toBeNull(); // T7
  expect(substringsBetween('a', 'b', 'a')).toBeNull(); // T8
  expect(substringsBetween('a', 'b', 'b')).toBeNull(); // T9
  expect(substringsBetween('a', 'a', 'a')).toBeNull(); // T10
});
```

**`open`, `close` 길이가 `1`인 경우**

```ts
it('open, close 길이가 1인 경우', () => {
  expect(substringsBetween('abc', 'x', 'y')).toBeNull(); // T11
  expect(substringsBetween('abc', 'a', 'y')).toBeNull(); // T12
  expect(substringsBetween('abc', 'x', 'c')).toBeNull(); // T13
  expect(substringsBetween('abc', 'a', 'c')).toEqual(['b']); // T14
  expect(substringsBetween('abcabc', 'a', 'c')).toEqual(['b', 'b']); // T15
});
```

**`open`, `close` 길이가 다양한 경우**

```ts
it('open, close 길이가 여러가지인 경우', () => {
  expect(substringsBetween('aabcc', 'xx', 'yy')).toBeNull(); // T16
  expect(substringsBetween('aabcc', 'aa', 'yy')).toBeNull(); // T17
  expect(substringsBetween('aabcc', 'xx', 'cc')).toBeNull(); // T18
  expect(substringsBetween('aabbcc', 'aa', 'cc')).toEqual(['bb']); // T19
  expect(substringsBetween('aabbccaaeecc', 'aa', 'cc')).toEqual(['bb', 'ee']); // T20
});
```

**경계 테스트**

```ts
it('중간에 문자열이 없는 경우', () => {
  expect(substringsBetween('aabb', 'aa', 'bb')).toEqual(['']); // T21
});
```

**테스트 스위트 강화하기**

경우의 수에 따른 명세 테스트 작성을 완료하였다. 이제 우리는 테스트를 강화할 시간이다. 이전 테스트 코드를 다시 읽어보니 공백에 대한 테스트를 진행하지 않았다는 것을 깨달았고, T15와 T20을 기반으로 추가적인 테스트를 작성하여 테스트 스위트를 강화한다.

````ts
expect(substringsBetween('abcabyt byrc', 'a', 'c')).toEqual(['b', 'byt byr']); // T15
expect(substringsBetween('a abb ddc ca abbcc', 'a a', 'c c')).toEqual(['bb dd']); // T20```
````

# 명세 기반 테스트의 단계

1. **요구사항의 이해**

   테스트하려는 대상에 대한 전반적인 고찰이 필요하다. 프로그램이 무엇을 수행할지, 수행하지 않을지, 어떤 코너 케이스와 입출력을 다룰지에 대해 이해해야 한다.

2. **프로그램 탐색하기**

   만약 프로그램을 직접 작성하지 않았다면, 프로그램에 다양한 입력값을 넣어서 내가 생각하는 모델이 실제 프로그램과 일치하는지 확신이 들때까지 반복하다.

3. **가능한 입출력을 살펴보고 구획을 식별하기**

   올바른 구획을 식별하는 것이 테스트에서 가장 어려운 단계이다. 입력 변수를 개별적으로 살펴보고, 변수 간의 상호작용을 찾고, 출력값을 해부하자.

4. **경계 식별하기**

   버그는 경계를 좋아하니 경계를 식별하여 이전 단계에서 고안한 구획의 경계를 분석해 버그를 찾아내자.

5. **구획과 경계를 기반으로 테스트 케이스 고안하기**

   모든 구획을 조합하지 않고, 효율적이고 체계적인 조합으로 이루어진 테스트 케이스를 고안하자.

6. **테스트 케이스 자동화하기**

   테스트 케이스는 자동화 되었을때 의미가 있다. 테스트 코드의 중복을 줄이고 실패에 대한 식별을 자동화하자. _(작성자는 javascript는 vitest와 jest 추천)_

7. **테스트 강화하기**

   최종 점검을 통해 경험과 창의성으로 놓친 케이스를 생각해내며 테스트를 강화하자.

# 현업에서의 명세 테스트

## 프로세스는 반복적이어야한다.

명세 테스트의 단계는 순차적으로 이루어지는게 아닌 여러 단계를 왓다 갔다하며 반복적인 작업을 통해 테스트 케이스를 업그레이드 해야 한다.

## 명세 테스트는 어디까지 해야하는가?

이 질문에 대한 대답은 도메인의 실패의 위험성을 이해해야 한다는 것이다. 도메인이 실패했을 때의 위험성이 클수록 테스트에 투자하고 더 많은 코너 케이스를 탐색해야한다. 필자는 모든 단계를 몇번 거치고도 테스트 케이스를 찾지 못할 때 테스트를 중단한다.

## 접점, 거점 외의 케이스도 추가하자

구획에 기반한 테스트 케이스를 작성할 때, 접점과 거점 뿐만이 아닌 그 이외의 중복 테스트를 일부 넣으므로써 해당 프로그램에 대한 이해도와 실제 입력을 추가하는 것은 괜찮다.

## 무엇을 입력해야할지 모르겠다면 간단한 입력을 넣자

복잡한 입력을 사용해야하는 충분한 이유가 없다면 이를 선택하지 않는 것이 좋다. 작은 정수값이 가능하다면 작은 정수값, 짧은 문자열이 가능하다면 짧은 문자열을 통해 테스트하자. 단순함이 중요하다.

## 동일한 스켈레톤의 경우 파라미터 테스트를 사용하자.

테스트 코드도 코드다. 중복이 발생하는 경우 매개변수 테스트 _(jest의 경우 each)_ 를 사용하여 코드의 중복을 줄이자.

## 클래스의 상태에 대해 어떻게 동작하는가?

이 장에서 테스트한 메서드의 경우는 상태가 없다. 따라서 입력과 출력만 생각하면 되지만, 객체 지향에서는 클래스는 상태를 가진다. 쇼핑 카드 도메인에 대한 코드를 기반으로 생각해보자.

```ts
export class CartItem {
  public constructor(
    public name: string,
    public price: number,
    public quantity: number,
  ) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

export class ShoppingCart {
  private items: CartItem[] = [];

  public add(item: CartItem): void {
    this.items.push(item);
  }

  public totalPrice(): number {
    let totalPrice: number = 0;
    for (const item of this.items) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }
}
```

이때 테스트 코드는 다음과 같다.

```ts
describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test('아이템이 없는 경우', () => {
    expect(cart.totalPrice()).toEqual(0);
  });

  test('아이템이 있는 경우', () => {
    cart.add(new CartItem('TV', 1, 120));
    expect(cart.totalPrice()).toEqual(120);

    cart.add(new CartItem('Chocolate', 2, 2.5));
    expect(cart.totalPrice()).toEqual(120 + 2.5 * 2);
  });
});
```

위 테스트 코드는 아직 명세 기반 테스트의 단계를 거치지 않았다. 하지만 테스트의 메서드를 호출하기 전에 클래스의 상태를 설정하여 테스트를 작성하여야 한다.

> _🤔 작성자의 생각_ <br>해당 코드를 클래스가 아닌 리액트의 컴포넌트로 치환한다면 `userEvent`를 통한 컴포넌트 로컬 `state` 접근이나 `mocking`을 통한 전역 상태 부여로 대입하는 것이 가장 근접할 것 같은 느낌이다.

# 관련 repositories

- [original code (java)](https://github.com/effective-software-testing/code/blob/main/ch2)
- [typescript ver.](https://github.com/cobocho/effective-software-testing-typescript/tree/main/ch02)
