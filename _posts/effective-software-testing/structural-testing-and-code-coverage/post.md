---
title: '이펙티브 소프트웨어 테스팅 with Typescript -구조적 테스트와 코드 커버리지-'
description: '커버리지를 통해 테스트 강화하기'
date: '2024/05/14'
tags: ['테스트', 'jest', '구조적 테스트', '코드 커버리지']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

# 구조적 테스트란?

구조적 테스트란 소스 코드의 구조를 사용하여 테스트를 도출하는 것을 의미한다. 이는 커버리지 기준을 통해서 운용된다.

## 코드 커버리지

문자열에서 `r`에서 `s`로 끝나는 단어의 수를 세는 프로그램이 있다.

```ts
export class CountWords {
  public count(str: string): number {
    let words: number = 0;
    let last: string = ' ';

    for (let i = 0; i < str.length; i++) {
      if (!this.isLetter(str.charAt(i)) && (last === 's' || last === 'r')) {
        words++;
      }

      last = str.charAt(i);
    }

    if (last === 'r' || last === 's') {
      words++;
    }

    return words;
  }

  private isLetter(char: string): boolean {
    return /^[a-zA-Z]$/.test(char);
  }
}
```

요구사항은 다음과 같다.

- 주어진 문장에서 `s` 또는 `r`로 끝나는 단어의 수를 센다.

이때 불완전한 첫번째 테스트 코드는 다음과 같다.

```ts
describe('CountWords', () => {
  let counter: CountWords;

  beforeEach(() => {
    counter = new CountWords();
  });

  it('s로 끝나는 단어 두가지', () => {
    const words = counter.count('dogs cats');
    expect(words).toBe(2);
  });

  it('단어가 없는 경우', () => {
    const words = counter.count('dog cat');
    expect(words).toBe(0);
  });
});
```

이 테스트는 불완전하다. 예를 들어 아직 `r`로 끝나는 단어를 테스트 하지 않는다. 구조적 테스트는 각 경우에서의 값을 드러낸다. 즉 테스트 스위트가 수행하지 않는 코드를 찾아서 새로운 테스트의 생성 여부를 정한다.

jest 내부의 코드 커버리지 시스템을 사용하면 코드가 어느 부분을 수행하지 않았는지 알 수 있다.

```bash
---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------|---------|----------|---------|---------|-------------------
All files      |   92.85 |    83.33 |     100 |    92.3 |
 countWords.ts |   92.85 |    83.33 |     100 |    92.3 | 15
---------------|---------|----------|---------|---------|-------------------
```

![majestic 라이브러리를 통한 테스트 보고서, (vitest는 vitest/ui를 사용하자)](1.png)

코드 커버리지의 결과를 통해 테스트를 실행하며 수행되지 않은 코드를 확인할 수 있다. 우리가 예상한 것과 같이 `r`로 끝나는 케이스가 존재하지 않아 해당 코드가 실행되지 않은 것을 확인 할 수 있다.

```ts
it('r로 끝나는 단어 두가지', () => {
  const words = counter.count('car bar');
  expect(words).toBe(2);
});
```

![업데이트된 코드 커버리지](2.png)

이후 해당 케이스에 대한 테스트를 추가하면 커버리지가 업데이트 된 것을 볼 수 있다.

# 구조적 테스트 살펴보기

구조적 테스트의 방법은 다음과 같다.

1. **명세 기반 테스트**를 수행한다.
2. 구현사항을 읽고, 개발자의 주요 결정사항을 이해한다.
3. 테스트 케이스를 커버리지 도구로 수행한다.
4. 테스트가 수행되지 않은 코드에 대해

- 왜 해당 콛드가 수행되지 않았는지 이해한다.
- 그 코드가 테스트할 가치가 있는지 결정한다.
- 테스트가 필요하다면 놓친 케이스에 대한 자동화된 케이스를 구현하자.

5. 소스코드를 바탕으로 고안항ㄹ만한 다른 케이스가 있는지 찾아보고, 4번째 단계를 반복한다.

가장 중요한 점은 구조적 테스트가 **명세 기반 테스트 스위트**를 보강한다는 것이다.

# 코드 커버리지 기준

수행되지 않은 코드를 찾을때 얼마나 엄격해야할지 결정해야한다.

```ts
if (!this.isLetter(str.charAt(i)) && (last === 's' || last === 'r'))
```

총 4명의 개발자가 있으며 각각 다음과 같은 기준을 가지고 있다.

- 1번 개발자: 해당 줄을 **수행**만 하도록 할 수 있다. 즉 `if`를 통과하기만 하면 그 줄이 수행됐다고 여기는 것이다.
- 2번 개발자: **`if`문이 평가되는 경우**를 수행의 기준으로 삼을 수도 있다. 이 때는 2개의 테스트가 필요하다.
- 3번 개발자: **`if`문 내부의 각 조건을 모두** 찾아내려고 한다. 이 경우는 각 조건마다 2개의 경우, 총 6개가 된다.
- 4번 개발자: **문장이 수행하는 모든 경로**를 수행하고자 한다. 이 경우는 `2 * 2 * 2 = 8`, 총 8개가 된다.

## 코드 줄 커버리지

1번 개발자는 코드 줄 커버리지를 수행한다. 해당 줄에 조건이 가득한 `if`문이 존재해도 상관없이 `if`문에 접근하는 순간 수행했다고 계산한다.

즉 다음의 경우의 수가 존재한다.

- `if (!this.isLetter(str.charAt(i)) && (last === 's' || last === 'r'))`를 통과하는 경우

## 분기 커버리지

2번 개발자는 분기 커버리지를 수행한다. 해당 줄에 조건의 평가 여부에 따라 커버리지를 고려한다. 즉 `if`문의 경우 조건에 상관없이 `true`, `false`에 따라서만 계산한다.

즉 다음의 경우의 수가 존재한다.

- `if (!this.isLetter(str.charAt(i)) && (last === 's' || last === 'r'))`가 `true`인 경우
- `if (!this.isLetter(str.charAt(i)) && (last === 's' || last === 'r'))`가 `false`인 경우

## 조건 + 분기 커버리지

3번 개발자는 조건 + 분기 커버리지를 수행한다. 이 경우는 분기문 마다의 각 조건을 고려한다. 이때는 각 분기마다의 `true`, `false`에 따라서 계산한다.

- `!this.isLetter(str.charAt(i))`가 `true`인 경우
- `!this.isLetter(str.charAt(i))`가 `false`인 경우
- `last === 's'`가 `true`인 경우
- `last === 's'`가 `false`인 경우
- `last === 'r'`가 `true`인 경우
- `last === 'r'`가 `false`인 경우

## 경로 커버리지

3번 개발자는 경로 커버리지를 수행한다. 이 경우는 가능한 모든 실행 경로를 수행한다.

- `!this.isLetter(str.charAt(i)) === true`, `last === 's' === false`, `last === 'r' === false`인 경우
- `!this.isLetter(str.charAt(i)) === true`, `last === 's' === true`, `last === 'r' === false`인 경우
- `!this.isLetter(str.charAt(i)) === true`, `last === 's' === false`, `last === 'r' === true`인 경우
- `!this.isLetter(str.charAt(i)) === true`, `last === 's' === true`, `last === 'r' === true`인 경우
- `!this.isLetter(str.charAt(i)) === false`, `last === 's' === false`, `last === 'r' === false`인 경우
- `!this.isLetter(str.charAt(i)) === false`, `last === 's' === true`, `last === 'r' === false`인 경우
- `!this.isLetter(str.charAt(i)) === false`, `last === 's' === false`, `last === 'r' === true`인 경우
- `!this.isLetter(str.charAt(i)) === false`, `last === 's' === true`, `last === 'r' === true`인 경우

이는 이상적으로 가장 강력한 시나리오지만, 종종 불가능하거나, 너무 비용이 많이 든다. 현재 코드에서는 `2^3`인 8개지만 플래그가 10개인 경우 총 **1024**개의 테스트 케이스가 나온다.

# 복잡한 조건과 MC/DC 커버리지 기준

복잡하고 긴 조건문에 대해 수정된 **조건/의사결정 커버리지** *modified condition/decision coverage, MC/DC*를 통해 테스트에 필요한 중요한 조합을 찾아낸다. MC/DC는 각 조건이 다른 조건과 상관 없이 전체 의사결정에 영향을 미칠 수 있도록 한다.

## 추상적 예제

간단한 예를 들어서 `if (A && (B || C))`문이 있다. 이때 MC/DC는 다음과 같다.

#### `A`의 조건에 대해

- `A = true`인 경우 (T1)
- `A = false`인 경우 (T2)
- (독립 쌍이라고 부르는) T1과 T2는 서로 다른 결과를 내야한다.
- T1의 변수 `B`와 `C`는 T2와 동등해야 한다.

#### `B`의 조건에 대해

- `B = true`인 경우 (T3)
- `B = false`인 경우 (T4)
- T3과 T4는 서로 다른 결과를 내야한다.
- T3의 변수 `A`와 `C`는 T4와 동등해야 한다.

#### `C`의 조건에 대해

- `C = true`인 경우 (T5)
- `C = false`인 경우 (T6)
- T5과 T6는 서로 다른 결과를 내야한다.
- T5의 변수 `A`와 `B`는 T6와 동등해야 한다.

조건이 이진 결과만 있는 경우 MC/DC의 커버리지를 100%로 이루기 위해선 `N + 1`이다. `N`은 결정 조건의 개수이다.

## MC/DC 달성하는 테스트 스위트 작성하기

`CountWords`의 `if`문을 기준으로 작성하면 다음과 같다. 해당 분기문은 세가지 불리언 값을 가진다.

1. 현재 문자가 글자인지
2. 이 글자가 `s`인지
3. 이 글자가 `r`인지

이는 방금전의 `A && (B || C)`와 동일하다.

| 조건 | isLetter | last === 's' | last === 'r' | 의사결정 값 |
| ---- | -------- | ------------ | ------------ | ----------- |
| T1   | true     | true         | true         | true        |
| T2   | true     | true         | false        | true        |
| T3   | true     | false        | true         | true        |
| T4   | true     | false        | false        | false       |
| T5   | false    | true         | true         | false       |
| T6   | false    | true         | false        | false       |
| T7   | false    | false        | true         | false       |
| T8   | false    | false        | false        | false       |

모든 경로 조합의 경우 8개가 나오지만 우리의 목표는 MC/DC 기준으로 `N + 1`만 선택하는 것이다. 이 경우는 4개가 된다. 테스트 케이스를 살펴보면 조합을 따져보자.

#### T1. `isLetter === true`, `last === 's' === true`, `last === 's' === true`인 경우

이 경우 모든 결정 조건은 `true`이며 의사결정 값(최종 결정값)은 `true`이다. 이제 `A`, 즉 `isLetter`가 반대지만 `A, B`, 즉 `last === 's', last === 'r'`이 동일한 케이스를 찾는다. 이는 `T5`와 동일하다.

따라서 케이스 목록에 `{T1, T5}`쌍을 넣는다.

#### T2. `isLetter === true`, `last === 's' === true`, `last === 'r' === false`

`A`, 즉 `isLetter`가 반대지만 `A, B`, 즉 `last === 's', last === 'r'`이 동일한 케이스를 찾는다. 이는 `T6`와 동일하다.

따라서 케이스 목록에 `{T2, T6}`쌍을 넣는다.

#### T3. `isLetter === true`, `last === 's' === true`, `last === 'r' === false`

`A`, 즉 `isLetter`가 반대지만 `A, B`, 즉 `last === 's', last === 'r'`이 동일한 케이스를 찾는다. 이는 `T7`과 동일하다.

따라서 케이스 목록에 `{T3, T7}`쌍을 넣는다.

#### T3. `isLetter === true`, `last === 's' === false`, `last === 'r' === false`

`A`, 즉 `isLetter`가 반대지만 `A, B`, 즉 `last === 's', last === 'r'`이 동일한 케이스를 찾는다. 이는 `T8`과 동일하다.

하지만 이는 의사결정 값이 동일하므로 **전체 결과에 영향을 미치지 않는다.** 따라서 포함시키지 않는다.

이후 `T5, T6, T7, T8`의 경우는 이미 판별되었으므로 체크하지 않는다. 마찬가지로 나머지 매개변수 또한 동일하게 판별하면 다음과 같은 독립 쌍들이 추출된다.

- isLetter: `{1, 5}, {2, 6}, {3, 7}`
- last === 's': `{2, 4}`
- last === 'r': `{3, 4}`

매개변수별로 각 독립 쌍 하나씩만이 필요하다. 따라서 2, 3, 4번의 테스트는 필수적으로 필요하다. 마지막으로 `isLetter`의 경우 테스트 케이스를 최소화 할 수 있는 `{2, 6}` 이나 `{3, 7}` 중에서 선택하면 된다.

# 반복문의 경우

반복문의 경우에는 **반복 경계 적합 기준**을 적용해서 언제 중지할 지 결정한다.

- 반복문이 0번인 케이스
- 반복문이 1번인 케이스
- 반복문이 N번인 케이스

반복문의 테스트를 고안하는 것은 어렵다. 여러번의 테스트를 만드는 것을 두려워하지 말고 반복문이 예상대로 동작하는지 확인하자.

# 구조적 테스트만으로는 충분하지 않다.

구조적 테스트만으로는 충분히 탄탄하지 않을 수 있다.

```ts
export class Clumps {
  public static countClumps(nums: number[]): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    let count: number = 0;
    let prev: number = nums[0];
    let inClump: boolean = false;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === prev && !inClump) {
        inClump = true;
        count += 1;
      }
      if (nums[i] !== prev) {
        prev = nums[i];
        inClump = false;
      }
    }

    return count;
  }
}
```

`countClumps`는 배열 내 덩어리 수를 계산한다. 덩어리란 동일한 요소가 연속해서 2개 이상 나오는 것을 의미한다.
이 코드의 커버리지 100%를 위해 다음과 같은 테스트를 만든다.

1. 빈 배열인 경우
2. 한 덩어리를 이루는 경우
3. 요소가 하나인 경우

테스트 코드는 다음과 같다.

```ts
it.each([
  [[], 0], // empty
  [[1, 2, 2, 2, 1], 1], // one clump
  [[1], 0], // one element
])('countClumps(%p) should return %i', (nums, expectedNoOfClumps) => {
  expect(Clumps.countClumps(nums)).toBe(expectedNoOfClumps);
});
```

이 테스트는 합리적이고 분기 커버리지를 100% 달성하지만 덩어리가 여러개인 케이스가 존재하지 않는다. 추가적으로 덩어리가 마지막 요소인 경우와 첫번째부터 덩어리인 케이스 같이 흥미로운 테스트도 존재하지 않는다. 이처럼 구조적 테스트는 명세에 대한 지식을 더했을때 제 값을 발휘한다.

# 돌연변이 테스트

앞서 말했듯이 커버리지만으로는 테스트 스위트의 푸밎ㄹ을 알 수 없다. 우리는 **돌연변이 테스트**를 통해 버그를 드러내야한다. 돌연변이 테스트란 코드에 일부러 버그를 주입해서 테스트가 깨지는지 검사하여 테스트 스위트의 개선점을 발견하는 것이다. 즉 통과되서는 안되는 테스트가 통과된다면 코드의 문제점을 파악할 수 있게 된다.

# 관련 repositories

- [original code (java)](https://github.com/effective-software-testing/code/blob/main/ch3)
- [typescript ver.](https://github.com/cobocho/effective-software-testing-typescript/tree/main/ch03)
