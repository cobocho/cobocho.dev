---
title: '이펙티브 소프트웨어 테스팅 with Typescript -계약 설계-'
description: '계약을 통해 알아보는 객체 조건 설계'
date: '2024/05/15'
tags: ['테스트', 'jest']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

거대한 금융 소프트웨어가 있다고 생각해보자. 해당 소프트웨어는 커다란 루틴을 실행하기 위해 여러 하위 루틴을 실행한다. 루틴 실행 도죽 어떤 시점에 다다르면 `TaxCalculator` 클래스가 호출된다. 이 클래스의 계산은 양수일때만 가능하다. 이런 제약사항의 모델링을 위해서는 다음과 같은 방법들이 존재한다.

1. 클래스가 유효하지 않은 입력으로 다른 클래스를 호출할 수 없도록 한다.
2. 유효적이지 않은 입력일시 에러를 발생시키도록 방어적으로 작성한다.
3. 클래스에 대해 **명확한 계약을 정의**한다.

# 사전 조건과 사후 조건

세금 계산 메서드의 **사전 조건**과 **사후 조건**을 생각해보자. 사전 조건은 **음수를 받을 수 없다**이다. 사후 조건 역시 음수를 반환하지 않는 것이다.

```ts
export class TaxCalculator {
  public calculateTax(value: number): number {
    // 사전 조건
    if (value < 0) {
      throw new Error('Value has to be positive');
    }

    const taxValue: number = 0;

    // 사후 조건
    if (taxValue < 0) {
      throw new Error('Calculated tax cannot be negative');
    }

    return taxValue;
  }
}
```

사전 조건과 사후 조건에 따른 코드는 위와 같다. 사후 조건을 위반하는 값에 대한 존재 가능성에 의구심이 들 수 있지만 구현이 매우 복잡한 경우, 버그가 스며들 수 있다. 버그가 발생하는 것 보다는 중단이 나은 경우가 대부분이다.

또한 문서화를 통해 사전, 사후 조건을 명시하는 것 또한 중요하고 권장된다. JSDoc을 활용하자.

```ts
/**
 * 세금 계산기
 * @description 세금 계산을 위한 클래스
 */
export class TaxCalculator {
  /**
   * 세금 계산
   * @param value 세금 계산 대상 금액, 값은 양수여야 한다.
   * @returns 세금 계산 결과, 값은 양수여야 한다.
   */
  public calculateTax(value: number): number {
    // 사전 조건
    if (value < 0) {
      throw new Error('Value has to be positive');
    }

    const taxValue: number = 0;

    // 사후 조건
    if (taxValue < 0) {
      throw new Error('Calculated tax cannot be negative');
    }

    return taxValue;
  }
}
```

## 강한 조건과 약한 조건

사전, 사후 조건을 정의할때의 중요 점은 조건의 강도 설정이다. 앞에 코드에서 우리는 중지를 통한 예외처리로 사전 조건을 강하게 다루었다.
음수일때 프로그램을 중지시키지 않으려면 사전 조건을 약화시킨다. 즉 예외처리 로직을 제거한다. 약한 조건과 강한 조건을 쓸지에 대한 정답은 없다. 이는 개발하려는 소프트웨어의 성격에 따라 달라진다.

```ts
if (taxValue < 0) {
  return 0;
}
```

혹은 위와 같이 처리하여 클라이언트에서 예외에 대한 걱정을 하지 않도록 할 수도 있다.

# 불변식

이제는 사전, 사후 모두의 경우에 유지되어야 하는 조건을 알아보자. 이러한 조건을 **불변식**이라고 한다.

```ts
class Product {
  // ...
}

class Basket {
  public add(product: Product, qtyToAdd: number) {
    // ...
  }

  public remove(product: Product) {
    // ...
  }
}
```

온라인 상점에 사용자가 구매할 제품을 담는 `Basket` 클래스가 있다. 이 클래스는 `product`를 `qtyToAdd`만큼 추가하는 `add` 메서드를 제공한다.

`add` 메서드의 사전, 사후 조건은 다음과 같다.

**사전 조건**

- `product`는 `null`일 수 없다.
- `qtyToAdd`는 `0`보다 커야한다.

**사후 조건**

- 장바구니에 제품이 있어야한다.

```ts
public add(product: Product, qtyToAdd: number) {
  if (product == null) {
    throw new Error('Product is required')
  }
  if (qtyToAdd <= 0) {
    throw new Error('Quantity must be greater than 0')
  }
  const oldTotalValue = this.totalValue
  // ...
  if (oldTotalValue === this.totalValue) {
    throw new Error('Product does not exist in basket')
  }
}
```

`remove` 메서드의 사전, 사후 조건은 다음과 같다.

**사전 조건**

- `product`는 `null`일 수 없다.
- `product`는 기존에 존재해야 한다.

**사후 조건**

- 장바구니에 제품이 더이상 존재해서는 안된다.

```ts
public remove(product: Product) {
  if (product == null) {
    throw new Error('Product is required')
  }
  if (!this.products.find((p) => p.id === product.id) == null) {
    throw new Error('Product does not exist in basket')
  }

  // ...

  if (this.products.find((p) => p.id === product.id)) {
    throw new Error('Product does exist in basket')
  }
}
```

이제 클래스의 불변식을 모델링하자.

**불변식**

- 장바구니에 있는 제품의 합계는 절대 음수가 될 수 없다.

```ts
class Basket {
  public products: Product[] = [];

  public totalValue = 0;

  private invariants() {
    if (this.totalValue < 0) {
      throw new Error('Total value must be greater than or equal to 0');
    }
  }

  public add(product: Product, qtyToAdd: number) {
    if (product == null) {
      throw new Error('Product is required');
    }
    if (qtyToAdd <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    const oldTotalValue = this.totalValue;

    // 제품 추가 & 합계 갱신

    if (oldTotalValue === this.totalValue) {
      throw new Error('Product does not exist in basket');
    }
    this.invariants();
  }

  public remove(product: Product) {
    if (product == null) {
      throw new Error('Product is required');
    }
    if (!this.products.find((p) => p.id === product.id) == null) {
      throw new Error('Product does not exist in basket');
    }
    // ...

    if (this.products.find((p) => p.id === product.id)) {
      throw new Error('Product does exist in basket');
    }
    if (this.totalValue <= 0) {
      throw new Error('Total value must be greater than 0');
    }
    this.invariants();
  }
}
```

불변식은 모든 메서드에 포함될 수도 있기 때문에 메서드를 만들어 중복을 줄일 수도 있다.

# 계약 변경과 리스코프 치환 법칙

만약 `calculateTax`의 조건이 변경되었다고 가정하자. 이때 변경으로 인한 영향을 파악하는 가장 쉬운 방법은 **변경이 일어난 클래스를 사용하는 모든 클래스를 살펴보는 것이다.**

`calculateTax`를 사용하는 3개의 클래스가 있다고 가정하자. 이 클래스들은 메서드를 호출할 떄 `value는 0보다 크거나 같아야한다.` 라는 사전 조건을 알고있다. 따라서 클라이언트 클래스는 `calculateTax`에 절대 음수를 전달하지 않는다.

```ts
const dependency1 = () => {
  taxCalculator.calculateTax(50);
};

const dependency2 = () => {
  taxCalculator.calculateTax(150);
};

const dependency3 = () => {
  const t = getFromDB();

  if (t < 0) {
    taxCalculator.calculateTax(250);
  }
};
```

이때 사전조건이 `value > 100`으로 변경해보자. 이제 세 의존 클래스는 어떻게 될까? `dependency2`는 변함이 없을 것이다. 하지만 나머지 두 함수는 깨지게 된다. 여기서 우리가 알 수 있는건 사전 조건이 강화될수록 의존 클래스에 문제가 생기게 된다.

이제 `calculateTax`가 음수도 입력으로 받도록 변경해보자. 이 때는 모두 망가지지 않는다. 이번에는 반대로 사전 조건이 느슨해지는 것은 의존 클래스에도 문제가 생기지 않는 것을 의미한다.

하지만 사후 조건은 반대로 작용한다.

말이 안되지만 메서드가 음수를 반환한다고 해보자. 클라이언트는 음수를 기대하지 않기에 의존 클래스에서는 문제가 발생한다. 즉 사후 조건이 느슨해지면 의존 클래스에 문제가 생긴다.

반대로 사후 조건이 100 이상이 되도록 강화하면 클라이언트는 망가지지 않는다. 즉 사전 조건이 강화되도 의존 클래스는 망가지지 않는다.

## 상속과 계약

`TaxCalculator`는 서브 클래스를 보유한다.

```ts
class TaxCalculatorBrazil extends TaxCalculator {
  public calculateTax(value: number): number {
    // 사전 조건
    if (value < 0) {
      throw new Error('Value has to be positive');
    }

    // ...

    return taxValue;
  }
}

class TaxCalculatorUS extends TaxCalculator {
  public calculateTax(value: number): number {
    // 사전 조건
    if (value >= 100) {
      throw new Error('Value has to be positive');
    }

    // ...

    // 사후 조건
    if (taxValue < 0) {
      throw new Error('Calculated tax cannot be negative');
    }
  }
}

class TaxCalculatorNL extends TaxCalculator {
  public calculateTax(value: number): number {
    // ...

    // 사후 조건
    if (taxValue < 0) {
      throw new Error('Calculated tax cannot be negative');
    }
  }
}
```

- `TaxCalculatorBrazil`

부모 클래스와 사전 조건이 동일하다. 반면에 사후 조건은 존재하지 않는다. 따라서 `TaxCalculatorBrazil`이 음수를 반환하면 클라이언트는 실패할 수 있다.

- `TaxCalculatorUS`

사전 조건으로 `value`가 100 보다 커야한다. 이는 부모 클래스의 사전 조건보다 강하므로 클라이언트에서 정상 동작 하지만 클라이언트에서 적합하지 않은 값으로 호출될 가능성이 있다. 사후 조건은 동일하다.

- `TaxCalculatorNL`

사전 조건으로 어떠한 값이라도 받을 수 있다. 부모 클래스보다 사전 조건이 약하므로 클라이언트에서는 실패가 일어나지 않는다.

관찰한 결과를 통해 다음 내용을 유추할 수 있다.

1. 자식 클래스의 사전 조건은 부모 클래스의 사전 조건보다 같거나 약해야한다. (더 많은 값을 받아야한다.)
2. 자식 클래스의 사후 조건은 부모 클래스의 사전 조건보다 같거나 강해야한다. (더 적은 값을 반환해야한다.)

이러한 개념은 SOLID 원칙의 [리스코프 치환 원칙](https://ko.wikipedia.org/wiki/%EB%A6%AC%EC%8A%A4%EC%BD%94%ED%94%84_%EC%B9%98%ED%99%98_%EC%9B%90%EC%B9%99)과 동일하다. 객체지향에서 자식 클래스는 항상 부모 클래스를 대체할 수 있어야한다.

# 계약에 의한 설계와 테스트의 연관성

1. 단언문을 통해 코드의 버그를 일찍 발견 가능하다.

계약 위반으로 인해 프로그램이 종료되므로 버그에 대한 발견을 미리 알아 챌 수 있다.

2. 사전 조건, 사후 조건, 불변식은 개발자에게 테스트 대상을 제공한다.

미리 알아낸 계약 사항을 기반으로 테스트 대상임을 파악 가능하다.

3. 명시적인 계약은 클라이언트의 안정성을 가져온다.

어떠한 서버 메서드가 양수만을 받고 양수만을 반환한다면 클라이언트에서도 이를 확신할 수 있다. 이는 코드를 단순하게 만든다.

# 현업에서의 계약 설계

## 강한 사전 조건 vs 약한 사전 조건

사전 조건의 강도는 트레이드 오프의 영역이다. 클라이언트의 맥락, 소프트웨어의 성격에 따라 조건의 강도를 설정해야한다.

## 계약과 입력 유효성 검사는 다르다

계약과 입력 유효성 검사는 서로 다른 개념이다. 객체 생성 이전에 유효성 검사를 진행한다면 사전 조건을 모델링 하는 것에 대한 의구심이 충분히 생길 수 있다. 하지만 둘은 차이점이 존재한다.

먼저 유효성 검사는 유효하지 않은 데이터가 시스템에 침투하는 것을 방지한다. (ex. 입력값 타입)

반면에 계약은 클래스 간의 의사소통을 위해 존재한다. 계약에서 데이터는 이미 유효하다고 판단한다. 하지만 계약이 위반될 경우에 프로그램을 중지한다. (ex. 잘못된 메서드 호출)

계약과 입력 유효성 검사는 둘 다 이루어져야한다. 유효성 검사와 사전 조건이 동일하다 하더라도 계약을 통해 클래스 간 소통에 대한 안정성을 추구하는 것은 중요하다.

## 예외 vs 부드러운 반환값

```ts
ex)
// 부드러운 반환값
if (value === null) {
  return '';
}
```

일어나서는 안되는 동작이 생겼을때 어떻게 값을 다루어야 할까? 예외를 던지거나 부드러운 값을 반환할 수 있다. 이는 해당 메서드가 어떻게 작동할때 더 자연스러운지에 대해 생각하여 결정한다.

# 관련 repositories

- [original code (java)](https://github.com/effective-software-testing/code/blob/main/ch4)
- [typescript ver.](https://github.com/cobocho/effective-software-testing-typescript/tree/main/ch04)
