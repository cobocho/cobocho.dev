---
title: '타입스크립트 디자인 패턴 -팩토리 패턴-'
description: '공장에서 찍어나오는 간편한 인스턴스'
date: '2024/05/14'
tags: ['디자인 패턴', 'typescript', '팩토리 패턴']
---

# 팩토리 패턴이란?

팩토리 패턴은 인스턴스의 생성에 대한 인터페이스를 부모 클래스에서 제공하면서 직접적인 생성은 서브 클래스에서 이루어지도록 작동하는 생성 디자인 패턴이다. 즉 인스턴스 생성에 대한 직접적인 책임을 팩토리 클래스를 통해서 생성되게 함으로써 객체 생성에 대한 결정을 인스턴스 코드로부터 분리시킬 수 있게된다.

# 팩토리 메서드 패턴 만들기

![](1.png)

만약 자동차 판매를 위한 프로그램을 작성한다고 가정하자. 우리가 프로그래밍 할 자동차 판매 프로그램의 경우 `Car`와 `Truck` 총 두가지의 자동차들을 판매한다. 모든 자동차들은 각기 다른 색상(`color`)이 도색되어 있고, 신차인지 중고차인지 차의 상태(`state`)를 가지고 있다. `Car`의 경우는 문의 개수(`door`)가 차마다 다르며, `Truck`의 경우 각각의 트럭이 다른 크기의 휠(`wheelSize`)를 가진다.

## 팩토리 메서드의 생성 대상을 만들기

```ts
interface VehicleOptions {
  state?: 'brand new' | 'used';
  color?: string;
}

abstract class Vehicle {
  public state: VehicleOptions['state'];

  public color: string;

  public constructor({ state = 'brand new', color = 'silver' }: VehicleOptions) {
    this.state = state;
    this.color = color;
  }
}
```

`Car`와 `Truck`의 공통사항을 자세히 파악하여 `Car` 인스턴스와 `Truck` 인스턴스의 추상 클래스인 `Vehicle` 클래스를 생성하자. `Vehicle`은 기본 값으로 `state`와 `color`를 인자로 받아 필드에 설정한다.

추상 클래스를 사용함으로써 서브 클래스의 멤버의 접근자를 설정하고 객체의 공통사항을 추상화 시킬 수 있다. 하지만 상속된 클래스 간 결합도가 높아지니 추상 클래스를 사용할 때에는 클래스간 관계를 정확하게 판단해야한다.

```ts
interface CarOptions extends VehicleOptions {
  door?: number;
}

class Car extends Vehicle {
  public door: number;

  public state: Vehicle['state'];

  public constructor({ door = 4, color, state }: CarOptions) {
    super({ state, color });
    this.door = door;
  }
}
```

`door` 필드를 소유한 서브 클래스 `Car`를 생성해준다.

```ts
interface TruckOptions extends VehicleOptions {
  wheelSize?: 'small' | 'medium' | 'large';
}

class Truck extends Vehicle {
  public wheelSize: TruckOptions['wheelSize'];

  public constructor({ wheelSize = 'large', color, state }: TruckOptions) {
    super({ color, state });
    this.wheelSize = wheelSize;
  }
}
```

`wheelSize` 필드를 소유한 서브 클래스 `Car`를 생성해준다. 두 클래스 모두 `Vehicle` 추상 클래스를 상속하고 있으므로 견고한 타입을 통해 안정성을 추구할 수 있다.

## 팩토리 클래스 생성하기

```ts
interface CarCreateOption extends CarOptions {
  vehicleType: 'car';
}

interface TruckCreateOption extends TruckOptions {
  vehicleType: 'truck';
}

type AllVehicleOptions = CarCreateOption | TruckCreateOption;

class VehicleFactory {
  public create(options: AllVehicleOptions): Vehicle {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
    }
  }
}
```

이제 팩토리 클래스를 생성할 차례이다. `VehicleFactory`를 통해 `create` 메서드에 생성될 서브클래스의 옵션을 주입하여 서브클래스를 생성한다.

### 사용 예시

```ts
const vehicleFactory = new VehicleFactory();

vehicleFactory.create({
  vehicleType: 'car',
});
// Output: Car { state: 'brand new', color: 'silver', door: 4 }

vehicleFactory.create({
  vehicleType: 'truck',
  color: 'black',
});
// Output: Truck { state: 'brand new', color: 'black', wheelSize: 'large' }
```

## 팩토리 패턴이 아닐 경우

```ts
const ModuleA = {
  createVehicle(options: AllVehicleOptions) {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
    }
  },
};

const ModuleB = {
  createVehicle(options: AllVehicleOptions) {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
    }
  },
};

const ModuleC = {
  createVehicle(options: AllVehicleOptions) {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
    }
  },
};

// ...약 30개의 생성 로직이 포함된 모듈들
```

만약 팩토리 메서드 패턴이 아니라 인스턴스가 생성되는 순간마다 `new`를 사용하여 생성한다고 가정하자. 그 경우 상기 코드처럼 감 함수마다 생성하는 로직이 직접 적혀있을 것이다. 따라서 생성하는 조건에 따른 분기처리도 생성되는 순간마다 직접 구현되어있어야하며 이에 따라 의미없는 중복이 발생된다. 만약에 여기서 다음과 같은 요구사항이 추가된다.

> ???: 앞으로는 `Car`랑 `Truck` 말고도 `SUV`도 추가될거에요!

```ts
const ModuleA = {
  createVehicle(options: AllVehicleOptions) {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
      case 'suv':
        return new Truck(options);
    }
  },
};

const ModuleB = {
  createVehicle(options: AllVehicleOptions) {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
      case 'suv':
        return new Truck(options);
    }
  },
};

const ModuleC = {
  createVehicle(options: AllVehicleOptions) {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
      case 'suv':
        return new Truck(options);
    }
  },
};

// ...
```

이 경우 우리는 `SUV`라는 인스턴스를 생성하기 위해 약 30개의 메서드를 수정해야한다.

### 하지만 팩토리 패턴이라면

```ts
class VehicleFactory {
  public create(options: AllVehicleOptions): Vehicle {
    const { vehicleType } = options;

    switch (vehicleType) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
      case 'suv':
        return new Truck(options);
    }
  }
}

const vehicleFactory = new VehicleFactory();

const ModuleA = {
  createVehicle(options: AllVehicleOptions) {
    vehicleFactory.create(options);
  },
};

const ModuleB = {
  createVehicle(options: AllVehicleOptions) {
    vehicleFactory.create(options);
  },
};

const ModuleC = {
  createVehicle(options: AllVehicleOptions) {
    vehicleFactory.create(options);
  },
};
```

하지만 생성 로직이 팩토리 클래스로 이관된다면 다르다. 생성에 대한 로직을 온전히 팩토리 클래스가 담당하게 되면서 생성에 관련된 수정사항이 발생할 경우 팩토리 메서드만을 수정함으로써 수정에 대한 파편 범위를 매우 줄일 수 있다. 자바스크립트라면 `new` 키워드를 안쓰면서 콜백으로 활용할 가능성 또한 열리는 추가적인 이점이 있다.

[실제 코드](https://github.com/cobocho/typescript-design-patterns/blob/main/creational/factory.ts)

# References

- [팩토리 메서드 패턴 - Refactoring Guru](https://refactoring.guru/ko/design-patterns/factory-method)
- [Learning Javascript Design Patterns](https://www.oreilly.com/library/view/learning-javascript-design/9781098139865/)
