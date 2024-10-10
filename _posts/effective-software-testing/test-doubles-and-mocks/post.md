---
title: '이펙티브 소프트웨어 테스팅 with Typescript -테스트 더블과 모의 객체-'
description: '모의 객체를 통한 테스트 단순화'
date: '2024/05/16'
tags: ['테스트', 'jest', 'jest-mock-extended', '테스트 더블']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

객체지향 프로그래밍으로 소프트웨어를 설계할 경우 대부분의 경우에서는 클래스간 의존이 일어나게 된다. 이때 대규모 테스트가 아닌 상태에서 의존성이 존재하는 클래스들을 테스트하려면 어떻게 해야 할까?

예를 들어서 송장을 처리하는 응용 프로그램의 클래스로 `IssuedInvoices`가 존재한다고 가정하자. 이 클래스는 DB와 수많은 SQL 쿼리를 포함한다. `InvoiceGenerationService` 클래스는 송장을 데이터 베이스에 보내는 과정에서 `IssuedInvoices` 클래스를 사용한다. 이 말은 즉, `InvoiceGenerationService`를 테스트하려면 데이터베이스에 대한 준비 작업이 필요하다는 의미이다. 하지만 단순한 클래스 테스트를 위해 데이터베이스를 준비하기에는 많은 작업이 필요하다. 이때, **테스트 더블**을 활용할 수 있다.

테스트 더블에서는 구성요소 `B`의 동작을 모방하는 객체를 생성하여 가짜 구성요소 `B`를 통하여 테스트를 진행한다. 테스트 더블은 다음과 같은 장점이 있다.

**더 큰 제어권을 가진다.**

우리는 직접 만든 가짜 객체를 통해 복잡한 설정 과정 없이 시뮬레이션 할 수 있다.

**시뮬레이션은 빠르다.**

만약 의존하는 기능이 웹 통신 같은 기능일 경우 메서드를 실행하는데 많은 시간이 소요될 수 있다. 하지만 시뮬레이션은 구성한 값을 반환하므로 시간이 들지 않는다.

**클래스 간의 상호작용을 반영할 수 있다.**

개발자는 모의 객체 설계기법으로 계약이 어떻게 되어야 하는지, 개념적인 경계를 어떻게 나눌지를 반영할 수 있다.

# 더미, 페이크, 스텁, 모의 객체, 스파이

객체를 시뮬이션 하는 방식으로는 더미, 페이크, 스텁, 모의 객체, 스파이가 있다.

## 더미 객체

더미는 **테스트 대상 클래스에 전달되지만 절대 사용되지 않는 객체**이다. 예를 들어 `Customer` 클래스를 테스트 할때 해당 클래스는 `Address`, `Email` 같은 다른 클래스들을 의존할 것이다. 테스트 케이스 `A`가 어떠한 동작을 수행할때, `Customer`가 어떠한 `Email`을 가져도 상관이 없을 경우 더미 `Address`를 넘길 수 있다.

## 페이크 객체

페이크 객체는 시뮬레이션하려는 클래스같이 실제로 동작하는 구현체를 가진다. 대신 훨씬 단순한 방법으로 동작한다.

## 스텁

스텁은 테스트 과정에서 수행된 호출에 대해 하드코딩된 응답을 제공한다. 페이크 객체와는 다르게 스텁은 실제로 동작하는 구현체가 존재하지 않는다.

## 모의 객체

모의 객체는 메서드의 응답을 설정할 수 있다는 점에서 스텁 같은 역할을 한다. 하지;만 모의 객체는 모든 상호작용을 저장해서 나중에 단언문에 활용할 수 있도록 해준다.

## 스파이

스파이는 의존성을 감시한다. 실체 객체를 감싸서 상호작용을 관찰하여 기록한다.

# 모의 객체 프레임워크에 대한 소개

> 해당 책의 경우 `Java`의 [Mockito](https://site.mockito.org/) 프레임워크를 기준으로 설명한다. 하지만 해당 포스트의 경우 `Jest`를 기반으로 작성되기에 `Jest`와 `jest-mock-extended`를 기준으로 작성된다.

## 의존성 스텁화

`Jest`를 통해서 스텁을 설정하는 방법을 알아보자. 다음과 같은 요구사항이 있다.

> 프로그램은 `100`보다 작은 값을 가지는 송장을 모두 반환한다. 송장은 데이터베이스테엇 찾을 수 있다. `IssuedInvoices` 클래스는 모든 송장을 검색하는 메서드를 이미 포함하고 있다.

해당 기능에 대한 구현사항은 다음과 같다.

```ts
export class InvoiceFilter {
  public lowValueInvoices(): Invoice[] {
    const dbConnection = new DatabaseConnection(); // 1
    const issuedInvoices = new IssuedInvoices(databaseConnection); // 2

    try {
      const all: Invoice[] = this.issuedInvoices.all();

      return all.filter((invoice) => invoice.getValue() < 100); // 3
    } finally {
      dbConnection.close(); // 4
    }
  }
}
```

1. 종속성 클래스 `IssuedInvoices`를 생성한다.
2. 데이터베이스로부터 모든 송장을 얻는다.
3. 값이 `100`보다 작은 것들을 고른다.
4. 데이터베이스 연결을 닫는다.

`IssuedInvoices` 클래스를 스텁으로 만들지 않고 테스트하려면 실제 데이터베이스를 설정해야한다. 이 방법은 작업량이 많다. 클래스 수행 전 데이터베이스를 구동하여 연결하고 일련의 송장을 저장한 후 테스트가 끝나면 데이터베이스의 연결을 끊어주여야한다.

```ts
describe('InvoiceFilter', () => {
  let invoices: IssuedInvoices;
  let dbConnection: DatabaseConnection;

  beforeEach(() => {
    // 1
    dbConnection = new DatabaseConnection();
    invoices = new IssuedInvoices(dbConnection);

    dbConnection.resetDatabase(); // 2
  });

  afterEach(() => {
    dbConnection.close(); // 3
  });

  it('filterInvoices', () => {
    const mauricio = new Invoice('Mauricio', 20); // 4
    const steve = new Invoice('Steve', 99); // 5
    const frank = new Invoice('Frank', 100); // 5
    invoices.save(mauricio); // 6
    invoices.save(steve); // 6
    invoices.save(frank); // 6

    const invoiceFilter = new InvoiceFilter(); // 7
    expect(invoiceFilter.lowValueInvoices()).toEqual([mauricio, steve]); // 8
  });
});
```

1. 모든 테스트가 실행되기 전 조건들을 설정한다.
2. 데이터베이스를 리셋한다.
3. 모든 테스트가 끝나면 데이터베이스의 연결을 끊는다.
4. 인메모리 송장을 생성한다.
5. 경계 테스트를 수행한다.
6. 데이터베이스에 해당 송장을 영속화한다.
7. `InvoiceFilter`를 초기화ㅘㄴ다.
8. 메서드가 작은 값을 가진 송장을 반환한다고 단언한다.

이 예제는 크기가 작다. 만약 데이터베이스 구조가 훨씬 더 복잡하다면 비용이 훨씬 많이 들게 될 것이다. 테스트를 다시 작성해보자. 이번에는 `IssuedInvoices`를 스텁으로 많을어서 데이터베이스와 관련된 일을 피해보자.

우선 `InvoiceFilter`가 `IssuedInvoice`를 주입받도록 수정한다.

```ts
export class InvoiceFilter {
  private issuedInvoices: IssuedInvoices;

  public constructor(issuedInvoices: IssuedInvoices) {
    this.issuedInvoices = issuedInvoices;
  }

  public lowValueInvoices(): Invoice[] {
    const dbConnection = new DatabaseConnection();

    try {
      const all = this.issuedInvoices.all();
      return all.filter((invoice) => invoice.getValue() < 100);
    } finally {
      dbConnection.close();
    }
  }
}
```

이제 `InvoiceFilter`에 대한 단위 테스트로 초점을 바꿔보자. `IssuedInvoices`에 대한 스텁을 구성하여 테스트를 진행하면 다음과 같다.

```ts
import { type MockProxy, mock } from 'jest-mock-extended';

import { DatabaseConnection } from './DatabaseConnection';
import { Invoice } from './Invoice';
import { InvoiceFilter } from './InvoiceFilter';
import { IssuedInvoices } from './IssuedInvoices';

describe('InvoiceFilter', () => {
  let invoices: MockProxy<IssuedInvoices>;
  let dbConnection: DatabaseConnection;

  beforeEach(() => {
    dbConnection = new DatabaseConnection();
    invoices = mock<IssuedInvoices>(); // 1

    dbConnection.resetDatabase();
  });

  afterEach(() => {
    dbConnection.close();
  });

  it('filterInvoices', () => {
    const mauricio = new Invoice('Mauricio', 20);
    const steve = new Invoice('Steve', 99);
    const frank = new Invoice('Frank', 100); // 2
    const listOfInvoices = [mauricio, steve, frank];

    invoices.all.mockReturnValue(listOfInvoices); //3

    const invoiceFilter = new InvoiceFilter(invoices); // 4
    expect(invoiceFilter.lowValueInvoices()).toEqual([mauricio, steve]); // 5
  });
});
```

1. `jest-mock-extended`의 모의 메서드를 사용해 `IssuedInvoices`의 스텁 인스턴스를 생성한다.
2. 송장을 생성한다.
3. `all` 메서드가 미리 정의된 송장을 반환하도록 한다.
4. 테스트 대상 클래스의 인스턴스를 생성하고 종속성으로 스텁을 전달한다.
5. 테스트를 진행한다.

`jest-mock-extended`의 `mock` api를 활용하여 `all` 메서드가 지정된 값을 반환하도록 하였다.

스텁은 테스트를 쉽게 작성해주고 테스트를 더 응집력 있게 해준다. `InvoiceFilter` 외의 다른 요소의 변경으로 인한 변경을 줄여준다. 즉, `IssuedInvoices`에 변경이 일어나면 `InvoiceFilter` 테스트에도 이를 전파해주어야한다.

## 모의 객체와 기댓값

다음으로 모의 객체에 대해 알아보자. 기존 시스템에 다음과 같은 요구사항이 생겼다.

> 작은 값을 가진 송장을 모두 `SAP(비즈니스 운영 관리 시스템)`으로 전송해야한다. `SAP`는 송장을 받기 위해 `sendInvoice` 웹 서비스를 제공한다.

이번에도 전체 `SAP` 시스템에 의존하지 않고 테스트를 하고 싶을 것이다. `SAPInvoiceSender` 클래스는 생성사를 통해 통신 클래스를 주입 받는다. `SAPInvoiceSender`의 주요 메서드인 `sendLowValuedInvoices`는 `InvoiceFilter`를 이용해 작은 값의 송장을 얻은 이후 결과를 전송한다.

```ts
import { Invoice } from '../stub/Invoice';
import { InvoiceFilter } from '../stub/InvoiceFilter';

import { SAP } from './SAP';

export class SAPInvoiceSender {
  private readonly filter: InvoiceFilter;

  private readonly sap: SAP;

  public constructor(filter: InvoiceFilter, sap: SAP) {
    this.filter = filter;
    this.sap = sap;
  }

  public sendLowValuedInvoices(): void {
    const lowValuedInvoices: Invoice[] = this.filter.lowValueInvoices();

    for (const invoice of lowValuedInvoices) {
      this.sap.send(invoice);
    }
  }
}
```

우선 `SAPInvoiceSender`를 테스트해보자. 테스트를 위해 `InvoiceFilter`를 스텁으로 만든다.

우리의 목적은 `InvoiceFilter`를 테스트하는 것이 아니다. 따라서 이 클래스를 스텁으로 만들어 테스트하려는 메서드를 테스트해야 한다. 스텁은 작은 값을 가진 송장 목록을 반환한다.

이 테스트의 주목적은 작은 송장들이 모두 `SAP`에 전송되는지 확인하는 것이다. 따라서 `SAP`의 `send()` 메서드의 호출 여부를 확인한다.

```ts
describe('SAPInvoiceSender', () => {
  const invoiceFilter = mock<InvoiceFilter>(); // 1
  const sap = mock<SAP>(); // 1
  const sender = new SAPInvoiceSender(invoiceFilter, sap); // 2

  it('sentToSap', () => {
    const mauricio = new Invoice('Mauricio', 20);
    const frank = new Invoice('Frank', 99);
    const invoices = [mauricio, frank];

    invoiceFilter.lowValueInvoices.mockReturnValue(invoices); // 3

    sender.sendLowValuedInvoices(); // 4

    expect(sap.send).toHaveBeenCalledTimes(2);
    expect(sap.send).toHaveBeenCalledWith(mauricio);
    expect(sap.send).toHaveBeenCalledWith(frank); // 5
  });
});
```

1. 모의 객체 인스턴스를 생성한다.
2. 테스트 대상 클래스에 전달한다.
3. `invoiceFilter` 스텁을 설정한다. `lowValueInvoices`의 반환 값을 지정한다.
4. 테스트 대상 메서드를 호출한다.
5. `send` 메서드가 두 송장에 대해 호출되었는지 확인한다.

스텁*stubbing* 과 모의*mocking* 의 차이점은 다음과 같다. 스텁은 메서드의 호출에 대해 하드 코딩한 값을 반환하지만 모의는 훨씬 더 구체적인 기댓값을 정의할 수 있게 해준다.

# 인수 포획

`SAP`에 송장을 전송하는 기능에 대해 변경사항이 생겼다고 하자.

> `SAP`는 이제 `Invoice` 엔티티를 직접 받지 않고 다른 형식으로 전송된 데이터를 받는다. `SAP`는 고객명, 송장 가격, 생성 ID가 필요하다.<br>ID는 다음과 같은 형식을 따른다: <날짜><고객코드><br>- 날짜 형식은 'MMddyyyy'이다. <br>- 고객 코드는 고객 이름의 첫 두글자이다. 고객 이름이 두글자보다 짧으면 `X`로 한다.

`SAP` 인터페이스를 바꿔서 `SAPInvoice`를 받도록 구현한다.

```ts
// SapInvoices.ts

export class SapInvoice {
  private readonly customer: string;
  private readonly value: number;
  private readonly id: string;

  public constructor(customer: string, value: number, id: string) {
    if (!customer || !id) {
      throw new Error('Customer and ID must be provided');
    }

    this.customer = customer;
    this.value = value;
    this.id = id;
  }

  public getCustomer(): string {
    return this.customer;
  }

  public getValue(): number {
    return this.value;
  }

  public getId(): string {
    return this.id;
  }
}

// SAPInvoiceSender.ts

export class SAPInvoiceSender {
  private readonly filter: InvoiceFilter;
  private readonly sap: SAP;

  public constructor(filter: InvoiceFilter, sap: SAP) {
    this.filter = filter;
    this.sap = sap;
  }

  public sendLowValuedInvoices(): void {
    const lowValuedInvoices: Invoice[] = this.filter.lowValueInvoices();

    for (const invoice of lowValuedInvoices) {
      const customer = invoice.getCustomer();
      const value = invoice.getValue();
      const sapId = this.generateId(invoice);

      const sapInvoice = new SapInvoice(customer, value, sapId);

      this.sap.send(sapInvoice);
    }
  }

  private generateId(invoice: Invoice): string {
    const date = new Date()
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '');
    const customer = invoice.getCustomer();

    return date + (customer.length > 2 ? customer.substring(0, 2) : 'X');
  }
}
```

기존의 `sendLowValuedInvoices` 메서드 내부에서 `InvoiceFilter`를 통해 계산된 `lowValuedInvoices`를 `SapInvoice`로 확장시켜 새로 생성하여 `send`에 주입한다.

해당 코드를 테스트하기 위해서는 `InvoiceFilter`를 스텁으로 만들어야한다.

```ts
it('sendToSapWithGeneratedId', () => {
  const mauricio = new Invoice('Mauricio', 20);
  const invoices = [mauricio];

  invoiceFilter.lowValueInvoices.mockReturnValue(invoices);

  sender.sendLowValuedInvoices();
  expect(sap.send).toHaveBeenCalledWith(expect.any(SapInvoice));
});
```

하지만 해당 테스트 코드에는 문제점이 존재한다. 과연 `send`와 함꼐 호출된 인자의 ID가 옳다고 할 수 있을까?

```ts
it.each([
  ['Mauricio', 'Ma'],
  ['M', 'X'],
])('sendToSapWithTheGeneratedId', (customer, initialId) => {
  const mauricio = new Invoice(customer, 20);
  const invoices = [mauricio];

  invoiceFilter.lowValueInvoices.mockReturnValue(invoices);

  sender.sendLowValuedInvoices();

  const date = new Date()
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '');

  expect(sap.send).toHaveBeenCalledWith(expect.any(SapInvoice));
  expect(sap.send).toHaveBeenCalledWith(new SapInvoice(customer, 20, date + initialId));
});
```

이를 해결하기 위해서 toHaveBeenCalledWith가 올바른 `SapInvoice`와 함께 호출되었는지를 확인하자.

# 예외 시뮬레이션

개발자는 어떤 문제가 발생하면 `SAP`의 `send`가 `SAPException`을 던질 수 있다는 것을 알았다. 이에 대한 요구사항은 다음과 같다.

> 시스템은 전송에 실패한 송장 목록을 반환한다. 실패가 일어나더라도 프래고램은 멈추지 않으며, 재시도가 이루어진다.

간단한 구현 방법은 예외를 잡는것이다.

```ts
public sendLowValuedInvoices() {
  const lowValuedInvoices: Invoice[] = this.filter.lowValueInvoices()
  for (const invoice of lowValuedInvoices) {
    const customer = invoice.getCustomer()
    const value = invoice.getValue()
    const sapId = this.generateId(invoice)
    const sapInvoice = new SapInvoice(customer, value, sapId)
    try {
      this.sap.send(sapInvoice)
    } catch {
      this.failedInvoices.push(invoice)
    }
  }
  return this.failedInvoices
}
```

이것을 어떻게 테스트 해야할까? 아마 `sap` 모의 객체에 송장 중 하나의 예외를 던지도록 강요해야 할 것이다.

```ts
it('returnFailedInvoices', () => {
  const mauricio = new Invoice('Mauricio', 20);
  const frank = new Invoice('Frank', 25);
  const steve = new Invoice('Steve', 48);

  const invoices = [mauricio, frank, steve];
  invoiceFilter.lowValueInvoices.mockReturnValue(invoices);

  sap.send.mockImplementation((invoice: SapInvoice) => {
    if (invoice.getCustomer() === 'Frank') {
      // 1
      throw Error();
    }
  });

  const date = new Date()
    .toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '');

  const failedInvoices = sender.sendLowValuedInvoices(); // 2
  expect(failedInvoices).toEqual(expect.arrayContaining([frank])); // 3

  const mauricioInvoice = new SapInvoice('Mauricio', 20, date + 'Ma'); // 4
  expect(sap.send).toHaveBeenNthCalledWith(1, mauricioInvoice);
  const steveInvoice = new SapInvoice('Steve', 48, date + 'St'); // 4
  expect(sap.send).toHaveBeenNthCalledWith(3, steveInvoice);
});
```

1. `send`의 인자로 `frank`가 들어올 시 에러를 반환하도록 구성한다.
2. 실패한 송장 목록을 받는다.
3. 실패한 송장 목록 내에 `frank`가 존재하는지 확인한다.
4. 마우리시오와 스티브의 송장을 전송 시도하였는지 확인한다.

모의 객체가 예외를 던지도록 구성함으로써 예외 처리에 대한 테스트를 진행할 수 있었다.
또한 요구사항인 `실패가 일어나더라도 모든 송장을 보내려고 시도한다.`라는 명세도 테스트에서 확인 할 수 있었다.

# 현업에서의 모의 객체

모의 객체에 대한 개발자의 시각은 다양한다. 어떤 개발자는 모의 객체를 적극적으로 찬성하고, 누군가는 모의를 하면 안된다고 믿는 개발자도 있다. 모의 객체가 테스트를 덜 현실적으로 만드는 것은 사실이다.

## 모의 객체의 단점

어떤 개발자는 모의 객체를 사용하는건 테스트 스위트가 **코드가 아니라 모의 객체를 테스트**하도록 만든다고 한다. 실제로 모의 객체를 사용함으로써 수정사항을 테스트 스위트가 놓치는 경우 또한 종종 발생한다.

모의 객체가 대규모로 잘 작동하게 하려면 계약을 신경 써서 설계 해야한다. 계약이 안정적이라면 모의 객체 사용을 두려워하지 않아도 된다.

또 다른 단점으로는, 모의 객체를 사용하는 테스트는 자연스럽게 모의 객체를 사용하지 않는 테스트보다 코드와 결합하게 된다. 위에 적힌 우리의 코드와 같이 모의 객체를 사용하는 테스트는 제품 코드에 대해 무언가를 알고 있게 된다. 이는 테스트 코드의 변경을 힘들게 만든다.

## 모의해야하는 대상과 하지 말아야 하는 대상

모의 객체와 스텁은 테스트를 단순하게 해주지만 **지나친 모의** 역시 문제가 된다. 진짜 의존성을 사용하는 테스트는 테스트 더블을 사용하는 테스트보다 실질적이다.

실용적으로 의존성이 다음과 같을 경우 모의 객체나 스텁을 사용한다.

### 모의를 사용하는 경우

**의존성이 너무 느린 경우**: 의존 대상이 너무 느리다면 이것을 시뮬레이션하는 것은 좋은 생각이다.

**의존성이 외부 인프라와 통신하는 경우**: 의존성이 외부 인프라와 통신한다면, 외부 인프라를 다루는 클래스에 의존하는 클래스를 테스트 할때, 의존성을 모의한다. 이후 해당 클래스에 대한 통합 테스트를 진행한다.

**의존성을 시뮬레이션하기 힘든 경우**: 의존 대상을 시뮬레이션하기 힘든 경우 모의가 도움이 된다. 흔히 볼 수 있는 예로는 예외 처리가 존재한다.

### 모의를 사용하지 않는 경우

**엔티티**: 엔티티는 비즈니스 개념을 표현하는 클래스다. 비즈니스 시스템에서 엔티티는 보통 다른 엔티티에 의존한다. 어떤 엔티티를 만들 때 다른 엔티티 인스턴스를 만들어야 한다. 예를 들어 `ShoppingCart`를 테스트 하려면 `Product`가 필요하다. 모의를 할 수도 있지만 엔티티의 경우 모의하는데 오히려 더 많은 공수가 들게 된다.

**네이티브 라이브러리와 유틸리티 메서드**: 프로그래밍 언어에 있는 라이브러리나 유틸리티 메서드 또한 모의하지 않는다. 예를 들어 우리는 `moment.js`의 `format`을 모의할 타당한 이유가 존재하지 않는다.

**충분히 단순한 의존성**: 단순한 클래스는 모의할 가치가 없다.

## 날짜 및 시간 래퍼

소프트웨어 시스템은 날짜와 시간 정보를 자주 다룬다. 날짜 및 시간 연산은 흔하게 일어나기 때문에 전용 클래스로 감싸는게 좋다.

> _🤔 작성자의 생각_ <br>날짜를 가공하기 위해 존재하는 서비스 클래스가 없는 경우 jest에서는 [timer mocks](https://jestjs.io/docs/timer-mocks)가 더 적절할 수도 있을 것 같다.

# 관련 repositories

- [original code (java)](https://github.com/effective-software-testing/code/blob/main/ch6)
- [typescript ver.](https://github.com/cobocho/effective-software-testing-typescript/tree/main/ch06)
