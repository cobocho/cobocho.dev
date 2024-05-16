---
title: '이펙티브 소프트웨어 테스팅 with Typescript -속성 기반 테스트 (with fast-test)-'
description: '속성으로 파악하는 소프트웨어의 기준'
date: '2024/05/15'
tags: ['테스트', 'jest', '속성 기반 테스트', 'fast-test']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

지금까지 우리는 예시 기반 테스트를 수행하였다. 프로그램의 입력 공간을 구획으로 나누고 예제를 골라 테스트 하였다. 만약 우리가 예제를 고르지 않아도 된다면 어떨까? 테스트의 속성을 기준으로 테스트에 표현하고 임의 값 생성을 프레임워크에게 위임하는 방식이 바로 **속성 기반 테스트**이다.

# 합격 등급 프로그램

```ts
export class PassingGrade {
  public static passed(grade: number): boolean {
    if (grade < 1 || grade > 10) {
      throw new Error('Invalid grade. Grade must be between 1 and 10.');
    }
    return grade >= 5;
  }
}
```

간단한 프로그램이 있다. 이 프로그램은 학생의 점수(`grade`)가 5점 이상이면 시험을 통과하였음을 판단하는 객체이다. 이 프로그램에 명세 기반 테스트를 적용하면 합격 구획, 불합격 구획, 범위 밖 구획을 계획할 것이다. 이후 구획별로 테스트를 작성한다.

속성 기반 테스트를 수행할 경우, 우선 요구사항에 대한 속성을 찾아야한다.

**속성 리스트**

- 불합격: `1.0` ~ `4.9999...` 사이 모든 수는 `false`를 반환한다.
- 합격: `5.0` ~ `10.0` 사이 모든 수는 `true`를 반환한다.
- 범위 밖: 유효하지 않은 모든 수는 예외를 던진다.

불합격 속성에 대한 테스트를 작성해보자.

```ts
import { fc, it } from '@fast-check/jest';

import { PassingGrade } from './PassingGrade';

describe('PassingGrade', () => {
  // 1
  it.prop([fc.float({ min: 1, max: 5, maxExcluded: true, noNaN: true })])('fail', (grade) => {
    // 2
    const result = PassingGrade.passed(grade);
    // 3
    expect(result).toBe(false);
  });
});
```

> 해당 테스트 코드는 Javascript PBT 라이브러리인 [fast-check](https://github.com/dubzzz/fast-check)를 기반으로 작성되었다.

테스트 코드 구현 단계는 다음과 같다.

1. 생성하고자 하는 값의 특성을 정의한다. _(1 이상, 5 미만의 소수. `NaN` 제외)_
2. `fast-check`가 생성한 값을 기반으로 테스트한다.
3. 결과가 `false`인지 확인한다.

이때 `fast-check`가 당시 생성한 난수는 다음과 같다.

```ts
[
  1.7147018909454346, 4.999994277954102, 3.7657206058502197, 1.000002384185791, 4.999993801116943,
  3.619997024536133, 1.0000004768371582, 2.0588018894195557, 1.000002384185791, 2.5461761951446533,
  1.000000238418579, 3.292696952819824, 1.0000016689300537, 1.0000020265579224, 3.9946625232696533,
  3.3331234455108643, 4.999998569488525, 1.0000001192092896, 2.6336147785186768, 1.9525172710418701,
  1.0000001192092896, 4.999994277954102, 2.3515212535858154, 1.4001277685165405, 3.5921902656555176,
  3.480577230453491, 1.0000019073486328, 1.614540696144104, 1.9024564027786255, 1.4183176755905151,
  1.0000009536743164, 4.999997615814209, 2.7591004371643066, 1.0000005960464478, 2.225677728652954,
  1.784538984298706, 3.4254486560821533, 3.3775575160980225, 4.999993324279785, 1.3401950597763062,
  1.0000003576278687, 1.000000238418579, 1.0000016689300537, 4.117441654205322, 1.0000004768371582,
  1.000000238418579, 1.79573655128479, 1.5732882022857666, 1.0000004768371582, 3.3182191848754883,
  1.7260743379592896, 4.999992847442627, 1.000002145767212, 3.6844382286071777, 1.9503366947174072,
  2.6756529808044434, 1.0000026226043701, 3.0859756469726562, 2.738776683807373, 1.426236629486084,
  1.000002145767212, 1.0000016689300537, 1.746680736541748, 4.999988079071045, 1.0000017881393433,
  1.534654140472412, 1.7067224979400635, 4.999989032745361, 1.8700321912765503, 2.0304219722747803,
  1.7367268800735474, 2.459127187728882, 1.0000026226043701, 1.4151817560195923, 1.0000004768371582,
  3.2517051696777344, 3.9310572147369385, 4.578529357910156, 2.899474620819092, 3.6064453125,
  4.999989986419678, 4.999996662139893, 1.4112040996551514, 2.2365646362304688, 4.9999895095825195,
  3.9646201133728027, 2.917809247970581, 1.0000014305114746, 1.9507520198822021, 4.999990940093994,
  1.3664559125900269, 1.000001072883606, 1.0722434520721436, 2.720749616622925, 1.5570988655090332,
  4.9999895095825195, 1.9203871488571167, 4.999998569488525, 1.6629278659820557, 3.531897783279419,
];
```

이처럼 `fast-check`를 통해 테스트의 불합격 속성에 해당하는 임의의 값들을 기반으로 테스트 할 수 있게 된다.

유사한 전략을 통해 합격 속성에 대한 테스트도 구현할 수 있다.

```ts
it.prop([fc.float({ min: 5, max: 10, noNaN: true })])('pass', (grade) => {
  const result = PassingGrade.passed(grade);
  expect(result).toBe(true);
});
```

마지막으로 유효 범위 밖의 숫자를 생성하여 테스트를 진행하자.

```ts
it.prop([
  fc.double({
    min: Number.MIN_SAFE_INTEGER,
    max: 1,
    maxExcluded: true,
    noNaN: true,
  }),
  fc.double({
    min: 10,
    max: Number.MAX_SAFE_INTEGER,
    minExcluded: true,
    noNaN: true,
  }),
])('invalid', (underGrade, overGrade) => {
  expect(() => {
    PassingGrade.passed(underGrade);
    PassingGrade.passed(overGrade);
  }).toThrow();
});
```

`fc.double`로 범위 밖 부동 소수점을 생성하여 테스트한다.

그렇다면 코드에 버그가 나타나는 경우에는 어떻게 출력될까? 개발자의 실수로 테스트의 반환값을 `grade >= 5.0`에서 `grade > 5.0`로 수정했다고 가정하고 테스트를 진행해보자.

```bash
Property failed after 51 tests
{ seed: -1634402411, path: "50", endOnFailure: true }
Counterexample: [5]
Shrunk 0 time(s)
Got error: expect(received).toBe(expected) // Object.is equality
Expected: true
Received: false
  14 |   it.prop([fc.float({ min: 5, max: 10, noNaN: true })])('pass', (grade) => {
  15 |     const result = PassingGrade.passed(grade)
> 16 |     expect(result).toBe(true)
     |                    ^
  17 |   })
  18 |
```

4번째 테스트를 진행하던 도중 `5`라는 `Counterexample` 값으로 인해 테스트가 깨진 것을 볼 수 있다. 이렇게 속성 기반 테스트를 사용하면 임의의 값들을 통해 테스트하여 개발자가 놓친 케이스를 프레임워크를 통해 알아낼 수 있게 된다.

# `unique` 메서드 테스트

아파치 커먼즈의 언어(Lang) 라이브러리에서는 [unique](https://github.com/apache/commons-math/blob/f9c0a8b67/commons-math-legacy-core/src/main/java/org/apache/commons/math4/legacy/core/MathArrays.java#L1101) 메서드를 제공한다.

해당 메서드는 입력된 배열을 유일한 값만으로 구성하여 내림차순으로 정렬된 배열로 반환한다. 빈 배열은 허용하지만 `null`은 허용하지 않는다. 무한대 값 또한 허용된다.

```ts
export class MathArrays {
  public static unique(data: number[] | null): number[] {
    const values: Set<number> = new Set<number>(data); // 1
    const sortedValues: number[] = Array.from(values).sort((a, b) => b - a); // 2
    return sortedValues;
  }
}
```

1. 반복된 요소를 거르기 위해 `Set`을 사용한다.
2. 배열을 정렬하여 반환한다.

테스트는 다음처럼 동작한다.

```ts
import { fc, it } from '@fast-check/jest';

import { MathArrays } from './MathArray';

describe('MathUtils', () => {
  it.prop([
    fc.array(
      fc.integer({
        min: 0,
        max: 100,
      }),
      {
        minLength: 50,
      }, // 1
    ),
  ])('test', (nums) => {
    const result = MathArrays.unique(nums); // 2
    expect(nums).toEqual(expect.arrayContaining(result)); // 3
    expect(result.length).toBe(new Set(nums).size); // 4
    expect(result).toBeSortedByDesc(); // 5
  });
});
```

1. 난수의 범위는 `0`에서 `100` 사이의 숫자가 `50`개 이상으로 이루어진 배열이다.
2. 결과를 계산한다.
3. 결과가 기존 값에 포함되는지 확인한다.
4. 결과가 유니크한 배열인지 확인한다.
5. 결과가 내림차순인지 확인한다.

```ts
// jest.setup.ts

const isArray = <T>(arr: unknown): arr is Array<T> => Array.isArray(arr);

expect.extend({
  toBeSortedByDesc(actual) {
    if (!isArray<number>(actual)) {
      return {
        pass: false,
        message: () => 'toBeSortedByDesc only works with arrays',
      };
    }

    const sorted = [...actual].sort((a, b) => b - a);
    const pass = actual.every((v, i) => v === sorted[i]);

    return {
      pass,
      message: () =>
        pass
          ? `expected ${actual.toString()} not to be sorted by desc`
          : `expected ${actual.toString()} to be sorted by desc`,
    };
  },
});
```

> 정렬을 확인하기 위해서 `toBeSortedByDesc` 커스텀 매쳐를 생성하였다. 해당 포스트는 `jest` 포스팅이 아니므로 자세한 구현 과정은 서술하지 않겠다.

`fast-test`는 깨뜨리는 입력값을 찾지 못한다. 구현사항이 제대로 동작하는 것처럼 보인다.

# `IndexOf` 메서드 테스트

이번엔 아파치 커먼즈 라이브러리의 `indexOf` 메서드를 구현해보자. 해당 메서드는 입력받은 배열의 지정된 인덱스부터 시작하여 주어진 값이 위치하는 인덱스를 찾는다. 입력이 `null`이면 `-1`을 반환하며 `startIndex`가 음수이면 `0`으로 취급한다. 배열 길이보다 큰 `startIndex`는 `-1`을 반환한다.

다음은 해당 메서드의 구현 코드이다.

```ts
export class ArrayUtils {
  public static indexOf(array: number[] | null, valueToFind: number, startIndex: number): number {
    if (array === null) {
      return -1;
    }
    if (startIndex < 0) {
      startIndex = 0;
    }
    for (let i = startIndex; i < array.length; i++) {
      if (valueToFind === array[i]) {
        return i;
      }
    }
    return -1;
  }
}
```

명세 기반 테스트를 통해 강력한 테스트를 만들 수 있지만 우선 지금은 속성 기반 테스트를 통해 주요 동작을 표현해보자.

테스트의 전반적인 개념은 배열의 임의의 위치에 무작위 값을 삽입한다. 무작위 값은 배열에 존재하지 않으며 삽일할 위치는 배열의 내부 어딘가이다. 이후 시작할 위치 또한 임의의 값을 부여한다.

구현된 코드는 다음과 같다.

```ts
it.prop([
  fc.uniqueArray(
    fc.integer({
      min: -1000,
      max: 1000,
    }), // 1
    {
      minLength: 100,
      maxLength: 100,
    }, // 2
  ),
  fc.integer({
    min: 1001,
    max: 2000,
  }), // 3
  fc.nat(99), // 4
  fc.nat(99),
])('indexOf는 항상 첫번째 값을 찾아낸다.', (numbers, value, indexToAddElement, startIndex) => {
  numbers.splice(indexToAddElement, 0, value); // 6

  const expectedIndex = indexToAddElement >= startIndex ? indexToAddElement : -1; // 7

  expect(ArrayUtils.indexOf(numbers, value, startIndex)).toBe(expectedIndex); //8
});
```

1. 입력될 배열의 숫자 범위는 `-1000` 부터 `1000` 사이이다.
2. 길이가 `100`인 배열을 생성한다.
3. 추가될 임의의 값을 생성한다. 입력될 배열의 숫자 범위 밖으로 설정하여 항상 대상 배열에 존재하지 않음을 증명한다.
4. 요소가 추가될 인덱스를 생성한다.(`0` ~ `99`)
5. 찾기 시작할 인덱스를 생성한다.(`0` ~ `99`)
6. 임의값을 배열 중간에 삽입한다.
7. 생성된 삽입 인덱스와 시작 인덱스를 비교하여 예측 값을 계산한다.
8. 예측 값이 실제 값과 동일한지 확인한다.

속성 기반 테스트를 작성하려면 창의성이 필요하다. `indexOf` 메서드가 애매모호하게 찾지 않도록 개념을 잘 생각해야한다.

# 장바구니 클래스 테스트

> 해당 단락의 경우 라이브러리와 언어 차이로 인한 코드 변경이 다수 존재합니다.

[4장의 `Basket` 클래스](https://www.cobocho.dev/post/effective-software-testing/desiging-contracts#%EB%B6%88%EB%B3%80%EC%8B%9D)에 속성 테스트를 적용해보자.

구현된 `add` 메서드는 다음과 같다.

```ts
class Product {
  private constructor(
    public name: string,
    public price: number,
  ) {
    name = this.name;
    price = this.price;
  }
}

export class Basket {
  private totalValue: number = 0;
  private basket: Map<Product, number> = new Map();

  public add(product: Product, qtyToAdd: number): void {
    if (!product) {
      throw new Error('Product is required');
    }
    if (qtyToAdd <= 0) {
      throw new Error('Quantity has to be greater than zero');
    }

    const oldTotalValue: number = this.totalValue;

    const existingQuantity: number = this.basket.get(product) || 0;
    const newQuantity: number = existingQuantity + qtyToAdd;
    this.basket.set(product, newQuantity);

    const valueAlreadyInTheCart: number = product.price * existingQuantity;
    const newFinalValueForTheProduct: number = product.price * newQuantity;

    this.totalValue = this.totalValue - valueAlreadyInTheCart + newFinalValueForTheProduct;

    if (!this.basket.has(product)) {
      throw new Error('Product was not inserted in the basket');
    }
    if (this.totalValue <= oldTotalValue) {
      throw new Error('Total value should be greater than previous total value');
    }
    if (!this.invariant()) {
      throw new Error('Invariant does not hold');
    }
  }

  private invariant(): boolean {
    return this.totalValue >= 0;
  }
}
```

`remove` 메서드의 구현 사항은 다음과 같다.

```ts
public remove(product: Product): void {
  if (!product) {
    throw new Error("Product can't be null")
  }
  if (!this.basket.has(product)) {
    throw new Error('Product must already be in the basket')
  }

  const qty: number = this.basket.get(product) || 0
  this.totalValue -= product.price * qty
  this.basket.delete(product)

  if (this.basket.has(product)) {
    throw new Error('Product is still in the basket')
  }
  if (!this.invariant()) {
    throw new Error('Invariant does not hold')
  }
}
```

이제 `Basket` 클래스의 속성 테스트를 작성하자. 첫 번째로 장바구니에서 발생할 수 있는 동작을 나타내는 액션을 만들어야한다. 장바구니는 추가와 제거 두 가지의 동작이 가능하다. 우리는 이 두가지 동작에 대한 임의의 동작 순서를 생성한다.

물건 추가 액션의 순서는 다음과 같다. `Product`와 수량을 받아서 장바구니에 넣는다. 이후 현재 총 가격을 기댓값과 비교한다.
물건 추가 액션을 위한 함수를 만들어주자.

```ts
const addAction = (basket: Basket, product: Product, qty: number) => {
  const currentValue = basket.getTotalValue(); // 1

  basket.add(product, qty); // 2

  const newProductValue = product.price * qty; // 3
  const newValue = currentValue + newProductValue; // 4

  expect(basket.getTotalValue()).toBe(newValue); // 5
};
```

1. 현재 장바구니의 총 가격을 확인한다.
2. 새로운 상품을 장바구니에 추가한다.
3. 업데이트된 가격을 확인한다.
4. 업데이트된 가격을 예측한다.
5. 예측된 가격과 실제 장바구니의 가격이 같은지 판별한다.

물건 제거 액션의 순서는 다음과 같다. 입력받은 `Product`를 장바구니에서 제거한다. 이후 현재 총 가격을 기댓값과 비교한다.
물건 제거 액션을 위한 함수를 만들어주자.

```ts
const removeAction = (basket: Basket) => {
  const currentValue = basket.getTotalValue(); // 1
  const products = basket.products();

  if (products.size === 0) {
    // 2
    return;
  }

  const randomProduct = Array.from(products.keys())[Math.floor(Math.random() * products.size)]; // 3
  const currentProductQty = basket.quantityOf(randomProduct); // 4
  basket.remove(randomProduct); // 5

  const basketValueWithoutRandomProduct = currentValue - randomProduct.price * currentProductQty; // 6

  expect(basket.getTotalValue()).toBe(basketValueWithoutRandomProduct); // 7
};
```

1. 현재 장바구니의 총 가격을 확인한다.
2. 만약 장바구니가 비었을 시 테스트하지 않는다.
3. 장바구니 내 임의의 상품을 선택한다.
4. 임의의 상품을 몇개 가지고 있는지 확인한다.
5. 임의의 상품을 제거한다.
6. 임의의 상품이 제거된 이후의 가격을 예측한다.
7. 예측된 가격과 실제 장바구니의 가격이 같은지 판별한다.

이제 두 액션을 `fast-test`를 통해서 랜덤하게 작동하도록 구현하자.

```ts
describe('Basket', () => {
  const randomProduct = [
    new Product('TV', 100),
    new Product('Playstation', 150),
    new Product('Refrigerator', 180),
    new Product('Soda', 2),
  ]; // 1

  const basket = new Basket(); // 2

  it.prop([
    fc.array(fc.constantFrom(addAction, removeAction), { minLength: 10 }), // 3
    fc.constantFrom(...randomProduct),
    fc.integer({ min: 1, max: 100 }),
  ])('add and remove', (actions, products, qty) => {
    actions.forEach((action) => {
      action(basket, products, qty); // 4
    });
  });
});
```

1. 샘플 상품 목록을 하드코딩한다.
2. 대상 장바구니 인스턴스를 생성한다.
3. 추가, 제거 액션 함수로 이루어진 랜덤한 시퀀스를 생성한다.
4. 시퀀스를 실행해 장바구니의 가격이 올바른지 테스트한다.

비록 예시 기반 테스트에 비해 복잡해보이지만 훨씬 강력한 테스트를 만들 수 있게 된다.

# 현업에서의 속성 기반 테스트

## 예시 기반 테스트 vs 속성 기반 테스트

예시 기반 테스트와 속성 기반 테스트는 적절히 섞어 사용하는 것이 좋다. 예시 기반 테스트만으로도 테스트의 설득력이 충분하다면 예시 기반 테스트를 사용하는 것이 좋을 수도 있다. 만약 예시 기반 테스트만으로 확실하다고 판단할 수 없을 때 속성 기반 테스트를 사용하자.

## 속성 기반 테스트에서 발생할 수 있는 문제

속성 기반 테스트를 작성하는 과정에서 대략 세가지 문제가 발생할 수 있다.

**비용이 많이 들거나 불가능한 데이터를 생성**

만약 생성이 불가능한 데이터(ex. 2에서 8 사이의 수로 이루어진 중복이 없는 길이 10의 배열)를 만들거나 데이터 생성이 너무 오래 걸린다면 다른 방법으로 데이터를 만드는 것이 더 낫다.

**불확실한 경계**

버그는 경계에서 생기기 쉽다. 속성의 경계를 올바르게 표현하지 않으면 속성 기반 테스트는 의미가 없어진다.

**균등하지 못한 입력 옵션**

속성 기반 테스트 프레임워크는 입력 값에 대해 최대한 균등한 분포를 추구한다. 예를 들어서 삼각형을 생성하는 함수의 세 변을 생성하려고 하면 유효하지 않은 삼각형 변 목록을 만드는 경우가 더 많을 것이다. 이럴 때는 유효한 삼각형과 무효한 삼각형으로 테스트를 나누어야한다.

# 관련 repositories

- [original code (java)](https://github.com/effective-software-testing/code/blob/main/ch5)
- [typescript ver.](https://github.com/cobocho/effective-software-testing-typescript/tree/main/ch05)
