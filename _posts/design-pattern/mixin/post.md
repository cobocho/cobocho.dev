---
title: '타입스크립트 디자인 패턴 -믹스인 패턴-'
description: '단일 상속 언어에서 다중 상속 맛보기'
date: '2024/05/15'
tags: ['디자인 패턴', 'typescript', '믹스인 패턴']
---

# 믹스인 패턴이란?

타입스크립트(자바스크립트)나 자바 같은 몇몇 언어들은 상속의 복잡성과 명확성을 해친다는 이유로 다중 상속을 지원하지 않는다. 다중 상속을 사용할 경우 객체 간의 상속 관계가 복잡해질 수도 있으며 책임에 따른 객체를 만드는데에도 많은 생각이 필요해지며 일부 메서드의 필요로 인해 불필요한 상속이 일어날 수도 있다. 하지만 반대로 단일 상속이란 제약으로 인해 객체의 재사용성에 한계가 느껴지는 경우도 존재한다.

이러한 상황에 믹스인 패턴을 사용하여 객체를 조합시켜 다중상속과 비슷한 객체 패턴을 생성할 수 있다.

# 믹스인 패턴 구성하기

![](1.png)

가상 어항을 운영하는 게임을 만든다고 가정하자. 프로토타입에서는 가상 어항에서 기를 수 있는 생명체로 `오징어`, `게`, `거북이` 단 3종류만을 기를 수 있다.

이제 우리는 생명체의 행동을 구현하는 코드를 구현해야한다. 조건은 다음과 같다.

- 모든 생명체는 무언가를 먹을 수 있다.
- `오징어`는 상하로만 이동이 가능하다.
- `게`는 좌우로만 이동이 가능하다.
- `거북이`는 상하좌우로 이동이 가능하다.

위 조건을 바탕으로 객체지향적인 클래스를 작성해보려한다.

## 단일 상속에서의 코드

```ts
class Creature {
  public eat() {
    console.log('eat!');
  }
}
```

우선은 `모든 생명체는 무언가를 먹을 수 있다.`라는 조건에 부합하는 슈퍼클래스를 만든다.

```ts
class VerticalCreature extends Creature {
  public moveTop() {
    console.log('top');
  }

  public moveBottom() {
    console.log('bottom');
  }
}

class HorizontalCreature extends Creature {
  public moveLeft() {
    console.log('left');
  }

  public moveRight() {
    console.log('right');
  }
}
```

이후 해당 클래스를 상속받는 이동 방향에 따른 서브클래스를 생성한다.

```ts
class Squid extends VerticalCreature {}

class Crab extends HorizontalCreature {}
```

`오징어`와 `게`는 해당 서브클래스들을 사용하여 구현하였다. 여기까지는 순조롭게 진행된다. 하지만 문제는 두 클래스의 기능을 모두 소유하는 `거북이` 클래스를 만들 때 발생한다.

```ts
class Turtle extends VerticalCreature, HorizontalCreature {} // ... Parsing error: ',' expected.
```

앞서 말했듯이 자바스크립트는 단일상속 언어이다. 그렇기에 이중으로 상속을 하는 것은 불가능하다. `거북이`는 `VerticalCreature`이기도 하면서 `HorizontalCreature`이기도 한데 해당 클래스를 어떻게 구현해야 할까?

## 믹스인 패턴을 통한 상속

```ts
interface Constructor<T = object> {
  new (...args: unknown[]): T;
}

const HorizontalMoveMixin = (superClass: Constructor) => {
  return class extends superClass {
    public moveLeft() {
      console.log('left');
    }

    public moveRight() {
      console.log('right');
    }
  };
};

const VerticalMoveMixin = (superclass: Constructor) =>
  class extends superclass {
    public moveTop() {
      console.log('top');
    }

    public moveBottom() {
      console.log('bottom');
    }
  };
```

이중 상속을 해결하기 위해 이동방향에 따른 `Mixin` 클래스 생성 함수를 만들어준다.
해당 함수들은 인자로 받은 생성자 함수(클래스)를 상속하는 서브클래스 생성자 함수를 반환한다. 이를 통해서 다중 상속과 비슷한 패턴을 구현한다.

```ts
class Squid extends VerticalMoveMixin(Creature) {}

class Crab extends HorizontalMoveMixin(Creature) {}

class Turtle extends VerticalMoveMixin(HorizontalMoveMixin(Creature)) {}

const squidActive = () => {
  const squid = new Squid();

  squid.moveBottom();
  squid.moveTop();
  squid.eat();
};

const crabActive = () => {
  const crab = new Crab();

  crab.moveLeft();
  crab.moveRight();
  crab.eat();
};

const turtleActive = () => {
  const turtle = new Turtle();

  turtle.moveBottom();
  turtle.moveTop();
  turtle.moveLeft();
  turtle.moveRight();
  turtle.eat();
};

squidActive(); // top bottom eat!
crabActive(); // left right eat!
turtleActive(); // top bottom left right eat!
```

[실제 코드](https://github.com/cobocho/typescript-design-patterns/blob/main/structural/mixin.ts)

# References

- [믹스인 패턴 - patterns.dev](https://patterns-dev-kr.github.io/design-patterns/mixin-pattern/)
- [Learning Javascript Design Patterns](https://www.oreilly.com/library/view/learning-javascript-design/9781098139865/)
