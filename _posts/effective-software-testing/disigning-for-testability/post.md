---
title: '이펙티브 소프트웨어 테스팅 with Typescript -테스트 가능성을 위한 설계-'
description: '테스트로부터 뽑아내는 객체지향'
date: '2024/05/19'
tags: ['테스트', 'jest']
---

> 해당 포스트는 도서 [이펙티브 소프트웨어 테스팅(Effective Software Testing)](https://www.effective-software-testing.com)을 `Typescript`와 `Jest` 테스팅 프레임워크를 기준으로 해석한 내용입니다. **코드 변환간 불일치**가 존재할 수 있습니다.

소프트웨어를 테스트하면서 우리는 가끔씩 **"어떤 시스템은 테스트하기 너무 힘들다"** 라는 생각을 하게 된다. 만약 어떠한 클래스 하나를 테스트하기 위해서 세 가지의 웹 서비스를 구축하고, 서로 다른 폴더에 다섯 개의 파일을 만들고, 데이터베이스를 특정 상태로 설정해야 한다면, 이는 테스트를 진행하는데 너무 많은 비용을 지불해야한다.

이번에는 **테스트 가능성**이 높은 소프트웨어를 설계함으로써 얻을 수 있는 이점에 대해 얘기해보려한다. 과연 언제 우리는 테스트를 고려해야 할까? 정답은 **언제나**이다.

# 도메인 코드에서 인프라 코드를 분리하기

테스트 가능성을 올리기 가장 좋은 아키텍쳐 중 하나는 바로 **도메인 코드에서 인프라 코드를 분리하는 것**이다.

도메인에는 비즈니스 규칙, 로직, 엔티티 같은 시스템의 핵심들로 이루어져 있다. 반대로 인프라에는 데이터베이스 쿼리나 파일 시스템 같은 외부 의존성을 다루는 코드로 이루어져 있다.

도메인 코드와 인프라 코드가 함께 작성된 고전적인 코드에서는 여러 문제가 발생한다. 우선 도메인이 인프라와 강한 의존성을 가지게 되면서 인프라에 대한 모의를 구성하기가 힘들어진다. 추가로 한 클래스에 너무 많은 책임이 부여되며 버그가 발생할 확률이 커진다.

소프트웨어의 아키텍쳐는 언제나 **명확한 책임 분리**가 이루어져야 한다. 이를 설명하기 좋은 아키텍쳐로 **육각형 아키텍쳐(포트와 어댑터 패턴)** 이 있다. 육각형 아키텍쳐는 도메인이 인프라에 직접 의존하는 대신, 인프라의 행동을 정의한 인터페이스인 **포트**에 의존하도록 구현한다. 포트는 인프라에 인터페이스로서 실제 구현체와는 완전히 분리되며, 인프라의 구현체는 포트를 기반으로 구현된 **어댑터**에서 이루어진다.

![육각형 아키텍쳐](1.png)

육각형 아키텍쳐에서 애플리케이션의 비즈니스 로직은 인프라같은 외부에 의존하지 않고 인터페이스에 의존한다. 이를 설명하는 간단한 쇼핑몰 예제를 만들어 보자. 요구사항은 다음과 같다.

1. 결제가 완료되면 쇼핑 카트를 배송 준비 상태로 설정하고 새로운 상태를 데이터베이스에 영속화한다.
2. 상품을 고객에게 전달해야 한다고 배송 센터에 알린다.
3. `SAP` 시스템에 알린다.
4. 고객에게 결제 성공에 대한 메일을 보낸다. 여기엔 배송 예상 날짜가 포함되며, 이는 배송 센터 API를 통해 얻을 수 있다.

육각형 아키텍쳐의 첫번째는 애플리케이션(육각형)에 속한 것과 그렇지 않은 것을 구분해야한다.
`ShoppingCart` 클래스의 비즈니스 규칙이나 전체 흐름에 대한 작업은 확실히 육각형이다. 하지만 이메일 전송, 데이터 베이스, `SAP` 통신, 배송 센터 API 연결 같은 기능은 모두 외부 시스템, 즉 인프라에 해당된다. 우리는 이 정보들을 기반으로 어댑터와 포트를 구분해서 구현해야한다.

`PaidShoppingCartsBatch` 클래스를 구현하면 다음과 같은 코드가 나온다.

```ts
class PaidShoppingCartsBatch {
  private db: ShoppingCartRepository;
  private deliveryCenter: DeliveryCenter;
  private notifier: CustomerNotifier;
  private sap: SAP;

  constructor(
    db: ShoppingCartRepository,
    deliveryCenter: DeliveryCenter,
    notifier: CustomerNotifier,
    sap: SAP,
  ) {
    this.db = db;
    this.deliveryCenter = deliveryCenter;
    this.notifier = notifier;
    this.sap = sap; // 1
  }

  public processAll(): void {
    const paidShoppingCarts: Array<ShoppingCart> = this.db.cartsPaidToday();

    for (const cart of paidShoppingCarts) {
      // 2
      const estimatedDayOfDelivery: Date = this.deliveryCenter.deliver(cart); // 3

      cart.markAsReadyForDelivery(estimatedDayOfDelivery);
      this.db.persist(cart); // 4

      this.notifier.sendEstimatedDeliveryNotification(cart); // 5

      this.sap.cartReadyForDelivery(cart); // 6
    }
  }
}
```

1. 생성자를 통해 의존성을 주입받는다. 이를 통해 우리는 **인프라에 대한 모의 객체를 전달할 수 있다.**
2. 결제가 완료된 카트를 순회한다.
3. 배송 시스템에 알린다.
4. 배송 준비를 완료 상태로 만들고 데이터베이스에 영속화한다.
5. 완료 이메일을 전송한다.
6. `SAP`에 알린다.

위 코드에서 가장 주목해야할 점은 2가지가 있다.

1. 외부 의존성(인프라)을 직접 생성하는 것이 아니라 주입받는다.
2. 인프라 코드를 의존하지 않고 인터페이스를 의존한다.

각 포트의 인터페이스는 다음과 같다.

```ts
interface DeliveryCenter {
  deliver(cart: ShoppingCart): Date;
} // 1

interface CustomerNotifier {
  sendEstimatedDeliveryNotification(cart: ShoppingCart): void;
} // 2

interface ShoppingCartRepository {
  cartsPaidToday(): ShoppingCart[];
  persist(cart: ShoppingCart): void;
} // 3

interface SAP {
  cartReadyForDelivery(cart: ShoppingCart): void;
}
```

1. `DeliveryCenter`의 구현체는 아마 아주 복잡한 웹 서비스가 구현될 것이다. 하지만 포트를 통해 이를 추상화한다. 포트는 비즈니스 언어로 얘기하고 인프라 내부를 나타내지 않는다.
2. `CustomerNotifier`에도 동일하게 작동한다.
3. 심지어 이 인터페이스는 이름에 데이터베이스 조차 없다. `repository`라는 용어가 더 비즈니스적이다.

이제 우리는 어댑터를 구현하면 된다. 이는 스켈레톤 코드로 대체한다.

```ts
class DeliveryCenterRestApi implements DeliveryCenter {
  public deliver(cart: ShoppingCart): Date {
    // all the code required to communicate
    // with the delivery API
    // and returns a LocalDate
    return new Date();
  }
}

class SAPSoapWebService implements SAP {
  public cartReadyForDelivery(cart: ShoppingCart): void {
    // all the code required to send the
    // cart to SAP's SOAP web service}
  }
}

class SMTPCustomerNotifier implements CustomerNotifier {
  public sendEstimatedDeliveryNotification(cart: ShoppingCart): void {
    // all the required code to
    // send an email via SMTP
  }
}

class ShoppingCartHibernateDao implements ShoppingCartRepository {
  public cartsPaidToday(): ShoppingCart[] {
    // a hibernate query to get the list of all
    // invoices that were paid today
    return [new ShoppingCart(1000)];
  }

  public persist(cart: ShoppingCart): void {
    // a hibernate code to persist the cart
    // in the database
  }
}
```

이러한 패턴의 장점은 아까도 말했듯이 도메인이 포트(인터페이스)에 의존함으로써 테스트 과정에서 모의 객체를 넘기기 훨씬 쉬워진다. 이는 우리가 인프라의 동작을 시뮬레이션하기 쉬워진다는 의미이기도 하다.

```ts
describe('PaidShoppingCartsBatch', () => {
  const db = mock<ShoppingCartRepository>();
  const deliveryCenter = mock<DeliveryCenter>();
  const notifier = mock<CustomerNotifier>();
  const sap = mock<SAP>();

  it('should process all paid shopping carts', () => {
    const batch = new PaidShoppingCartsBatch(db, deliveryCenter, notifier, sap); // 1

    const someCart = new ShoppingCart(100); // 2
    const someCartReadyForDelivery = jest.spyOn(someCart, 'markAsReadyForDelivery');
    const someDate = new Date();

    db.cartsPaidToday.mockReturnValue([someCart]);
    deliveryCenter.deliver.mockReturnValue(someDate);

    batch.processAll();

    expect(deliveryCenter.deliver).toHaveBeenCalledWith(someCart); // 3
    expect(notifier.sendEstimatedDeliveryNotification).toHaveBeenCalledWith(someCart);
    expect(db.persist).toHaveBeenCalledWith(someCart);
    expect(sap.cartReadyForDelivery).toHaveBeenCalledWith(someCart);
    expect(someCartReadyForDelivery).toHaveBeenCalledWith(someDate);
  });
});
```

1. 테스트 대상 클래스는 모의 객체를 의존성으로 전달받는다.
2. `ShoppingCart`는 단순한 엔티티이므로 모의하지 않는다. 대신 상호작용을 체크하기 위해 스파이를 설정한다.
3. 의존성과 상호작용이 기대한대로 일어났는지 테스트한다.

육각형 아키텍쳐를 통해 위와 같이 모의 객체를 통한 테스트를 진행할 수 있다.

육각형 아키텍쳐에 대한 의문점 중에는 **모든 포트에 대한 인터페이스가 존재해야 하나** 라는 의문이 있다. 정답은 없다. 상황에 따라 실용성 있는 선택을 해야한다.

# 의존성 주입과 제어 가능성

우리는 도메인 코드를 인프라 코드와 분리하는 것이 아키텍쳐 수준에서 주요 관심사라는 것을 알았다. 우리는 클래스 완전히 **제어** (즉, 테스트 대상 클래스의 행위를 쉽게 제어할 수 있고), **관찰** (테스트 대상 클래스에서 무슨 일이 일어나는지 알 수 있도록) 해야 한다.

이번에는 반대 케이스를 확인해보자.

```ts
class VeryBadPaidShoppingCartsBatch {
  public processAll(): void {
    const db = new ShoppingCartHibernateDao(); // 1
    const paidShoppingCarts = db.cartsPaidToday();

    for (const cart of paidShoppingCarts) {
      const deliveryCenter = new DeliveryCenterRestApi(); // 2
      const estimatedDayOfDelivery = deliveryCenter.deliver(cart);

      cart.markAsReadyForDelivery(estimatedDayOfDelivery); // 3
      db.persist(cart); // 3

      const notifier = new SMTPCustomerNotifier(); // 4
      notifier.sendEstimatedDeliveryNotification(cart);

      const sap = new SAPSoapWebService(); // 5
      sap.cartReadyForDelivery(cart);
    }
  }
}
```

1. 데이터베이스 어댑터 인스턴스를 생성한다. 테스트 가능성을 해친다!
2. 배송 시스템에 알리기 위한 어댑터를 생성한다. 테스트 가능성을 해친다!
3. 배송 준비 완료 상태를 데이터베이스에 영속화한다.
4. 어댑터를 사용해 메일을 보낸다. 테스트 가능성을 해친다!
5. 어댑터를 사용해 `SAP`에 알린다. 테스트 가능성을 해친다!

전통적인 방식의 코드에서는 의존성을 직접 생성하면서 클래스 내부를 제어하기 힘들고 모의 객체 단위로 테스트하기 힘들어진다.
이러한 문제점은 생성자를 통해 의존성을 받거나 세터*setter*를 사용해 의존성을 주입할 수 있다.

도메인과 인프라가 서로 가질 추상적인 상호작용을 인터페리스를 통해 연결하면서, 우리는 관심사를 더 잘 분리하고 계층간 결합을 줄일 수 있다.

우리 코드는 언제나 가능한 추상화에 의존해야한다.

# 클래스와 메서드를 관찰 가능하게 하기

클래스 수준에서의 관찰 가능성은, 기대 동작을 얼마나 쉽게 단언할 수 있는지에 달려있다. 이는 상황별로 다음과 같이 해결 가능하다.

- 클래스가 단언이 필요한 객체를 생성하는가? 그렇다면 클래스에 `getListOfSomething` 메서드를 만들어 테스트 도중 객체 목록을 생성해서 사용할 수 있게하자.
- 클래스가 다른 클래스를 호출하는가? 의존성을 모의할 수 있도록하자.
- 클래스가 내부에서 속성을 변경하는데 속성에 대한 게터를 제공할 수 없는가? 클래스에 간단한 `isValid` 메서드를 제공해서 클래스가 유효한 상태인지를 반환하자.

테스트 보조 수단으로서 해결책을 도입하는 것을 마다하지 말자.

## 단언을 보조하는 메서드 도입하기

이전에 진행한 테스트의 경우 대부분 포트와의 상호작용에 관한다. 하지만 코드에서 `ShoppingCart`의 스파이를 설정하는 부분이 거슬린다. 이를 해결할 수는 없을까?

```ts
class ShoppingCart {
  private readyForDelivery: boolean = false;
  private value: number = 0;

  public constructor(value: number) {
    this.value = value;
  }

  public markAsReadyForDelivery(estimatedDayOfDelivery: Date): void {
    this.readyForDelivery = true;
  }

  public isReadyForDelivery(): boolean {
    return this.readyForDelivery;
  }

  public getValue(): number {
    return this.value;
  }
}
```

이를 위해서 `isReadyForDelivery`메서드를 만들어 주자. `isReadyForDelivery`는 카트가 배송 준비 상태인지 쉽게 알 수 있다.

```ts
describe('PaidShoppingCartsBatch', () => {
  const db = mock<ShoppingCartRepository>();
  const deliveryCenter = mock<DeliveryCenter>();
  const notifier = mock<CustomerNotifier>();
  const sap = mock<SAP>();

  it('should process all paid shopping carts', () => {
    const batch = new PaidShoppingCartsBatch(db, deliveryCenter, notifier, sap);

    const someCart = new ShoppingCart(100);
    const someDate = new Date();

    db.cartsPaidToday.mockReturnValue([someCart]);
    deliveryCenter.deliver.mockReturnValue(someDate);

    batch.processAll();

    expect(deliveryCenter.deliver).toHaveBeenCalledWith(someCart);
    expect(notifier.sendEstimatedDeliveryNotification).toHaveBeenCalledWith(someCart);
    expect(db.persist).toHaveBeenCalledWith(someCart);
    expect(sap.cartReadyForDelivery).toHaveBeenCalledWith(someCart);
    expect(someCart.isReadyForDelivery()).toBe(true);
  });
});
```

해당 메서드를 사용하면 더이상 스파이 없이 테스트를 작성할 수 있게 된다.

물론 모든 관찰 가능성을 이슈를 해결하기 위해서 게터를 추가하는 것은 권하지 않는다. 우리가 원하는 것을 추상화하자.

## `void` 메서드의 행위를 관찰하기

어떤 메서드는 값을 반환하지만 `void`를 반환하는 메서드는 값을 반환하지 않는다. 다음은 할부를 생성하는 `InstallmentGenerator` 클래스이다.

```ts
class InstallmentGenerator {
  private repository: InstallmentRepository;

  constructor(repository: InstallmentRepository) {
    this.repository = repository; // 1
  }

  public generateInstallments(cart: ShoppingCart, numberOfInstallments: number): void {
    let nextInstallmentDueDate = new Date(); // 2
    const amountPerInstallment: number = cart.getValue() / numberOfInstallments; // 3

    for (let i = 1; i <= numberOfInstallments; i++) {
      // 4
      nextInstallmentDueDate = new Date(
        nextInstallmentDueDate.setMonth(nextInstallmentDueDate.getMonth() + 1),
      ); // 5

      const newInstallment = new Installment(nextInstallmentDueDate, amountPerInstallment);
      this.repository.persist(newInstallment); // 5
    }
  }
}
```

1. `InstallmentRepository`의 스텁을 주입할 수 있다.
2. 다음 할부금 지불일을 저장할 변수를 만든다.
3. 할부 금액을 계산한다.
4. 연속해서 월별 할부 객체를 생성한다.
5. 월에 `1`을 더한다.
6. 할부 객체를 생성해서 영속화한다.

이 메서드를 테스트하려면 `Installment`을 검사해야한다. 문제는 이를 어떻게 얻느냐이다. 이를 해결하기 위해서 주입한 객체를 통해 호출된 값을 확인하고 이에 대해 단언문을 작성하는 것이다. 다음 테스트는 가격이 `100`인 쇼핑 카트를 생성하고 할부 생성기에 10개의 할부를 생성하는 테스트이다.

```ts
describe('InstallmentGenerator', () => {
  const repository = mock<InstallmentRepository>(); // 1

  it('checkInstallments', () => {
    const generator = new InstallmentGenerator(repository); // 2

    const cart = new ShoppingCart(100);
    generator.generateInstallments(cart, 10); // 3

    expect(repository.persist).toHaveBeenCalledTimes(10); // 4
    const allInstallments = repository.persist.mock.calls; // 5

    expect(allInstallments).toHaveLength(10);

    allInstallments.forEach((installment, idx) => {
      expect(installment[0].getValue()).toBe(10); // 6
      const dueDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + idx + 1,
        new Date().getDate(),
      );
      expect(installment[0].getDate()).toEqual(dueDate); // 7
    });
  });
});
```

1. 저장소 모의 객체를 생성한다.
2. 테스트 대상 클래스에 모의 객체를 전달한다.
3. 테스트 대상 메서드를 호출한다.
4. 호출이 10번 이루어졌는지 단언한다.
5. 호출된 인자를 가져온다.
6. 호출된 인자의 값이 모두 `100`인지 단언한다.
7. 할부가 한 달 간격으로 이루어져 있는지 단언한다.

`mock.calls`를 통해 인자의 호출값을 가져오도록 테스트를 작성하였다. 다른 방법은 없을까? 만약 **생성된 모든 할부를 얻을 수 있는** 메서드가 존재한다면 더 단순할 것이다.

```ts
class InstallmentGenerator {
  private repository: InstallmentRepository;

  private generatedInstallments: Installment[] = []; // 생성된 할부를 담을 배열을 생성한다.

  public constructor(repository: InstallmentRepository) {
    this.repository = repository;
  }

  public generateInstallments(cart: ShoppingCart, numberOfInstallments: number): void {
    let nextInstallmentDueDate = new Date();
    const amountPerInstallment: number = cart.getValue() / numberOfInstallments;

    for (let i = 1; i <= numberOfInstallments; i++) {
      nextInstallmentDueDate = new Date(
        nextInstallmentDueDate.getFullYear(),
        nextInstallmentDueDate.getMonth() + 1,
        nextInstallmentDueDate.getDate(),
      );

      const newInstallment = new Installment(nextInstallmentDueDate, amountPerInstallment);

      this.generatedInstallments.push(newInstallment); // 생성된 할부를 저장한다.
      this.repository.persist(newInstallment);
    }
  }

  public getGeneratedInstallments() {
    return this.generatedInstallments; // 할부 목록을 반환한다.
  }
}
```

이제 테스트 코드에서 인수 포집기를 제거할 수 있다.

```ts
describe('InstallmentGenerator', () => {
  const repository = mock<InstallmentRepository>();

  it('checkInstallments', () => {
    const generator = new InstallmentGenerator(repository);

    const cart = new ShoppingCart(100);
    generator.generateInstallments(cart, 10);

    expect(repository.persist).toHaveBeenCalledTimes(10);

    const allInstallments = generator.getGeneratedInstallments();
    expect(allInstallments).toHaveLength(10);

    allInstallments.forEach((installment, idx) => {
      expect(installment.getValue()).toBe(10);
      const dueDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + idx + 1,
        new Date().getDate(),
      );
      expect(installment.getDate()).toEqual(dueDate);
    });
  });
});
```

다시 말하지만, 이 예제를 그대로 받기 보다는 테스트 가능성을 개선해주는 작은 설계에 긍정적인 마음을 가지자. 실용주의가 핵심이다.

# 현업에서의 테스트 가능성 설계

개발 도중 테스트를 작성하면 엄청난 이점을 누린다. 테스트에 관심을 두면 테스트하려는 코드의 설계의 대한 힌트를 얻을 수 있다. 클래스를 훌륭하게 설계하는 것은 객체 지향에서 어려운 작업이다.

_'테스트가 코드 설계에 대해 피드백을 제공한다'_ 라는유행어는 테스트 코드의 모든 작업이 제품 코드의 클래스를 수행한다는 사실에서 기인했다. 만약 테스트를 수행하기 어려운 클래스나 메서드가 존재한다면 의존성을 줄여서 설계할 방법을 찾아보게 될 것이다.

## 테스트 대상 클래스의 응집도

응집도란 아키텍처상의 모듈, 클래스, 메서드 또는 어떤 요소든지 단 하나의 책임을 가지는 것을 의미한다. 여러 책임이 있는 클래스는 책임이 적은 클래스에 비해 복잡하고 이해하기 어렵다. 단일 책임을 결정하는 것은 까다롭다.

테스트에서 이 개념을 적용해보자.

**응집력이 없는 클래스에 대한 테스트는 거대하다**: 이런 클래스는 테스트가 필요한 많은 행위를 한다. 만약 테스트의 수가 너무 많아질 때는 클래스나 메서드가 맡은 책임이 너무 거대하지 않은지 확인해보자.

**응집력이 없는 클래스는 크기가 커지는 일을 멈추지 않는다**: 우리는 클래스가 어떤 시점이 되면 안정화 되기를 기대한다. 하지만 항상 동일한 클래스에서 기능을 추가한다면, 설계가 나쁜 것일 수도 있다.

## 테스트 대상 클래스의 결합

응집력 있는 클래스를 사용하면, 여러 클래스를 조합해서 큰 행위를 구성한다. 하지만 이 경우 결합도가 높아질 수 있다. 테스트를 통해 결합도가 높은 코드를 발견할 수 있다.

만약 제품 코드를 테스트할때 수많은 의존성 인스턴스가 필요하다면, 설계를 다시 생각해 볼 필요가 있다.

또 다른 징후로 어떠한 클래스를 테스트하였는데 다른 클래스에서 에러가 나는 경우이다. 이 경우 설계 오류를 다음 버전에서 예방할 수 있는지 확인할 시점이다.

# 관련 repositories

- [original code (java)](https://github.com/effective-software-testing/code/blob/main/ch7)
- [typescript ver.](https://github.com/cobocho/effective-software-testing-typescript/tree/main/ch07)
