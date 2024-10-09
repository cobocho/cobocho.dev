---
title: '이펙티브 소프트웨어 테스팅 with Typescript -효율적이고 체계적인 소프트웨어 테스트-'
description: '테스트의 중요성과 테스트 단위'
date: '2024/05/10'
tags: ['테스트', 'jest', '테스트 피라미드']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

# 테스트를 하는 개발자와 하지 않는 개발자

언젠가 우리가 애자일 소프트웨어 관리 시스템을 만든다고 생각해보자. 현재 남은 마지막 기능은 [플래닝 포커](https://ko.wikipedia.org/wiki/%ED%94%8C%EB%9E%98%EB%8B%9D_%ED%8F%AC%EC%BB%A4)가 남아있다. 이제 우리는 해당 기능의 메서드를 구현해야 한다. 구현할 메서드는 다음과 같다.

**메서드: `identifyExtremes`**

이 메서드는 개발자와 추정값으로 이루어진 추정`Estimate` 목록을 받아서 양극단의 추정값을 제시한 두 개발자를 반환해야한다.

- 입력: `Estimate` 목록. 각 항목은 개발자의 이름과 추정값을 포합한다.
- 출력: `String` 목록. 가장 낮은 추정값과 높은 추정값을 제시한 개발자의 이름을 포함한다.

이름 초안으로 구현하였을 때는 다음과 같다.

```ts
class Estimate {
  public constructor(
    public developer: string,
    public estimate: number,
  ) {
    this.developer = developer;
    this.estimate = estimate;
  }
}

export class PlanningPoker {
  public identifyExtremes(estimates: Estimate[]): string[] {
    let lowestEstimate: Estimate | null = null;
    let highestEstimate: Estimate | null = null;

    for (const estimate of estimates) {
      if (!highestEstimate || estimate.estimate > highestEstimate.estimate) {
        highestEstimate = estimate;
      } else if (!lowestEstimate || estimate.estimate < lowestEstimate.estimate) {
        lowestEstimate = estimate;
      }
    }

    return [lowestEstimate!.developer, highestEstimate!.developer];
  }
}
```

1. 가장 낮은 예측치와 높은 예측치를 저장할 변수를 선언한다.
2. 현재 예측치가 지금까지 가장 높은 예측치라면 `highestEstimate`를 교체한다.
3. 현재 예측치가 지금까지 가장 낮은 예측치라면 `lowestEstimate`를 교체한다.
4. 양극단의 예측치를 제시한 개발자를 반환한다.

## 테스트를 하지 않는 경우

이때 만약 테스트를 작성하지 않고 애플리케이션에 직접 입력값을 넣었다고 가정하자.

```bash
테드: 16
바니: 8
릴리: 2
로빈: 4

result: "릴리"와 "테드"가 이유를 설명합니다.
```

코드가 정상 작동되는 것을 확인한 후 해당 코드를 배포하였으나 곧 프로그램에 문제가 있다는 피드백을 받았다.
이후 로그를 확인해보고 실패하는 케이스를 인지하였다.

```bash
테드: 2
바니: 4
릴리: 8
로빈: 16

result: ERROR!!
```

위와 같은 상황에서는 `null`에 대한 예외 처리가 이루어지지 않아 에러가 발생하게 된다.

이후 해당 코드에 버그를 수정한다.

```ts
for (const estimate of estimates) {
  if (!highestEstimate || estimate.estimate > highestEstimate.estimate) {
    highestEstimate = estimate;
  }
  if (!lowestEstimate || estimate.estimate < lowestEstimate.estimate) {
    lowestEstimate = estimate;
  }
}
```

수정한 코드의 내용은 반복문 내의 `else if`를 `if`로 수정하였다.

### 테스트 코드가 없을 경우의 문제점

프로그래머 또한 **사람이기에 언제나 실수를 저지른다.** 수동 테스트를 통해 숨낳은 테스트를 직접 진행하기엔 너무 많은 시간이 필요하게 된다. 이렇게 직감을 따르는 테스트는 **코너 케이스** 를 빼먹을 가능성이 존제한다.

## 테스트를 진행하는 경우

우선 `identifyExtremes` 메서드가 무엇을 수행할지 생각하자. 먼저, 이 메서드의 입력인 `Estimate` 목록에 집중한다.

처음으로 세가지 케이스(`null`, `empty`, `한 요소를 가진 목록`)을 반영하여 유효성 검사를 추가한다.

```ts
export class IllegalArgumentException extends Error {}

// ...
if (!estimates) {
  throw new IllegalArgumentException("Estimates can't be null");
}
if (estimates.length <= 1) {
  throw new IllegalArgumentException('There has to be more than 1 estimate in the list');
}
```

우리는 이 코드가 잘못된 입력값을 올바르게 처리한다고 확신하지만 테스트를 형식화하여 자동화된 테스트를 통해 프로그램이 리팩토링으로 인해 퇴행하지 않도록 해준다.

```ts
it('null 입력을 거부한다.', () => {
  expect(() => planningPoker.identifyExtremes(null)).toThrow(IllegalArgumentException);
});

it('빈 입력을 거부한다.', () => {
  const emptyList: Estimate[] = [];
  expect(() => planningPoker.identifyExtremes(emptyList)).toThrow(IllegalArgumentException);
});

it('요소가 하나인 입력을 거부한다.', () => {
  const list: Estimate[] = [new Estimate('Eleanor', 1)];
  expect(() => planningPoker.identifyExtremes(list)).toThrow(IllegalArgumentException);
});
```

세가지 테스트 코드는 모두 같은 구조를 지닌다. 잘못된 입력을 준 후 `IllegalArgumentException` 에러를 반환하는지 확인한다.

유효하지 않은 입력을 테스트하였으니 이제 **정상 동작** 을 테스트 할 시간이다. 우리는 **버그가 경계를 좋아한다** 는 것을 명심하고 테스트 코드를 작성한다.

```ts
it('두개의 추정', () => {
  const list: Estimate[] = [new Estimate('Mauricio', 10), new Estimate('Frank', 5)];

  const devs: string[] = planningPoker.identifyExtremes(list);

  expect(devs).toEqual(expect.arrayContaining(['Mauricio', 'Frank']));
});

it('여러개의 추정', () => {
  const list: Estimate[] = [
    new Estimate('Mauricio', 10),
    new Estimate('Arie', 5),
    new Estimate('Frank', 7),
  ];

  const devs: string[] = planningPoker.identifyExtremes(list);

  expect(devs).toEqual(expect.arrayContaining(['Mauricio', 'Arie']));
});
```

위 테스트 코드는 정상적으로 통과한다. _하지만 아직 우리가 **else if를 통한 에러** 가 존재한다는 것을 모르는 걸 인지하자._

우리는 목록이 입력으로 주어질때 요소의 순서가 알고리즘에 영향을 줄 수 있다는 점을 알고 있다. 따라서 우리는 임의의 순서로 된 목록을 전달하는 **예시 기반 테스트(가능한 입력 중에서 하나의 특정 입력만 골라서 하는 테스트)** 가 아닌 **속성 기반 테스트** 를 진행한다.

```ts
it('랜덤 추정', () => {
  function shuffle(array: unknown[]) {
    array.sort(() => Math.random() - 0.5);
  }

  function generateEstimate() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      name += alphabet[randomIndex];
    }

    const value = Math.floor(Math.random() * (99 - 2 + 1)) + 2;

    return new Estimate(name, value);
  }

  const list: Estimate[] = [new Estimate('최저 추정', 1), new Estimate('최대 추정', 100)];

  for (let i = 0; i < 50; i++) {
    list.push(generateEstimate());
  }

  shuffle(list);

  const devs: string[] = planningPoker.identifyExtremes(list);

  expect(devs).toEqual(expect.arrayContaining(['최저 추정', '최대 추정']));
});
```

속성 기반 테스트에서는 특정 속성에 대한 단언을 목표호 한다. 최고와 최저 값을 가진 요소를 생성한 후 임의의 값을 가지는 요소들을 추가해준다. 임의의 값들이 추가된다 하더라도 패턴에 의하여 항상 동일한 값을 반환하게 되므로 엣지 케이스에 대한 검증을 이룰 수 있다. 이 과정을 통해 우리는 `else if`로 인한 에러를 발견할 수 있게된다.

속성 기반 테스트는 같은 테스트를 수행할 때마다 항상 임의의 조합을 사용하게 되므로 만약 테스트가 깨졌을 때 해당 값을 통해 코드의 문제점을 찾을 수 있다.

이후 우리는 `여러개의 추정` 테스트가 속성 기반 테스트로 인해 중복되므로 삭제하기로 한다.

다음으로는 중복된 요소에 대한 케이스를 생각해냈다. 우리는 이 경우가 중복된 개발자 중 처음 나타나는 개발자를 반환하도록 구현하기로 계획한다. 하지만 우리는 이미 해당 코드가 그렇게 동작한다는 것을 알고 있다. 그래도 우리는 테스트에서 그 점을 형식화하기로 한다.

```ts
it('중복이 존재하는 추정', () => {
  const list: Estimate[] = [
    new Estimate('Mauricio', 10),
    new Estimate('Arie', 5),
    new Estimate('Andy', 10),
    new Estimate('Frank', 7),
    new Estimate('Annibale', 5),
  ];

  const devs: string[] = planningPoker.identifyExtremes(list);

  expect(devs).toEqual(expect.arrayContaining(['Mauricio', 'Arie']));
});
```

위 테스트 코드는 직관적으로 중복된 추정에 대한 예시값을 예상할 수 있게 해준다.

마지막으로 우린 모두 추정값이 같은 목록에 대한 코너 케이스를 생각한다. 이후 우리는 해당 케이스의 경우 빈 배열을 반환하도록 설계한다.

```ts
public identifyExtremes(estimates: Estimate[] | null): string[] {
  if (!estimates) {
    throw new IllegalArgumentException("Estimates can't be null")
  }
  if (estimates.length <= 1) {
    throw new IllegalArgumentException(
      'There has to be more than 1 estimate in the list',
    )
  }
  let lowestEstimate: Estimate | null = null
  let highestEstimate: Estimate | null = null
  for (const estimate of estimates) {
    if (!highestEstimate || estimate.estimate > highestEstimate.estimate) {
      highestEstimate = estimate
    }
    if (!lowestEstimate || estimate.estimate < lowestEstimate.estimate) {
      lowestEstimate = estimate
    }
  }
  if (
    !lowestEstimate ||
    !highestEstimate ||
    lowestEstimate === highestEstimate
  ) {
    return []
  } // 1
  return [lowestEstimate.developer, highestEstimate.developer]
}
```

1. 만약 최저 추정 객체와 최대 추정 객체가 같다면 모든 추정값이 같으므로 빈 배열을 반환한다.

그리고 해당 코드에 대한 테스트 코드를 작성한다.

```ts
it('allDevelopersWithTheSameEstimate', () => {
  const list: Estimate[] = [
    new Estimate('Mauricio', 10),
    new Estimate('Arie', 10),
    new Estimate('Andy', 10),
    new Estimate('Frank', 10),
    new Estimate('Annibale', 10),
  ];

  const devs: string[] = planningPoker.identifyExtremes(list);

  expect(devs).toEqual([]);
});
```

이후 우리는 에러에 대한 피드백으로부터 자유로울 수 있었다!

# 효율적인 소프트웨어 테스트

앞서 우리는 테스트 코드를 작성하면서 요구사항을 작은 부분으로 나누어 테스트를 작성하는 **도메인 테스트** 기법을 사용하였다. 또한 명세를 완성한 이후 코드에 초점을 맞추고 **구조적 테스트** 를 통해 테스트 케이스가 충분한지 평가 하였고 **예시 기반 테스트** 와 **속성 기반 테스트** 를 통해 코드에서 발견할 수 있는 버그를 찾아냈다.

이것이 바로 **개발자를 위한 효율적이고 체계적인 소프트웨어 테스트** 라 부를 수 있다.

## 개발 과정에서의 효율적인 테스트

효율적인 테스트와 함께하는 개발 흐름은 다음과 같다.

1. 기능 개발은 **요구사항** 을 받는 것으로부터 시작한다. 요구사항을 분석 한 이후 코드를 작성하기 시작한다.

2. 시능 개발을 유도하기 위해 **테스트 주도 개발** 과정을 반복한다. 이 과정에서 개발자는 코드의 타당함에 대한 피드백을 얻으며 리팩토링을 수행한다.

3. 요구사항은 종종 매우 크기에 여러 단위(클래스 or 메서드)를 만들게 된다. 각 단위는 다른 **계약** 을 가지며 서로 어율려 전체 기능을 구성한다. 클래스를 테스트하는 것은 어렵기에 항상 **테스트 가능성** 을 염두에 두고 설계한다.

4. 개발자가 단위와 요구사항을 전부 충족한 이후 도메인 테스트, 경계 테스트, 구조적 테스트 기법으로 각 단위를 테스트한다.

5. 시스템에는 **대규모 테스트** (통합 테스트 or 시스템 테스트)가 필요한 부분이 있다. 개발자는 대규모 테스트를 위해 기존의 테스트 기법을 사용한다.

6. 개발자는 다양한 기법으로 테스트 케이스를 만들고 지능형 테스트 도구를 사용해 케이스를 찾아낸다.

이러한 개발 흐름으로 인해 깨닫는 개념들의 일부는 다음과 같다.

- 테스트와 기능을 분리함으로써 기능을 코딩할 때 코너 케이스를 생각하지 않는다.

- 상용 버전에서의 버그의 비용은 종종 예방하는 비용보다 훨씬 더 크다.

- 테스트를 설계하는 것과 실행하는 것을 명확히 구분하자.

- 완벽한 테스트는 불가하다. _(300개의 플래그에 두가지 값이 가능하다면 2의 300승의 케이스가 존재한다.)_ 따라서 우리는 효율적인 테스트가 필요하다.

- 프로그램을 테스트 하는 일은 버그가 존재하지 않다는 것이 아니라 버그가 존재하는지를 보여주는 것을 목표로 한다.

# 테스트 수준

실용적 테스트에 대해 가장 먼저 결정할 사항은 테스트의 **수준** 이다.
테스트는 **단위 테스트, 통합 테스트, 시스템 테스트** 가 존재한다.

## 단위 테스트

시스템의 가장 작은 단위를 테스트 하는 것을 단위 테스트라고 한다.

#### 장점

- 단위 테스트는 빠르다.
- 단위 테스트는 다루기 쉽다.
- 단위 테스트는 작성하기 쉽다.

#### 단점

- 단위 테스트는 현실성이 떨어진다.
- 단위 테스트는 잡을 수 없는 종류의 버그가 존재한다.

## 통합 테스트

통합 테스트는 우리의 코드가 외부 요소 간의 통합을 테스트해야 할 때 사용한다. _ex) SQL, 외부 서버_
통합 테스트는 단위 테스트에 비해 작성하기 어렵다.

## 시스템 테스트

소프트웨어를 더 실질적인 관점에서 바라보고 현실적인 테스트를 수행하여면 전체 소프트 웨어 시스템을 실행해야 한다. 이때 우리는 시스템 테스트를 수행한다. 시스템 테스트는 시스템의 내부가 어떻게 동작하는지는 관심 없이 오로지 입렵에 대한 출력에만 온 관심을 쏟는다.

우리는 이러한 테스트 수준을 적절한 상황에 올바르게 적용해야한다.
