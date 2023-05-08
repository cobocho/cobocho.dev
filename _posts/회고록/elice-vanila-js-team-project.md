---
title: '바닐라 팀 프로젝트 방황기'
description: '나의 첫 팀프로젝트는 어땠는가'
thumbnail: '/assets/blog/thumnails/회고록/elice-vanila-js-team-project.gif'
date: '2023/05/01'
tags: ['엘리스 SW4', '팀 프로젝트']
---
# ⚾️ 개요
엘리스 SW 트랙을 시작한지 2달이 조금 부족하게 지났을 무렵부터 팀 프로젝트가 시작됐다.
사실 부트캠프를 생각하게 된 가장 큰 이유가 팀 프로젝트였기 때문에 프로젝트가 기대되면서 동시에 걱정 또한 많았다.

오롯이 바닐라 자바스크립트만을 사용한다는 점과 깃이라곤 그저 무지성 커밋 발사 경험밖에 없는 내가 과연 협업을 무탈하게 할 수 있을까라는 생각이 들기도 했다.

## 프로젝트 기간
4/17 - 4/28 (2주)

## 주제
KBO 굿즈 쇼핑몰 제작


## 기술스택
- HTML/CSS
- Javascript
- Bulma

# 💻 개발 로그
이번 프로젝트에서 나는 프론트엔드를 맡게 되었다.
물론 원래 지망하던 포지션도 프론트엔드였고 앞으로도 그럴 예정이지만, 사실 1차 프로젝트기도 하고 백엔드도 익힐 겸 해서 백엔드도 크게 상관은 없었는데 백엔드를 자원하신 팀원 2분이 계셔서 프론트엔드를 담당하기로 하였다.

나중에 백엔드 팀원분들 코드를 읽어보니 백엔드 안하길 참 잘했다는 생각이 들기도 했다.
만약 내가 백엔드를 했더라면 아마 우리 팀원분들처럼은 못 작성했을 것 같았다.

이후 프로젝트를 진행하면서 내가 맡은 파트는
- 상품 리스트
- 장바구니
- 마이페이지
- 주문 목록
- 관리자 페이지(주문)

이렇게 담당하게 되었다.

## 🛍️ 상품 리스트

![](https://velog.velcdn.com/images/cobocho/post/670206e3-3d69-468d-b268-36691c652eb7/image.gif)

![](https://velog.velcdn.com/images/cobocho/post/364f1e77-d1f8-4616-baeb-f96e020d5552/image.gif)


프로젝트를 시작한 다음날부터 만든 첫번째 작업물이다.
카테고리와 팀 이름, 그리고 정렬 기준을 쿼리스트링으로 컨트롤하도록 구현하였다.

```js
const [RECENT, PRICE_ASC, PRICE_DES, RATE_DES] = [
  'recent',
  'price-asc',
  'price-des',
  'rate-des',
];
```
정렬은 위와 같이 constants화 하여 분리하였고 이를 쿼리스트링과 비교하여 프론트단에서 데이터처리를 실행하였다.

## 🛒 장바구니
![](https://velog.velcdn.com/images/cobocho/post/69ebc515-4d02-4af8-b588-2fdc396f345a/image.gif)
장바구니의 경우 프론트단에서 데이터를 관리하라는 엘리스의 요구사항에 따라 카트에 대한 API를 따로 분리하여 작성하였다.
```js
import { setDiscount } from '../utils.js';

function changeCartAmount() {
  document.querySelector('.cart-amount').innerHTML = getAllProduct();
}

function getCartFromLocal() {
  const existsCart = localStorage.getItem('cart');
  const cartList = JSON.parse(existsCart) || {};
  return cartList;
}

function setCartToLocal(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  changeCartAmount();
}

async function getItemById(id) {
  return await fetch(`/api/v1/products/${id}`).then((res) => res.json());
}

export function getCartList() {
  const cartList = getCartFromLocal();

  const arrayCart = Object.entries(cartList).map(([id, data]) => ({
    id,
    ...data,
  }));

  return arrayCart;
}

export function getCartListSelected() {
  const cartList = getCartList();
  const selectedCartList = cartList.filter(({ selected }) => selected);

  return selectedCartList;
}

export function getAllProduct() {
  const cartList = getCartListSelected();
  return cartList.length;
}

export async function getOrderPrice(ship) {
  const cartList = getCartListSelected();
  if (cartList.length < 1) return 0;

  const totalPricesByServer = await Promise.all(
    cartList.map(async ({ id, amount }) => {
      const cartItem = await getItemById(id);
      const { price, rate } = cartItem;
      const combinedPrice = setDiscount(price, rate) * amount;
      return combinedPrice;
    })
  );
  const totalPrice = totalPricesByServer.reduce((acc, cur) => acc + cur, 0);

  if (ship) return totalPrice + ship;
  return totalPrice;
}

export async function addItemCart(id, requestAmount = 1) {
  const cartList = getCartFromLocal();
  const { img, name, team, price, rate } = await getItemById(id);
  const discountedPrice = setDiscount(price, rate);
  if (cartList[id]) {
    const { amount } = cartList[id];
    cartList[id] = {
      ...cartList[id],
      rate,
      price,
      amount: amount + Number(requestAmount),
      total: discountedPrice * (amount + 1),
    };
  } else {
    cartList[id] = {
      name,
      team,
      rate,
      img: img[0],
      price,
      discountedPrice,
      amount: Number(requestAmount),
      total: discountedPrice,
      selected: true,
    };
  }
  setCartToLocal(cartList);
}

export async function decreaseItemOfCart(id) {
  const cartList = getCartFromLocal();
  if (cartList[id].amount > 1) {
    const { amount } = cartList[id];
    const { price, rate } = await getItemById(id);
    const discountedPrice = setDiscount(price, rate);
    cartList[id] = {
      ...cartList[id],
      rate,
      price,
      amount: amount - 1,
      total: discountedPrice * (amount - 1),
    };
  } else delete cartList[id];
  setCartToLocal(cartList);
}

export function deleteItemOfCart(id) {
  const cartList = getCartFromLocal();
  delete cartList[id];
  setCartToLocal(cartList);
}

export function deleteAllOfCart() {
  setCartToLocal({});
}

export function toggleItemOfCart(id) {
  const cartList = getCartFromLocal();
  cartList[id].selected = !cartList[id].selected;
  setCartToLocal(cartList);
}

export function toggleAllItemOfCart(boolean) {
  const cartList = getCartFromLocal();
  const cartListKeys = Object.keys(cartList);

  cartListKeys.forEach((key) => {
    cartList[key].selected = !boolean;
  });
  setCartToLocal(cartList);
}

export function getIsAllSelected() {
  const cartList = getCartFromLocal();
  const cartListKeys = Object.keys(cartList);

  return cartListKeys.every((key) => cartList[key].selected);
}
```

대신 장바구니의 데이터들은 가격이나 할인율 같은 변경사항에 좀 민감하게 반응해야한다는 생각에 거의 모든 변경 과정에 서버로부터 가격을 업데이트 받도록 작성하였다.

아무래도 실제 서비스라면 서버에 부하가 가해질 수 있는 구조이긴 하지만 프론트에서만 데이터를 관리해야하는 조건에서는 위와 같은 방법이 좀 더 낫다고 생각하였다.

## 👨‍💼 마이 페이지

![](https://velog.velcdn.com/images/cobocho/post/b28d9d63-941f-4807-b8c1-9c6a1e717267/image.gif)

사실 마이페이지의 경우에는 크게 어려움은 없었다.
나는 기본 UI 레이아웃 구조만 확립하고 마이페이지, 주문 목록, 주문 상세 페이지만 작성하였고 핵심인 회원정보 수정은 회원가입과 로그인을 담당하신 팀원분이 전부 작성하였기 때문이다.

그리고 마이페이지와 주문 목록, 주문 상세 페이지 같은 경우도 백엔드로부터 받은 데이터를 렌더링해주기만 하면 되는 작업이었기에 큰 이슈는 없었다.

## 🧑‍🔧 관리자 페이지 (주문)

![](https://velog.velcdn.com/images/cobocho/post/539361aa-0aa1-437d-889d-fc60e26b9b31/image.png)

개인적으로 **가장 애정하면서 동시에 가장 증오하는 페이지**이기도 하다.

가장 구현이 오래 걸렸고, 프로젝트에서 단일 파일로서 가장 긴 코드이며, 프로젝트에서 **제일 더러운 코드**이기도 하다.

구현하면서 든 **'그래도 관리자 페이지라면 데이터 탐색에 조건이 다양해야 하지 않을까?'** 라는 생각이 더이상 돌아올 수 없는 강을 건너게 만들었다.

상품 리스트 페이지와 동일하게 정렬 기준, 검색 내용을 쿼리스트링으로 가지며 추가적으로 검색 타입, 배송 타입을 추가적으로 쿼리스트링에 부여한다.
그러다보니 조건이 늘어날 수록 url이 지저분해지는걸 실시간으로 볼 수 있었다.

### 검색

![](https://velog.velcdn.com/images/cobocho/post/7fb76b81-3f04-40dc-8af6-6045a55a6d96/image.gif)

검색 박스에 배송 상태를 선택하여 검색 할 수 있고 검색 조건을 이메일과 주문번호로도 검색 할 수 있다.

처음에 배송 상태를 쿼리스트링으로 어떻게 전달해야 할 지가 고민이었다.
단순히 하나만 선택한다면 단순히 그 값을 전달해주면 되지만 값이 여러개인 경우 어떻게 작성해야 할 지가 의문이었다.

최종적으로 선택한 방법은 선택지 중간마다 하이픈을 추가하여 이후 페이지 로드시 파싱하는 방법을 택했다.

```js
const [BEFOREPAYMENT, PREPARING, SHIPPING, COMPLETE] = [
  '결제확인중',
  '상품준비중',
  '배송중',
  '배송완료',
];

let SHIPPING_OPTIONS = urlParams.get('shipping-options');
if (SHIPPING_OPTIONS) SHIPPING_OPTIONS = SHIPPING_OPTIONS.split('-');
```

![](https://velog.velcdn.com/images/cobocho/post/f3917e60-d0cb-4a2c-ba0e-890eeb42ba68/image.png)
또한 주문번호를 클릭시 해당 주문의 상세페이지를 볼 수 있다.

### 수정
![](https://velog.velcdn.com/images/cobocho/post/6ac178c8-5a58-44fa-bb6c-a4835d11f507/image.gif)

수정 버튼을 누를 시 모달이 열리면 기존 데이터가 기입력된 수정창이 나타난다.

### 배송 상태 변경
![](https://velog.velcdn.com/images/cobocho/post/da2be1d8-fa42-4531-a040-38d3d2122680/image.gif)
해당 주문내역의 현재 배송 상태가 드롭박스의 기본값으로 입력되며 이를 개별적으로 변경하거나 일괄적으로 변경 할 수 있다.

# 🎸 그 외 잔잔바리
## 404 페이지
![](https://velog.velcdn.com/images/cobocho/post/644f262e-346e-45c7-8694-d200d06b7dba/image.png)

## 주문 완료 페이지
![](https://velog.velcdn.com/images/cobocho/post/5856a4a5-1fd7-4af8-b261-d39777ff25ba/image.gif)

# 🤔 고민


## createElement? innerHTML?
처음에는 바닐라JS로 컴포넌트를 만들때 `createElement`와 `innerHTML` 중에 어떤걸 사용할까 고민했다.

### 차이점
> 출처: [JavaScript innerHTML vs createElement](https://www.javascripttutorial.net/javascript-dom/javascript-innerhtml-vs-createelement/)

1. `innerHTML`이 가독성이 좋다

바닐라 JS에서도 JSX와 비슷하게 코드 스타일을 구성 할 수 있어서 아무래도 유지보수는 훨씬 편하긴하다.

2. `createElement`가 성능은 더 좋다

기준이 되는 요소의 DOM 내부를 전부 재분석하기 때문에 `createElement`에 비해서 성능이 떨어진다.

3. `innerHTML`이 비교적 불안정하다

데이터베이스처럼 신뢰할 수 있는 소스에서만 사용되어야만하며 만약 불안정한 소스로 부터 데이터를 받는다면 악성코드가 심어질 수도 있다.

위와 같은 사안들을 고민하다가 오피스아워시간에 프론트엔드 코치님께 위 사항들을 여쭤봤다.

돌아온 대답은 **"편한거 쓰면 됩니다"**

그래서 결국에는 `innerHTML`로 작성하기로 결정했다.
2번과 3번 같은 경우에는 사실 이번 프로젝트 같은 소규모 프로젝트에선 크게 영향이 없을 것이라 생각하기도 했고, `innerHTML`의 가독성이 너무 매력적이라 `innerHTML`로 작성하기로 결정하였다.

# 🔍 기억에 남는 피드백
## 컴포넌트 쪼개기
```js

const Product = (
  target,
  { productId, name, teamName, img, inventory, discountedPrice, price, rate }
) => {
  
  //... 중략
  
  $product.innerHTML = `
    <div class="product-image">
      <img src="${img[0]}" alt="${name}">
    </div>
    <div class="product-content">
      <button class="product-cart-button">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
      <h1 class="product-header">
        <span class="product-header-team">${teamName}</span>
        <span class="product-header-name">${name}</span>
      </h1>
      <div class="product-price">
        ${
          isDiscount
            ? `
            <div class="discount-field">
              <em class="product-price-rate">${rate}%</em>
              <em class="product-price-original">${price.toLocaleString()}원</em>
            </div>
            `
            : ''
        }
        <p class="product-price">${renderedPrice}원</p>
      </div>
    </div>

```
기존에 컴포넌트를 작성할 때는 거의 한 컴포넌트 내에서 많은 데이터를 관리하고 처리하도록 작성했었다. 그러다보니 아무래도 하나의 `innerHTML` 내부에 많은 코드가 들어가서 가독성이 떨어지는 현상이 발생하기도 하였다.

이러한 코드에 대해서 코치님께 받은 피드백이 있었다.

```js
  const productImage = `<img src="${img[0]}" alt="${name}">`;
  const discountField = `
    <div class="discount-field">
      <em class="product-price-rate">${rate}%</em>
      <em class="product-price-original">${price.toLocaleString()}원</em>
    </div>
  `;
  const productPrice = `
    <div class="product-price">
      ${isDiscount ? discountField : ''}
      <p class="product-price">${renderedPrice}원</p>
    </div>
  `;

  const productHeader = `
    <h1 class="product-header">
      <span class="product-header-team">${teamName}</span>
      <span class="product-header-name">${name}</span>
    </h1>
  `;


// ...중략


$product.innerHTML = `
    <div class="product-image">
      ${productImage}
    </div>
    <div class="product-content">
      <button class="product-cart-button">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
      ${productHeader}
      ${productPrice}

// ...중략
```

바로 컴포넌트를 쪼개는 것.

확실히 컴포넌트를 쪼갠 후 조합하니 템플릿 리터럴이 좀 더 활용된 느낌도 들고 가독성 또한 좋아진 것을 볼 수 있었다.
이런 방식은 지금같은 바닐라 JS가 아니라 리액트에서도 꽤나 도움이 될 것 같아서 가장 기억에 남는 피드백 중 하나이다.

# 🌧️ 아쉬운 점
## 코딩은 전투다 각개전투
사실 우리 팀의 프론트엔드 개발 스타일은 막 체계적인 편은 아니었고, 오히려 꽤나 자유분방한 편이었다.
어느정도였냐면 기초 레이아웃조차 짜지 않고 각자 맡을 파트만 분담하고 구현한 이후 헤더와 푸터, 여기저기 나눠진 컴포넌트를 조합하여 페이지를 만드는 마치 밀키트 같은 개발 스타일이라고 볼 수 있었다. 
(심지어 헤더와 푸터는 개발 중간 즈음부터 만들어졌다.)

말그대로 **각자도생**. 낙오된 자는 살아남지 못하는 환경이라고 볼 수 있었다.

그런데 놀라운 점은 **이게 먹혔다.**

이유를 모를 정도로 개발속도가 꽤나 빠르게 진행되는 편이었고, 이를 바탕으로 예상보다 좀 더 많은 기능을 구현 할 수 있었다.
_**'이게 코리안 애자일인가?'**_ 라고 착각하던 즈음에 문제가 하나 생겼다.

바로 **푸터의 포지션 방황**.

푸터의 경우 하단에 포지션을 고정하는 방법은 여러가지가 있지만, 공통적인 점은 적어도 Wrapper 요소를 기반으로 하여 통일된 레이아웃 구조와 CSS가 잡혀있어야지 안정감 있는 푸터를 보여 줄 수 있다는 점이다.

여기서 우리의 K-애자일(아님)의 문제점이 나타났다.
레이아웃을 각자 알아서 짜다보니 클래스명부터 시작해서 CSS 레이아웃 구성 방식 조차 레이서별로 천차만별이었던 것.

이렇다보니 어떤 페이지는 푸터가 화면 중앙에 위치하고 어떤 페이지는 푸터가 심해 깊은 곳에 위치하는 기현상이 발생했다.

![우리의 Footer는 마치 이런 형태라고 볼 수 있었다](https://velog.velcdn.com/images/cobocho/post/db8151de-9115-4a0b-82e9-9c5541e5482d/image.png)

결국에는 다음과 같은 코드를 작성 할 수밖에 없었다.

```css
.main-wrapper,
.products-wrapper,
.product-detail-wrapper,
.order-wrapper,
.content-container,
.sign-wrapper,
.login-wrapper,
.complete-wrapper,
.find-password-wrapper {
  height: fit-content;
  min-height: calc(100vh - 210px - 80px);
  padding-bottom: 210px;
}
```

다음부터는 Wrapper의 다양성을 추구하는건 좀 지양해야 할 것 같다.

## 점점 방치당하는 utils.js
처음에는 중복 코드를 최소화하기 위해서 재사용성 있어보이는 함수들은 최대한 `utils.js`에 분리하여 작성하였다.
하지만 프로젝트 후반에 갈 수록 그냥 메인 스크립트파일에 적는 경우가 번번히 생겼다.

## 관상용 깃랩
프로젝트를 진행하면서 깃을 사용하는 건 스스로 정말 많이 늘었다고 느꼈었다. 사실 그 전까지만 해도 거의 커밋말고는 할 줄 아는게 없었으니깐.

하지만 과연 **깃**이 아니라 **깃랩**을 활용했냐고 묻는다면 **NO**라고 대답 할 것 같다.
깃으로 브랜치를 파고 머지하면서 구현사항들을 추가해나가는건 다행히도 큰 문제 없이 이뤄졌지만, 깃랩의 이슈나 마일스톤 같은 기능들을 거의 활용하지 않은 점이 조금 아쉬움이 남는다. 

# 📝 마무리
생에 첫 팀 프로젝트가 큰 이슈 하나 없이 무탈하게 완성되었다는 점이 정말 다행이다. 
**“사람 5명이 모이면 그중에 하나는 지뢰”** 라는 명언이 있는데 이렇게 무결점인 팀원분들을 만난 건 엄청난 팀운이라고 생각한다.

팀장인 후동님은 백엔드지만 모든 코드를 프론트 중심으로 작성해주셨다. 동시에 문서화도 깔끔하게 작성하여 작업하면서 API 통신으로 소통이 안된 적은 없었던 것 같다.

새미님은 인터랙션에 욕심이 있다는 걸 캐러셀이나 레이아웃 구조 같은 결과물만 봐도 알 수 있었다. 항상 UX에 대해서 고민하고 애니메이션에 신경쓴다는게 코드를 보면 느낄 수 있다.

지원님은 코드의 빈틈이나 버그를 항상 제일 먼저 발견한다. 내가 직접 작성하고 개발하면서도 못찾은 버그들을 이미 원인까지 발견해서 알려주신다.

선우님은 새로운 API 요청이나 버그 수정을 요청하면 거의 몇분 내로 다 작성해서 공유해주신다. 그럼에도 불구하고 JS를 공부하신지 얼마 안됐다고 하셨는데 거의 큰 막힘없이 작업을 하셨던 것 같다.

![](https://velog.velcdn.com/images/cobocho/post/51b35d23-376e-47df-ad2d-fd56d60a43a2/image.png)

...지금 생각해 보면 그 하나가 나라서 몰랐던거 같다.

이렇다보니 열정적인 팀원과 함께 할 수 있는 환경이 얼마나 중요한 요소인지도 알게되었다.
게더타운에 언제 접속하던 항상 계시는 팀원분들을 볼 때면 의지가 안 생길래야 안 생길 수가 없다.

또 혼자서 공부할 땐 익히기 어려웠던 비동기 통신이나 GIT 협업, 역할 분배 같은 작업들을 실제로 부딪쳐 보면서 정말 많은 걸 배울 수 있었다.

그리고 현업 코치님들의 코드리뷰를 받을 수 있었다는 것도 굉장히 좋은 기회였던 것 같다.
사실 **좋은 코드를 작성하는 법을 배울 방법**은 세상에 넘치지만 그에 비해 정작 **내 코드가 좋은 코드인지 확인 할 기회**는 생각보다 많이 존재하지 않는다.
그렇기에 내 코드의 개선점을 파악할 수 있던 점이 정말 좋은 경험이었던 것 같다.

옛말에 “모로 가도 서울만 가면 된다.”라는 말이 있다. 
서울까진 아니어도 광명 정도에는 도착한 것 같아 개인적으로 정말 만족스러운 팀 프로젝트였다.

다음주부턴 리액트가 시작 되는데 바닐라JS를 2달간 하면서 까먹어버린 리액트 감수성을 좀 키워야 할 것 같다.
나중에 기회가 된다면 리액트 라우터나 Next.js, 스타일드 컴포넌트랑 RTK 같은 스택들로 이번 프로젝트를 마이그레이션하는 작업도 해보고 싶은 마음이 든다.

_마지막으로 후동님, 새미님, 선우님, 지원님, 그리고 코치님들에게 다시 한번 감사의 말씀을 전합니다._