---
title: '[우아한테크코스 프리코스] 로또의 책임을 찾아서'
description: '메세지 찾아 삼만리'
thumbnail: '/assets/thumnails/woowa-tech/lotto.png'
date: '2023/11/09'
tags: ['우아한테크코스', '프리코스', '객체지향', 'TDD']
---

# 개요

우아한테크코스 프리코스 3주차 미션으로 로또가 나왔다.
이전에도 프리코스를 대비하면서 풀어보기도 했고 넥스트 스텝에서도 진행했던 미션이지만 설계를 할때마다 어떤 설계가 좋을지 고민이 많이되는 기능이다.
프리코스 로또를 진행하며 겪었던 고민들을 오랜만에 블로그에 풀어나가보려 한다.

**[PULL REQUEST URL](https://github.com/woowacourse-precourse/javascript-lotto-6/pull/67)
**

# 도메인 설계

모든 프리코스의 가장 큰 난관은 사실 구현이 아니라 설계에 있다. 설계를 대충하면 그 고통은 오롯이 설계자에게 돌아오는 것이 객체지향의 숙명이다.
그렇다보니 로또를 구현하면서 코드를 작성한 시간보다 도메인을 설계한 시간이 거의 대부분이다. 내가 설계한 도메인 객체들은 다음과 같아.

![](/assets/blog/woowa-tech/lotto/1.png)

- LottoNumber
  - `Lotto`의 번호를 담당합니다.
- Lotto
  - `LottoNumber`를 비교합니다.
- WinningLotto
  - 우승 로또와 보너스를 소유하고 `Lotto`와 비교합니다.
- LottoMachine
  - `Lotto`를 판매합니다.
- LottoReward
  - 로또 경품의 조건과 상금을 소유합니다.
- LottoRewards
  - 등수별 `LottoReward`를 관리하고 결과를 계산합니다.
- Calculator
  - `LottoReward`의 수익률을 계산합니다.

클래스 다이어그램이 지저분하단걸 나도 잘 알기에... 시청각 자료를 동반하면 다음과 같다.

## Lotto, LottoNumber, WinningLotto

![](/assets/blog/woowa-tech/lotto/2.png)

`LottoNumber`는 말 그대로 로또의 숫자이다. `1` 부터 `45` 까지의 숫자만이 생성이 가능하다. 숫자 범위의 유효성 검사의 책임을 가진다.
`LottoNumber`의 경우는 `valueOf` 팩토리 메서드를 통해 인스턴스를 미리 생성하여 메모리상 이점을 누릴 수 있다.

`Lotto`는 `LottoNumber`로 이루어진 배열을 가진다. `LottoNumber` 갯수의 유효성 검사 책임을 가진다.
`Lotto`의 가장 큰 역할은 다른 로또와 비교하여 동일한 숫자 개수를 포함하는지(맞은 숫자)와 입력받은 `LottoNumber`를 소유하였는지(보너스)를 판별한다.

`WinningLotto`의 경우 `Lotto`와 `LottoNumber`의 조합으로서 이루어져있다.
`WinningLotto`는 일종의 채점지와 같아서 입력받은 `Lotto`의 맞은 개수와 보너스 소유 여부를 반환한다.
`Lotto`와는 `is-a` 관계라고 생각되지 않아 상속 대신 조합을 사용하였다.

## LottoMachine

![](/assets/blog/woowa-tech/lotto/3.png)

`LottoMachine`은 간단하다. 로또를 입력 금액만큼 생성한다.
그러므로 입력 금액에 대한 유효성 검사를 책임진다.

## LottoRewards, LottoReward

![](/assets/blog/woowa-tech/lotto/4.png)

이번 도메인 설계에서 가장 신경 쓴 부분 중 하나이다.
`LottoReward`는 맞춘 개수와 보너스에 따라서 본인의 개수를 증가시킨다. 상금 개별 계산의 역할을 가진다.

`LottoRewards`는 `LottoReward`의 상금 테이블과도 같다.
입력받은 `Lotto`들을 `WinningLotto`와 비교하여 `LottoReward`를 업데이트한다.

## Caculator

![](/assets/blog/woowa-tech/lotto/5.png)

`Caculator`는 정말 단순하다.

로또 결광에 대한 수익률을 반환한다.
끝.

# 구현을 하면서 든 고민과 알게된 것들

## 메세지를 전달하라.

![](/assets/blog/woowa-tech/lotto/6.png)

<p style="color:lightgrey">서로 소통을 시도하는 내 코드의 객체들</p>

**메세지를 전달하라.**

객체지향에 대해 알아보다보면 정말 수없이도 듣게되는 말 중에 하나일 것이다.
솔직히 말하자면 메세지를 전달하라기 보단 **"getter setter 좀 막 쓰지 마세요"** 처럼 들리기는 한다.

나같은 경우에는 사실 흥선대원군급 `getter` 반대파는 아니긴 하다. 모든 인스턴스 메서드는 일종의 `getter`와 `setter`라고 보기 때문이다. 물론 무의미한 `setter`는 반대하는 입장이다.

하지만 그래도 메세지를 전달하라는 말만큼 객체지향을 잘 표방하는 문장은 없다고 생각한다. 객체의 역할의 중심에는 **행위**가 존재하기 때문이다. 그렇기에 나같은 경우에도 객체를 설계할때 필드보다는 메서드(행위)를 우선적으로 작성하고 해당 메서드에 대한 필드를 추가하는 편이다. 구현 순서를 뒤집으면 객체를 설계할때 비교적 행위 중심의 객체 관계를 설계하는데 도움이 된다.

그래서 이번 미션의 객체들을 구성하면서 최대한 `getter`를 덜 사용하도록 노력했다. 물론 다 없애지는 못했지만... 최대한 객체마다 역할을 부여해서 무의미한 데이터 저장용 도메인이 생기는 현상을 막으려고 노력했다.

## 에러 핸들링

이번 미션에서 추가된 요구사항 중에 **에러 발생에 따른 재입력 로직의 추가**가 존재하였다.

사실 무한 `try-catch` 를 통해 구현 할 수도 있는 부분이지만 상당히 찝찝함이 많이 남기에...

기존에 넥스트 스텝에서 구현했던 코드를 재사용하였다.

```js
class Controller {
  // ...

  /**
   * 해당 콜백 함수 실행 중 에러가 발생할 시 함수를 다시 시작합니다.
   * @param {Function} action 에러 핸들링 대상이 될 함수입니다.
   */
  async #handleError(action) {
    try {
      await action();
    } catch ({ message }) {
      this.#view.output.error(message);
      await this.#handleError(action);
    }
  }
}
```

`handleError(action)` 내에 에러가 발생 할 가능성이 있는 코드를 콜백으로서 부여받는다.
그렇다면 `try catch` 내에서 입력에 대한 에러를 컨트롤러 레이어에서 감지하게 되고 에러를 출력한 후 해당 로직을 재실행한다.
이렇게 작성한다면 모든 에러 핸들링은 `handleError` 메서드 내에서 실행되게되며 에러 핸들링에 대한 변경에 개방적인 코드를 작성 할 수 있다.

## 집합(Aggregation)과 조합(Composition)

객체에 의존성을 연결하는 방법에는 여러가지가 있다.
그중에 헷갈릴만한 방법이 두 가지가 존재하는데 바로 **조합(Composition)과 집합(Aggregation)**이다.\*\*

두 방식의 클래스 내 구동 방식은 거의 같다. 하지만 약간의 차이가 존재하는데 바로 **객체의 라이프사이클**이다.

집합의 경우 의존성을 가지는 두 객체가 **각각 다른 라이프사이클을 가지게 된다.**

예시를 들어보자. 여기 `Human` 클래스가 존재한다고 가정하자.

```js
class Human {
  constructor(name) {
    this.name = name;
  }
}
```

너무나 부럽게도 이 `Human` 인스턴스가 `Company`에 취직했다고 가정하자.

```js
class Company {
  constructor(worker) {
    this.worker = worker;
  }
}

const human = new Human();

const company  new Company(human)
```

![](/assets/blog/woowa-tech/lotto/7.png)

이때 만약 회사 건물이 사라진다고 해도 사람은 계속 존재한다.
`human`은 `company`가 **소유**한 것이 아닌 **소속**한 것이기 때문이다.

반대로 조합의 경우 의존성을 가지는 두 객체가 **같은 라이프사이클을 가지게 된다.**

구현 방법은 다음과 같다.

```js
class CPU {
  constructor(model) {...}
}

class Computer {
  constructor({ cpu, gpu, ram }) {
    this.cpu = new CPU(cpu);
    // ...
  }
}
```

위 코드의 경우 `Computer`가 생성시 생성자 함수 내부에서 필드에 `CPU` 인스턴스를 생성해 할당한다. 이렇게 구현하게 되면 메모리 상에서 `Computer`가 사라지게 된다면 `CPU`도 함께 사라지게된다.

이처럼 의존성을 주입한는데에는 여러 방법이 있다.

# 지금까지의 소감

![](/assets/blog/woowa-tech/lotto/8.png)

역시 리팩토링에는 끝이 없다. 몇번 해본 미션인데도 할때마다 새롭다.

그래도 프리코스를 진행하면서 정말 많은 것들을 얻어가는 것 같다. 어쩌다가 디스코드 봇도 만들어보게 되고, 코드리뷰도 서로 지속적으로 해나가면서 _'역시 코드리뷰는 중요하구나'_ 라는 생각이 다시 들기 시작했다. 앞으로 남은 마지막 주차도 최대한 배울 수 있을만한 요소들을 쏙쏙 뽑아먹는 기회가 되었으면 좋겠다.

# refferences

[[소프트웨어 공학] Association, Aggregation, Composition 에 대한 설명](https://stanleykou.tistory.com/entry/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EA%B3%B5%ED%95%99-Association-Aggregation-Composition-%EC%97%90-%EB%8C%80%ED%95%9C-%EC%84%A4%EB%AA%85)
