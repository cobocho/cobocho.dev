---
title: '[우아한테크코스 프리코스] 요구사항 랜덤 디펜스'
description: '생각보다 4주라는 시간은 짧다.'
thumbnail: '/assets/blog/woowa-tech/christmas/thumbnail.png'
date: '2023/11/16'
tags: ['우아한테크코스', '프리코스', '객체지향', 'TDD']
---

우아한테크코스 프리코스의 마지막 주차가 끝이 났다.
마무리를 장식할 피날레 미션으로 예상 밖의 난이도를 가진 문제가 나왔고 그 과정에서 고민한 부분들 또한 굉장히 많았다. 요구사항이 이전 미션들에 비해서 훨씬 많아지다보니 도메인을 나누는데에도 생각해야할 요소들이 훨씬 늘어난 부분이 있다.
마지막 주차를 진행하면서 느낀 여러가지 감정들과 생각들을 블로그에 정리해보려한다.

# 요구사항의 향연

## 리드미의 압박

![어...? (요구사항을 읽고 있는 모습)](/assets/blog/woowa-tech/christmas/1.png)

이번 미션의 가장 큰 특징은 바로 **"지난 미션들과는 비교가 안 되는 요구사항"**
기존 미션들의 경우는 요구사항이 꽤나 자유롭게 주어졌다.

1주차 숫자 야구는 **3개의 1~9 범위의 중복되지 않는 숫자**
2주차 자동차 경주는 **0~9의 난수와 자동차 이동의 트레숄드**
3주차 로또의 경우는 **1~45의 6개의 중복되지 않는 숫자**

지난 모든 미션이 요구사항을 간단히 정리할 수 있을 정도로, 오히려 요구사항이 적어서 개발자의 의도를 최대한 반영하려는 것처럼 느껴지는 요구사항들로 미션이 이루어지다가 마지막주차 크리스마스 프로모션 미션의 경우는 굉장히 많고 세세한 요구조건이 주어졌다.

![내가 요구사항을 조금씩 설정한건 추진력을 얻기 위함이었다](/assets/blog/woowa-tech/christmas/2.png)

마지막 미션 레포지토리가 공개되자마자 디스코드에서 울려퍼지는 수 많은 물음표 핑

_'지원자를 당황시키려는 공명의 함정인가...?'_ 라고 잠시 생각하였지만, 오히려 객체지향의 여러 요소들을 실제로 코드에 녹여 볼 수 있을 것 같다는 점이 꽤나 흥미롭게 느껴졌다. 이전 미션들의 경우에는 미션의 볼륨이 작다보니 도메인을 쪼개는데에도 한계가 존재했기에 상속이나 조합, 다형성을 활용하는데 제약이 존재하였다. 반대로 생각해보니 이전 공통 피드백에 지속적으로 언급된 **클래스를 분리하자**라는 피드백을 최대한 반영시킬 수 있을만한 미션을 제시한 것 처럼 느껴지기도 했다.

# 도메인 설계

![코드를 보기 전에 간단하게 도메인을 이미지화 시켜보았다](/assets/blog/woowa-tech/christmas/3.png)

도메인을 설계하기 이전에, 해당 프로모션이 현실의 레스토랑에서 적용될 때의 과정을 시뮬레이션해보았다.
위 그림은 내 코드 내 도메인들을 간단(?)하게 이미지화 시켜놓은 그림이다.

## 공통된 로직을 찾아라

우선적으로 요구사항의 가장 공통되는 로직을 찾으려고 요구사항을 꼼꼼히 읽어보았다.
그리고 찾아낸 결론은 **이벤트 기간**.
모든 프로모션에는 이벤트 기간, 일정, 혹은 특정 일자에만 프로모션을 진행하도록 요구되었다.

전체 이벤트 기한으로 12월 이내
크리스마스 디데이 할인은 12월 1일부터 크리스마스 당일
평일, 주말로 나뉘어지는 요일 할인
특정 일자에만 할인이 주어지는 특별 할인까지,

모든 비즈니스로직에 날짜와 관련된 조건이 존재한다고 결론을 내렸다.
이를 바탕으로 아래의 도메인들을 설계하였다.

## Scheduler(일정 관리자)

```js
class Scheduler {
  /**
   * 스케쥴러의 날짜 제한입니다.
   * @readonly
   */
  static DATE_LIMIT = {
    minYear: 2000,
    maxYear: 2099,
  };

  /**
   * 스케쥴러의 에러 메세지입니다.
   * @readonly
   */
  static ERROR_MESSAGES = {
    invalidDate: '유효하지 않은 날짜입니다!',
    invalidPeriod: '시작일을 종료일보다 이전으로 설정해주세요!!',
  };

  /**
   * 이벤트 일자가 담길 Set입니다.
   * @type {Date[]}
   */
  #eventDate = [];

  static of() {
    return new Scheduler();
  }

  /**
   * 이벤트 일정에 date가 존재하는지 확인합니다.
   * @param {Date} date - 이벤트 일정인지 확인할 일자입니다.
   * @returns {boolean} 이벤트 일자의 이벤트 진행 여부입니다.
   */
  isEventDate(date) {
    this.#validateDate(date);
    return this.#eventDate.some((day) => isSameDate(day, date));
  }

  /**
   * 이벤트 일정에 date를 추가합니다.
   * @param {Date} date - 이벤트 일정에 추가할 일자입니다.
   */
  addEventDate(date) {
    this.#validateDate(date);
    this.#eventDate.push(date);
  }

  /**
   * 이벤트 일정에 해당 기간을 추가합니다.
   * @param {Date} start 이벤트 시작일입니다.
   * @param {Date} end 이벤트 종료일입니다.
   */
  addEventPeriod(start, end) {
    this.#validatePeriod(start, end);
    const currentDate = new Date(start);
    while (currentDate <= end) {
      this.addEventDate(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  #validatePeriod(start, end) {
    this.#validateDate(start);
    this.#validateDate(end);
    if (end < start) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidPeriod);
    }
  }

  /**
   * 이벤트 일정에 해당 월을 추가합니다.
   * @param {Date} year 이벤트 년도입니다.
   * @param {Date} month 이벤트 월입니다.
   */
  addEventMonth(year, month) {
    this.#validateEventMonth(year, month);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    this.addEventPeriod(startDate, endDate);
  }

  #validateDate(date) {
    if (isInvalidDate(date)) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidDate);
    }
  }

  #validateEventMonth(year, month) {
    if (isOutOfRange(year, { min: Scheduler.DATE_LIMIT.minYear, max: Scheduler.DATE_LIMIT.maxYear })) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidDate);
    }
    const january = 1;
    const december = 12;
    if (isOutOfRange(month, { min: january, max: december })) {
      throw new ApplicationError(Scheduler.ERROR_MESSAGES.invalidDate);
    }
  }
}

export default Scheduler;
```

`Scheduler`의 역할은 **이벤트 일자 설정 및 확인**이다.

`Scheduler`에 각각 이벤트 날짜를 배열로서 관리하고, 이후 특정 날짜가 이벤트 기간에 포함되었는지 확인하는 역할을 한다.
각각의 프로모션에서 날짜와 관련된 판별을 필요로 하는 경우, `Scheduler`에 해당 일정을 부여한 후 판별하도록 구현하였다.

## Receipt(영수증)

```js
class Receipt {
  /**
   * 영수증의 에러 메세지입니다.
   * @readonly
   */
  static ERROR_MESSAGES = Object.freeze({
    invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
    invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  });

  /**
   * 영수증 하나에 가능한 최대 음식 수 입니다.
   * @readonly
   */
  static MAX_FOOD_QUANTITY = 20;

  /**
   * 영수증의 주문 내역입니다.
   * @type {OrderDetail[]}
   */
  #orderDetails = [];

  /**
   * 영수증의 증정품 내역입니다.
   * @type {OrderDetail[]}
   */
  #gifts = [];

  /**
   * 음식 외 할인 내역입니다.
   * @type {AdditionalDiscount[]}
   */
  #additionalDiscounts = [];

  /**
   * 영수증의 발행일자입니다.
   * @type {Date}
   */
  #date;

  /**
   * @param {Date} date 발행일자입니다.
   */
  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  /**
   * @param {Date} date 발행일자입니다.
   * @returns {Receipt} 영수증입니다.
   */
  static of(date) {
    return new Receipt(date);
  }

  #validate(date) {
    if (isInvalidDate(date)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidDate);
    }
  }

  /**
   * 주문내역을 반영합니다.
   * @param {OrderDetail[]} orderDetails 주문한 메뉴 내역들입니다.
   */
  order(orderDetails) {
    this.#validateOrderDetails(orderDetails);
    this.#orderDetails.push(...orderDetails);
  }

  /**
   * 주문의 유효성을 검사합니다.
   * @param {OrderDetail[]} orders 주문한 메뉴 내역들입니다.
   */
  #validateOrderDetails(orders) {
    const names = Array.from(orders, (order) => order.getName());
    const totalQuantity = orders.reduce((total, order) => total + order.getQuantity(), 0);
    const allFoods = Array.from(orders, (order) => order.getFoods()).flat();
    if (isDuplicated(names)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
    if (totalQuantity > Receipt.MAX_FOOD_QUANTITY) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
    if (allFoods.every((food) => food instanceof Drink)) {
      throw new ApplicationError(Receipt.ERROR_MESSAGES.invalidOrder);
    }
  }

  /**
   * 증정품을 반영합니다.
   * @param {OrderDetail[]} gifts 증정품 내역들입니다.
   */
  receiveGifts(gifts) {
    if (gifts) {
      this.#gifts.push(...gifts);
    }
  }

  /**
   * 식품 외 추가 할인 내역을 등록합니다.
   * @param {AdditionalDiscount} additionalDiscount - 식품 외 추가 할인 내역입니다.
   */
  addAdditionalDiscount(additionalDiscount) {
    this.#additionalDiscounts.push(additionalDiscount);
  }

  /**
   * 영수증의 발행일자를 반환합니다.
   * @returns {Date} 영수증의 발행일자입니다.
   */
  getDate() {
    return this.#date;
  }

  /**
   * 영수증의 주문 내역을 반환합니다.
   * @returns {OrderDetail[]} 영수증의 모든 메뉴입니다.
   */
  getOrderDetails() {
    return this.#orderDetails;
  }

  /**
   * 영수증의 증정 내역을 반환합니다.
   * @returns {OrderDetail[]} 영수증의 모든 메뉴입니다.
   */
  getGifts() {
    return this.#gifts;
  }

  getAdditionalDiscounts() {
    return this.#additionalDiscounts;
  }

  /**
   * 영수증의 모든 메뉴를 반환합니다.
   * @returns {Food[]} 영수증의 모든 메뉴입니다.
   */
  getAllFoods() {
    return Array.from(this.#orderDetails, (orderDetail) => orderDetail.getFoods()).flat();
  }

  /**
   * 영수증의 가격 정보를 반환합니다.
   * @returns {import('../../types/price.js').ReceiptPriceInfo} 영수증의 가격 정보입니다.
   */
  getPrice() {
    return this.#orderDetails.reduce(
      (priceInfo, orderDetail) => ({
        cost: priceInfo.cost + orderDetail.getPrice().cost,
        discount: priceInfo.discount + orderDetail.getPrice().discount,
        benefit: priceInfo.benefit + orderDetail.getPrice().discount,
        payment: priceInfo.payment + orderDetail.getPrice().payment,
      }),
      this.#generateDefaultPriceInfo(),
    );
  }

  #generateDefaultPriceInfo() {
    return {
      cost: 0,
      discount: this.#getDefaultDiscount(),
      benefit: this.#getDefaultDiscount() + this.#getTotalGiftsPrice(),
      payment: -this.#getDefaultDiscount(),
    };
  }

  #getTotalGiftsPrice() {
    return this.#gifts.reduce((benefit, gift) => benefit + gift.getPrice().cost, 0);
  }

  #getDefaultDiscount() {
    return this.#additionalDiscounts.reduce((total, additional) => total + additional.getDiscount(), 0);
  }
}
```

내 코드의 핵심 로직이 담겨있는 ~~나쁘게 말하자면 코드 분리를 실패한~~ 객체는 `Receipt` 객체이다.
`Receipt`는 주문자의 **주문 내역, 각 음식의 할인 내역, 증정품, 음식 외 할인, 가격 등을 관리한다.**
디미터의 법칙을 위해서 출력에 연관될 로직을 최대한 모듈로부터 숨기긴 했는데... 맞게 작성한건지는 아직 잘 감이 오지는 않는다.

## OrderDetail(주문 내역)

```js
class OrderDetail {
  /**
   * 음식의 에러 메세지입니다.
   * @readonly
   */
  static ERROR_MESSAGES = {
    invalidCategory: '주문내역 음식의 카테고리에 올바른 카테고리를 설정해주세요!',
    notNumberQuantity: ERROR_MESSAGE_GENERATOR.notNumber('주문내역 음식의 갯수'),
  };

  /**
   * 주문 내역의 메뉴 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * 주문 내역의 메뉴 리스트입니다.
   * @type {Food[]}
   */
  #foods;

  /**
   * @param {OrderDetailRequirement} orderDetailRequirement
   */
  constructor({ foodName, foodCategory, quantity, price }) {
    this.#validate({ foodCategory, quantity });
    this.#name = foodName;
    this.#foods = Array.from({ length: quantity }, () => foodCategory.of(foodName, price));
  }

  /**
   * @param {OrderDetailRequirement} orderDetailRequirement
   * @returns {OrderDetail}
   */
  static of({ foodName, foodCategory, quantity, price }) {
    return new OrderDetail({ foodName, foodCategory, quantity, price });
  }

  #validate({ foodCategory, quantity }) {
    if (!isSubClass(foodCategory, Food)) {
      throw new ApplicationError(OrderDetail.ERROR_MESSAGES.invalidCategory);
    }
    if (typeof quantity !== 'number') {
      throw new ApplicationError(OrderDetail.ERROR_MESSAGES.notNumberQuantity);
    }
  }

  /**
   * 주문내역의 음식 이름을 반환합니다.
   * @returns {number} - 주문 내역의 음식 이름입니다.
   */
  getName() {
    return this.#name;
  }

  /**
   * 주문내역의 음식 갯수를 반환합니다.
   * @returns {number} - 음식의 갯수입니다.
   */
  getQuantity() {
    return this.#foods.length;
  }

  /**
   * 주문내역의 음식을 반환합니다.
   * @returns {Food[]} - 음식입니다.
   */
  getFoods() {
    return this.#foods;
  }

  /**
   * 주문내역의 음식 총 가격 정보를 반환합니다.
   * @returns {import('../../types/price.js').PriceInfo} - 음식 총 가격 정보입니다.
   */
  getPrice() {
    return this.#foods.reduce(
      (price, food) => {
        const { cost, discount, payment } = food.getPrice();
        return {
          cost: price.cost + cost,
          discount: price.discount + discount,
          payment: price.payment + payment,
        };
      },
      { cost: 0, discount: 0, payment: 0 },
    );
  }

  /**
   * 주문 내역을 문자열로 변환합니다.
   * @returns {string} - '${name} ${quantity}개' 형식의 주문 내역입니다.
   */
  toString() {
    return `${this.#name} ${this.getQuantity()}개`;
  }
}
```

`OrderDetail`은 `Receipt`에 필드로서 관리되며 음식과 음식의 갯수를 가지고 있다.
실제 영수증에서 항목별 주문 내역을 생각하며 구현하였다.
`Receipt`에서 `Food`에 직접 접근해서 금액 계산을 하지 않도록 하기 위해서 `OrderDetail`에서도 각각의 음식에 대한 원가, 할인액, 결제금액을 내부에서 계산해서 반환한다.
증정품 같은 경우도 `OrderDetail` 인스턴스를 통해서 관리된다.

## Food(음식)

```js
class Food {
  /**
   * 음식의 에러 메세지입니다.
   * @readonly
   */
  static ERROR_MESSAGES = {
    notStringFoodName: ERROR_MESSAGE_GENERATOR.notString('음식의 이름'),
    blankFoodName: ERROR_MESSAGE_GENERATOR.blank('음식의 이름'),
    notNumberPrice: ERROR_MESSAGE_GENERATOR.notNumber('음식의 가격'),
    notNumberDiscountAmount: ERROR_MESSAGE_GENERATOR.notNumber('음식의 할인할 가격'),
  };

  /**
   * 음식의 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * 음식의 가격입니다.
   * @type {PriceInfo}
   */
  #price = {
    cost: 0,
    discount: 0,
    payment: 0,
  };

  /**
   * @param {string} name - 음식의 이름입니다.
   * @param {number} price - 음식의 가격입니다.
   */
  constructor(name, price) {
    this.#validate(name, price);
    this.#name = name;
    this.#price.cost = price;
    this.#price.payment = price;
  }

  /**
   * @param {string} name - 음식의 이름입니다.
   * @param {number} price - 음식의 가격입니다.
   * @returns {Food} 생성된 음식입니다.
   */
  static of(name, price) {
    return new Food(name, price);
  }

  #validate(name, price) {
    if (typeof name !== 'string') {
      throw new ApplicationError(Food.ERROR_MESSAGES.notStringFoodName);
    }
    if (isBlank(name)) {
      throw new ApplicationError(Food.ERROR_MESSAGES.blankFoodName);
    }
    if (typeof price !== 'number') {
      throw new ApplicationError(Food.ERROR_MESSAGES.notNumberPrice);
    }
  }

  /**
   * 음식의 가격을 반환합니다.
   * @returns {PriceInfo} - 음식의 가격입니다.
   */
  getPrice() {
    return this.#price;
  }

  /**
   * 음식을 할인합니다.
   * @param {number} amount 음식의 할인될 금액입니다.
   */
  discount(amount) {
    this.#validateAmount(amount);

    if (this.#price.payment - amount < 0) {
      this.#price.discount = this.#price.cost;
      this.#price.payment = 0;
      return;
    }

    this.#price.discount += amount;
    this.#price.payment -= amount;
  }

  #validateAmount(amount) {
    if (typeof amount !== 'number') {
      throw new ApplicationError(Food.ERROR_MESSAGES.notNumberDiscountAmount);
    }
  }
}
```

`Food`는 말 그대로 음식을 의미하는 추상클래스이다. 음식의 각각 가격을 계산하고 음식에 대한 할인이 적용될 경우 해당 값을 반영한다.
`discount` 메서드의 경우는 0원 이하로는 할인이 되지 않는다.
서브클래스로 `Appetizer`, `MainCourse`, `Dessert`, `Drink`를 상속한다.

### 서브클래스 예시

```js
class Appetizer extends Food {
  static of(name, price) {
    return new Appetizer(name, price);
  }
}
```

```js
class AdditionalDiscount {
  /**
   * 부가요소의 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * 부가요소의 가격입니다.
   * @type {number}
   */
  #discount;

  constructor(name, discount) {
    this.#name = name;
    this.#discount = discount;
  }

  static of(name, discount) {
    return new AdditionalDiscount(name, discount);
  }

  getName() {
    return this.#name;
  }

  getDiscount() {
    return this.#discount;
  }
}
```

`AdditionalDiscount`은 음식 외 할인에 대한 정보를 보유한다.

## Discounter(할인 적용기)

```js
class Discounter {
  /**
   * 할인의 최소 금액 조건입니다.
   * @readonly
   */
  static MINIMUM_COST = 10_000;

  /**
   * 할인의 이름입니다.
   * @abstract
   * @protected
   */
  _name;

  /**
   * 할인을 시작합니다.
   * @param {Receipt} receipt - 할인을 실행할 영수증입니다.
   * @returns {import('../../service/DiscountService.js').BenefitResult | null} 할인 결과입니다.
   */
  run(receipt) {
    if (!this.#isMeetRequirement(receipt)) {
      return null;
    }

    return this._discount(receipt);
  }

  /**
   * 할인의 공통 실행 조건을 체크합니다.
   * @param {Receipt} receipt - 할인을 실행할 영수증입니다.
   * @returns {boolean} - 할인 조건 충족 여부입니다.
   */
  #isMeetRequirement(receipt) {
    return receipt.getPrice().cost >= Discounter.MINIMUM_COST;
  }

  /**
   * 할인을 적용합니다.
   * @abstract
   * @protected
   * @returns {import('../../service/DiscountService.js').BenefitResult | null} 할인 결과입니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   */
  // 추상 메서드를 위한 eslint off
  // eslint-disable-next-line no-unused-vars
  _discount(receipt) {}
}
```

`Discounter`는 각종 할인에 대한 슈퍼 클래스이다.

모듈에서 해당 클래스를 실행 할 때에는 `run(receipt)` 메서드를 호출한다.
해당 메서드를 실행 할 경우 `#isMeetRequirement()` 메서드를 실행하는데 이때 모든 할인의 기본 조건인 **10,000원 이상만 할인을 적용한 경우**만 할인을 실행하도록 구현하였다.

그렇다면 할인 이벤트마다 다른 로직은 어떻게 실행하는가? 이는 다음과 같이 구현하였다.

### 추상 메서드를 활용하자

```js
// Dicsounter.js

  /**
   * 할인을 적용합니다.
   * @abstract
   * @protected
   * @returns {import('../../service/DiscountService.js').BenefitResult | null} 할인 결과입니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   */
  // 추상 메서드를 위한 eslint off
  // eslint-disable-next-line no-unused-vars
  _discount(receipt) {}
```

`Discounter`의 메서드 중에서 `discount` 메서드의 경우 내부에 아무 코드가 작성되지 않았다. 그 이유는 해당 메서드가 **추상 메서드**로서 관리되기 때문이다. _jsdoc을 생각해서 따로 예외처리는 하지 않았다._

해당 로직을 슈퍼클래스에서는 호출을 위해 선언만 해놓고 실제 구현은 각각 이벤트마다의 서브클래스 내부에서 구현이 된다.

예를 들어서 요일마다 카테고리별 할인을 적용시키는 요일 할인 Discounter 같은 경우 다음과 같다.

```js
class DayOfWeekDiscounter extends Discounter {
  /**
   * 평일 할인 이벤트명입니다.
   * @readonly
   */
  static WEEKDAY_EVENT_NAME = '평일 할인';

  /**
   * 주말 할인 이벤트명입니다.
   * @readonly
   */
  static WEEKEND_EVENT_NAME = '주말 할인';

  /**
   * 평일 할인 대상 카테고리입니다.
   * @readonly
   */
  static WEEKDAY_EVENT_CATEGORY = Dessert;

  /**
   * 주말 할인 대상 카테고리입니다.
   * @readonly
   */
  static WEEKEND_EVENT_CATEGORY = MainCourse;

  /**
   * 요일 할인 기간 입니다.
   * @readonly
   */
  static PERIOD = {
    start: '2023-12-01',
    end: '2023-12-31',
  };

  /**
   * 주말 할인의 개당 할인 금액입니다.
   * @readonly
   */
  static DISCOUNT_PER_FOOD = 2_023;

  static of() {
    return new DayOfWeekDiscounter();
  }

  /**
   * 할인을 적용합니다.
   * @param {Receipt} receipt - 할인을 적용할 영수증입니다.
   * @returns {import('../../service/DiscountService.js').BenefitResult | null} 할인 결과입니다.
   */
  _discount(receipt) {
    const visitDate = receipt.getDate();

    if (!this.#isEventPeriod(visitDate)) {
      return null;
    }

    const { name, category } = this.#getDiscountInfo(isWeekday(visitDate));

    return this.#discountEventFoods({ name, category, receipt });
  }

  #discountEventFoods({ name, category, receipt }) {
    const beforeDiscountPrice = receipt.getPrice().discount;
    const foods = receipt.getAllFoods().filter((food) => food instanceof category);
    foods.forEach((food) => food.discount(DayOfWeekDiscounter.DISCOUNT_PER_FOOD));
    const benefit = receipt.getPrice().discount - beforeDiscountPrice;

    if (!benefit) {
      return null;
    }

    return {
      name,
      benefit,
    };
  }

  /**
   * 요일에 따른 할인 조건을 반환합니다.
   * @param {boolean} weekday - 평일 여부입니다.
   * @returns {{ name: string, category: Function }} - 할인 조건입니다.
   */
  #getDiscountInfo(weekday) {
    const category = weekday ? DayOfWeekDiscounter.WEEKDAY_EVENT_CATEGORY : DayOfWeekDiscounter.WEEKEND_EVENT_CATEGORY;
    const name = weekday ? DayOfWeekDiscounter.WEEKDAY_EVENT_NAME : DayOfWeekDiscounter.WEEKEND_EVENT_NAME;

    return { name, category };
  }

  /**
   * 이벤트 기간을 확인합니다.
   * @param {Date} visitDate - 방문일입니다.
   * @returns {boolean} - 방문일의 이벤트 기간 여부입니다.
   */
  #isEventPeriod(visitDate) {
    const scheduler = Scheduler.of();
    const { start, end } = DayOfWeekDiscounter.PERIOD;

    scheduler.addEventPeriod(new Date(start), new Date(end));

    return scheduler.isEventDate(visitDate);
  }
}
```

해당 서브클래스에서는 실제 이벤트 로직을 구현한다.

그렇다면 실제로 서비스 레이어에서 `DayOfWeekDiscounter`를 사용 할 경우에는 코드는 다음과 같이 실행된다.

```js
// DiscountService.js
  dayOfWeek(receipt) {
    const discounter = DayOfWeekDiscounter.of();
    const result = discounter.run(receipt);

    return result;
  },
```

`DayOfWeekDiscounter`의 `run` 호출
=> `Discounter`에 작성한 `run`이 실행됨
=> `run` 메서드 내부의 `#isMeetRequirement`를 호출하여 할인 여부를 판별
=> 할인 적용시 서브클래스 내부의 오버라이딩 된 `discount` 추상 메서드를 실행

위와 같이 구현함으로서 할인 로직이 여러개 생긴다고 하더라도 중복되는 공통 할인조건 판별을 신경쓰지 않아도 된다.

## OrderTaker (웨이터)

```js
const OrderTaker = Object.freeze({
  /**
   * 메뉴판입니다.
   * @readonly
   * @type {MenuInfo[]}
   */
  menu: [
    {
      foodName: '양송이수프',
      foodCategory: Appetizer,
      price: 6_000,
    },
    {
      foodName: '타파스',
      foodCategory: Appetizer,
      price: 5_500,
    },
    {
      foodName: '시저샐러드',
      foodCategory: Appetizer,
      price: 8_000,
    },
    {
      foodName: '티본스테이크',
      foodCategory: MainCourse,
      price: 55_000,
    },
    {
      foodName: '바비큐립',
      foodCategory: MainCourse,
      price: 54_000,
    },
    {
      foodName: '해산물파스타',
      foodCategory: MainCourse,
      price: 35_000,
    },
    {
      foodName: '크리스마스파스타',
      foodCategory: MainCourse,
      price: 25_000,
    },
    {
      foodName: '초코케이크',
      foodCategory: Dessert,
      price: 15_000,
    },
    {
      foodName: '아이스크림',
      foodCategory: Dessert,
      price: 5_000,
    },
    {
      foodName: '제로콜라',
      foodCategory: Drink,
      price: 3_000,
    },
    {
      foodName: '레드와인',
      foodCategory: Drink,
      price: 60_000,
    },
    {
      foodName: '샴페인',
      foodCategory: Drink,
      price: 25_000,
    },
  ],

  /**
   * 증정품 목록 입니다.
   * @readonly
   * @type {GiftsInfo[]}
   */
  gifts: [
    {
      minimumCost: 120_000,
      giftName: '샴페인',
      quantity: 1,
    },
  ],

  /**
   * 오더 테이커의 에러 메세지입니다.
   * @readonly
   */ ERROR_MESSAGES: {
    invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
    notNumberPrice: ERROR_MESSAGE_GENERATOR.notNumber('증정품을 확인할 결제 금액'),
  },

  /**
   * 주문을 받아 주문 내역을 반환합니다.
   * @param {string} name 주문한 메뉴의 이름입니다.
   * @param {number} quantity 주문한 메뉴의 갯수입니다.
   * @returns {OrderDetail} 주문 내역입니다.
   */
  takeOrder(name, quantity) {
    const { foodName, price, foodCategory } = this.findMenu(name);
    const MIN_QUANTITY = 1;

    if (quantity < MIN_QUANTITY || !Number.isInteger(quantity)) {
      throw new ApplicationError(this.ERROR_MESSAGES.invalidOrder);
    }

    const orderDetail = OrderDetail.of({ foodName, price, foodCategory, quantity });

    return orderDetail;
  },

  /**
   * 총 주문 금액에 따른 증정품을 반환합니다.
   * @param {number} costPrice 총 주문 금액입니다.
   * @returns {OrderDetail[]} 증정품 목록입니다.
   */
  giveaway(costPrice) {
    if (typeof costPrice !== 'number') {
      throw new ApplicationError(OrderTaker.ERROR_MESSAGES.notNumberPrice);
    }

    const gifts = this.gifts.filter((giveaway) => giveaway.minimumCost <= costPrice);

    return Array.from(gifts, ({ giftName }) => {
      const { foodName, foodCategory, price } = this.findMenu(giftName);
      return OrderDetail.of({ foodName, price, foodCategory, quantity: 1 });
    });
  },

  /**
   * 메뉴판에서 메뉴를 찾아 반환합니다.
   * @param {string} name 메뉴의 이름입니다.
   * @returns {MenuInfo} 메뉴입니다.
   */
  findMenu(name) {
    const result = this.menu.find((food) => food.foodName === name);

    if (!result) {
      throw new ApplicationError(this.ERROR_MESSAGES.invalidOrder);
    }

    return result;
  },
});
```

`OrderTaker`의 경우 필드로 메뉴를 가지고 있으며 기념품과 음식을 요구조건에 맞춰서 `OrderDetail`을 생성한다.
실제 레스토랑의 웨이터가 영수증에 주문 내역을 기입하는 것을 생각하며 구현하였다.

## Badge(배지)

```js
class Badge {
  /**
   * 혜택 금액별 배지입니다.
   */
  static #BADGE_LIST = [
    { badge: new Badge('별'), minimumPrice: 5_000 },
    { badge: new Badge('트리'), minimumPrice: 10_000 },
    { badge: new Badge('산타'), minimumPrice: 20_000 },
  ].sort((badge1, badge2) => badge2.minimumPrice - badge1.minimumPrice);

  /**
   * 배지의 이름입니다.
   * @type {string}
   */
  #name;

  /**
   * @param {string} name 배지의 이름입니다.
   */
  constructor(name) {
    this.#name = name;
  }

  /**
   * 혜택 금액에 따른 배지를 반환합니다.
   * @param {number} benefit 혜택 금액입니다.
   * @returns {Badge | null} 금액에 따른 배지입니다.
   */
  static valueOf(benefit) {
    const result = Badge.#BADGE_LIST.find((badge) => badge.minimumPrice <= benefit);

    return result ? result.badge : null;
  }

  /**
   * 배지의 이름을 반환합니다.
   * @returns {string} 배지의 이름입니다.
   */
  getName() {
    return this.#name;
  }
}
```

`Badge`는 배지를 의미하며 `valueOf` 팩토리 메서드를 호출 할 경우 혜택 금액에 따라 배지를 반환한다.

# 고민의 흔적들

## Date를 사용합시다

처음에는 날짜에 관한 데이터를 **그냥 `number`로서 관리할까?** 라는 생각을 했었다.
하지만 그렇게 구현하기에는 **년도나 월이 바뀐다면?** 라는 생각을 했을때 단순히 `number`로 구현하는데는 문제점이 있다고 생각하였다. 추가적으로 요일을 관리 할 때에도 분명히 이슈가 생길 가능성이 매우 크다고 생각했다.

따라서 자바스크립트에서 지원하는 `Date`를 적극 활용하기로 하였다. `Date`를 사용하면서 날짜를 관리하는 것도 훨씬 간편해지고 아래와 같이 날짜와 관련된 유틸리티 함수를 작성하는 것도 훨씬 간편해졌다.

```js
/**
 * 입력된 Date들이 같은 년도인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 년도의 동일 여부입니다.
 */
export const isSameYear = (date1, date2) => {
  const originalDateYear = date1.getFullYear();
  const preparedDateYear = date2.getFullYear();

  return originalDateYear === preparedDateYear;
};

/**
 * 입력된 Date들이 같은 월인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 월의 동일 여부입니다.
 */
export const isSameMonth = (date1, date2) => {
  const originalDateMonth = date1.getMonth();
  const preparedDateMonth = date2.getMonth();

  return originalDateMonth === preparedDateMonth;
};

/**
 * 입력된 Date들이 같은 일인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 월의 동일 여부입니다.
 */
export const isSameDay = (date1, date2) => {
  const originalDateDay = date1.getDate();
  const preparedDateDay = date2.getDate();

  return originalDateDay === preparedDateDay;
};

/**
 * 입력된 Date들이 같은 날짜인지 비교합니다.
 * @param {Date} date1 원본 날짜입니다.
 * @param {Date} date2 비교할 날짜입니다.
 * @returns {boolean} 날짜의 동일 여부입니다.
 */
export const isSameDate = (date1, date2) => {
  const sameYear = isSameYear(date1, date2);
  const sameMonth = isSameMonth(date1, date2);
  const sameDate = isSameDay(date1, date2);

  return sameYear && sameMonth && sameDate;
};

export const dateStringGenerator = ({ year, month, day }) => {
  const parsedMonth = month >= 10 ? month : `0${month}`;
  const parsedDay = day >= 10 ? day : `0${day}`;

  return `${year}-${parsedMonth}-${parsedDay}`;
};

/**
 * 입력된 Date가 평일인지 확인합니다.
 * @param {Date} date 확인할 날짜입니다.
 * @returns {boolean} 날짜의 평일 여부입니다.
 */
export const isWeekday = (date) => {
  const dayOfWeek = date.getDay();

  return dayOfWeek >= 0 && dayOfWeek <= 4;
};
```

## 프로토타입 기반 언어에서 살아남기

자바스크립트에도 `class`가 존재하지만, 결국에는 내부에서 자바스크립트의 언어적 근간인 **프로토타입**을 내부적으로 사용한다. 그렇다보니 자바스크립트에서 객체지향을 사용하는데에는 어느정도 감내해야하는 부분이 있다. 예를 들자면 `private` 메서드와 필드를 작성할 경우에는 `#` prefix를 사용하여 구현이 가능하지만 `protected`의 경우에는 기능상의 지원이 존재하지 않는다. _커뮤니티에서는 암묵적으로 `_`를 통해 protected 필드를 나타내기는한다.\_

당연히 추상클래스나 추상메서드도 자체적으로 지원하지는 않고 프로그래머가 직접 구현해야한다. 그래도 `jsdoc`의 도움을 빌려 내부적으로 `abstract`를 표시할 수도 있었다.

그리고 추가적으로 생각할 부분이 있었는데 `OrderDetail`의 유효성 검사에서 프로토타입을 활용할 기회가 생겼다.

`OrderDetail`의 경우 인자로 받는 값 중에 `foodCategory`가 존재하는데 이는 `Food`의 서브클래스, 즉 생성자 함수를 판별한다. `foodCategory`에 `Food`의 서브클래스가 아닌 생성자 함수가 입력될 경우 에러를 발생시키도록 예외처리를 구현하였다. 인스턴스의 경우는 `instanceOf`를 사용하여 판별 가능하지만 생성자 함수의 경우는 어떻게 작성해야할까?

해당 방법에 대한 방법을 찾아보다가 [이런 포스트](https://www.bsidesoft.com/8674)를 찾을 수 있었다.

```js
/**
 * 해당 클래스가 특정 클래스의 서브클래스인지 판별합니다.
 * @param {Function} subClass 체크할 서브클래스입니다.
 * @param {Function} superClass 체크할 슈퍼클래스입니다.
 * @returns {boolean} 상속 여부입니다.
 */
export const isSubClass = (subClass, superClass) => {
  const superPrototype = superClass.prototype;
  let targetPrototype = subClass.prototype;
  do {
    if (targetPrototype === superPrototype) return true;
    targetPrototype = Object.getPrototypeOf(targetPrototype);
  } while (targetPrototype);

  return false;
};
```

위 코드를 간단하게 설명하자면 입력받은 두 클래스(즉, 생성자함수)의 `prototype`에 접근하여 `do-while` 루프를 돌면서 `targetPrototype`이 `superPrototype`과 같아질 때까지 반복하며 프로토타입 체인을 따라 비교를 통해 서브클래스 여부를 판별하여 결과를 반환한다.

위의 방법을 활용하여 생성자 함수의 서브클래스 여부를 판별 할 수 있었다.

## 서브클래스의 존재 가치 증명

사실 프로그램을 설계하면서 든 가장 큰 고민은 **`Food`에 대한 서브클래스의 존재**였다.
아무래도 `Food`의 서브 클래스들이 내부에 다른 메서드나 필드가 존재하지 않았기에, **이걸 굳이 상속을 통해 관리해야할 이유가 있을까?** 라는 생각을 계속하였다.

최종 결론은 **상속을 유지한다**로 결론을 지었다.

가장 큰 이유로는 2가지가 존재했었다.

1. **`Food`와 서브 클래스들은 완벽한 `is-a` 관계이다.**
   아무리 생각해봐도 서브클래스들이 `Food` 슈퍼클래스의 완전한 `is-a` 관계였다. 추후 확장성을 생각해보았을때 당장 내부 로직이 없더라도 서브클래스로 관리 하는것이 맞다고 판단했다.

2. **카테고리에는 언제나 추가적인 뎁스를 생각하자.**
   나같은 경우 카테고리 같은 항목을 설계할 때 가장 먼저 생각하는 확장요소는 **뎁스의 추가 가능성**이다.
   만약 `Dessert` 카테고리 내부에 `Cake`나 `Cookie` 같은 하위 카테고리가 추가로 생긴다면 어떻게 대응해야할까? 라고 생각 했을때, 상속을 활용하는 것이 카테고리를 관리하는 최선의 방법이라고 생각했었다.

# 4주간의 프리코스 회고

## 완벽한 설계는 없다

![하지만 프로그래밍이란 항상 이런 거니까](/assets/blog/woowa-tech/christmas/4.png)

> 움직이는 표적을 완벽히 정조준하는 것은 불가능하다.
> [<소프트웨어 설계가 완벽할 수 없는 다섯 가지 이유> -글쓰는 프로그래머-](https://swarchi.tistory.com/12)

프리코스의 미션을 설계하다보면 항상 드는 생각이 있다.
**'이게 진정 지금 당장 필요한 설계일까?'**

언제나 확장성과 오버 엔지니어링을 구분하는것은 나에게 항상 머리 아픈 고민거리였다.
트레이드 오프의 기준점은 사람마다 각각 다르지만 나는 초기에 코드 설계를 좀 더 작성하더라도 확장성을 취하는 것을 선호하는 편이다. 또한 구현 이전에 확장성을 생각해서 설계하더라도 실제로 구현을 하다보면 **설계의 변경사항은 항상 반드시 존재했다.**

![그래도 작동은 합니다. 작동은...](/assets/blog/woowa-tech/christmas/5.png)

하지만 **MVP(Minimum Viable Product)** 를 잘 설정하는 것 또한 개발 효율에 굉장히 영향을 끼친다는 것 또한 사실이다.(해커톤을 경험하면서 이를 피부로 느꼈다)

그렇기에 확장성과 MVP의 이점을 같이 취할 방법을 찾다가 다른 프리코스 참가자 분들의 리드미에서 봤던 단계별 페이즈 작성을 도입해보았다. 결과적으로 페이즈별로 필요 기능을 나누어 구현하다보니 추가적인 설계에 대한 반영도 빠르게 도입할 수 있었고 확장성과 변경을 동시에 좀 더 유연하게 작성 할 수 있었던 것 같다.

### 완벽한 설계는 없다. 다만 오류를 줄일뿐

![이것이 MVP다! 절망편](/assets/blog/woowa-tech/christmas/6.png)

그리고 나름대로 확장성의 이점을 꽤나 느낄 수 있었다. 첫번째 할인 이벤트를 적용하기까지는 꽤나 오랜 시간이 걸렸다. 기본적인 클래스와 추상클래스, 그리고 추상메서드는 어떻게 뽑아낼지 생각하고 구현하고... 여러모로 시간을 잡아먹는 부분이 많았는데 그래도 기틀을 확실하게 잡고나니 이후 할인 이벤트를 추가할때에는 서브 클래스에서 추상 메서드만 쏙쏙 작성하면 되다보니 구현을 굉장히 짧은 시간에 해결할 수 있었다.

## 타입스크립트, 오늘따라 당신이 그립습니다.

![그냥... 너 생각나서...](/assets/blog/woowa-tech/christmas/7.png)

객체지향을 토대로 코드를 작성하다보니 느낀 가장 큰 부분 중 하나는, **타입스크립트가 정말로 그리웠다.**

물론 `jsdoc`을 활용하여 `typedef` 등을 통해 타입스크립트의 일부 기능과 자동 완성의 이점을 활용할 수 있었지만, `interface` 라던지 `protected`나 `abstract` 같은 타입스크립트의 내장 기능들이 그리운 상황이 굉장히 많았다. 평소에 TS 사용할 때에는 너무 깐깐한 타입체킹으로 인해 스트레스를 받았던 경우도 많았지만, 오랜만에 순도 100% 자바스크립트를 사용해보다보니 꽃이 지고 나서야 봄인 것을 깨달을 수 있었다.

요근래 몇몇 진영에서 탈타입스크립트 움직임이 조금씩 보이기 시작하는데, 난 아직 타입스크립트를 놓아주지 못할 것 같다.

## 코드리뷰 공방전

역시 누가 뭐래도 프리코스 커뮤니티의 핵심은 **코드 리뷰**였다.
매주 미션마다 상호 코드리뷰를 진행하는 스터디를 미션과 병행하고, 스터디 외에도 다른 참가자분들과 코드리뷰를 경험 할 수 있었는데, 구현에 대한 다양한 시각을 볼 수 있던 점이 굉장히 좋았다. 단순히 코드리뷰를 받으면서 피드백을 받는 것 뿐만 아니라 다른 사람의 코드를 보면서 배워가는 부분도 많았기에, 개발 문화의 중요성을 다시 한번 깨달을 수 있었다.

## 어쩌다 디스코드봇

![](/assets/blog/woowa-tech/christmas/8.png)

[디스코드봇 Repository](https://github.com/cobocho/discord-bot/tree/cobocho)

프리코스를 진행하며 함께 스터디를 진행하였는데, 어쩌다가 프리코스 채널관리 디스코드 봇도 제작해보게 되었다.

사실 다른 참가자 분들이 워낙 잘하셔서 솔직히 내가 기여한 부분은 많이 없고 탑승감 좋은 버스에 안착해 있던 기분도 있었지만... 프리코스 미션을 진행하던 중에 생긴 뜻밖의 이벤트 같아서 재밌게 참여 할 수 있었다. 갑작스러운 이슈에도 대응해보고 혹시 몰라서 인간 EC2 인스턴스가 되어보고, 코수타에서 다른 지원자분들에게서 샤라웃도 받아보고... 기대하지 않았던 예상치 못한 즐거움을 겪을 수 있었다.

## 결론

![미하일 칙센트미하이의 몰입 이론](/assets/blog/woowa-tech/christmas/9.png)

우아한테크코스에서 몰입이라는 키워드를 지속해서 강조한 이유를 알 수 있었던 것 같다.
점진적으로 미션의 난이도를 상승시키다보니, 미션에서 벽을 느끼거나, 혹은 지루함을 느낄 여지가 없이 몰입하며 미션을 진행 할 수 있던 것 같다. 사실 프론트엔드, 특히 함수형 컴포넌트 기반의 리액트를 학습하다보면 객체지향적인 설계를 많이 접해보기가 힘들다. 물론, 언제 어디서나 객체를 다루기는 하지만, 이를 객체지향인가? 라고 생각했을때 의문점이 드는 것은 사실이다.

하지만 프리코스 미션을 진행하면서 객체지향에 대해 학습하다보니, 단순히 객체지향 뿐만 아니라 프로그램 설계에 대해서 더 넓은 시야를 가질 수 있게 된 것 같다. 추가적으로 자바스크립트에 대한 이해도 향상은 덤.

앞으로 남은 시간에는 3가지를 목표로 할 예정이다.

### 프리코스 커뮤니티 더 활용하기

미션을 진행하는 것만으로도 시간을 많이 차지하다보니, 스터디 외의 참가자분들과 커뮤니티 활동을 많이는 못한것같다. 이제 활용 할 수 있는 시간도 늘어났으니, 남은 기간동안 프리코스 커뮤니티 활동에 좀 더 박차를 가해보려한다.

### canvas 학습하기

기껏 `class` 문법을 익혔는데... 그래도 좀 써먹어봐야하지 않겠는가? 개인적으로 인터랙션에 대한 관심이 크기도 하고, 프론트엔드에서 클래스를 연습하기 딱 좋은 대상이 바로 `canvas API`라고 생각하기에... 프리코스를 진행하기 이전에 사놓은 `canvas` 강의를 다시 한번 학습해보려한다.

### 리액트와 사회적 거리두기 엔데믹

프리코스를 진행하다보니 어쩔 수 없이 리액트와 눈물의 이별을 겪었어야만했다. `Next.js`도 이번에 14버전이 나왔다고하니 한번 찍어먹어보고, 오랜만에 다시 컴포넌트를 짜면서 리액트라는 라이브러리에 대해 좀 더 심도있게 공부해보려한다.

어찌됐든 짧다면 짧고, 길다면 긴, 4주간의 우아한테크코스 프리코스 과정이 종료되었다. 최종 코딩테스트까지 간다면 좋겠지만, 이미 떠나보낸 풀리퀘스트에 미련을 가지고 끙끙대기 보다는 지금 나의 상황에 집중하는 것이 우아한테크코스의 프리코스의 의도와도 더 맞을것 같다.

이 글을 읽는 모두 행복하시길.

> 포스트에 대한 무차별적인 피드백과 지적을 감사히 환영합니다.
