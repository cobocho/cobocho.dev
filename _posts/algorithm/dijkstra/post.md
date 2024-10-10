---
title: '자바스크립트로 구현하는 다익스트라 알고리즘 (with Heap)'
description: '힙이 없는 언어 사용자의 울분'
date: '2024/02/14'
tags: ['알고리즘', '다익스트라', '힙']
---

# 최단거리의 미학

최단 경로를 구하는 알고리즘에는 다양한 경우의 수가 주어진다.

가중 유향 그래프에서 최단거리를 구하는 [벨만-포드 알고리즘(Bellman-Ford algorithm)](https://ko.wikipedia.org/wiki/%EB%B2%A8%EB%A8%BC-%ED%8F%AC%EB%93%9C_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)
최단 거리 노드만을 구하는 [A* 알고리즘(A* search algorithm)](https://en.wikipedia.org/wiki/A*_search_algorithm)

이외에도 여러 길찾기 알고리즘이 존재하지만, 이번에는 최단거리 알고리즘 중 가장 유명한 **다익스트라 알고리즘**을 자바스크립트로 직접 구현해보려한다.

# 다익스트라 알고리즘의 기본 원리

다익스트라 알고리즘은 **출발 노드 한 지점을 기준으로 다른 모든 노드로 가는 각각의 최단거리를 계산**하는 알고리즘이다.

다익스트라 알고리즘은 다음과 같은 과정을 반복한다.

1. 출발 지점을 지정한다.
2. 그래프에서 현재 노드에서 갈 수 있는 경로 중 가장 거리가 짧은 노드를 선택한다.
3. 해당 노드를 거친 거리가 기존 노드의 최단거리 보다 짧다면 최단거리를 갱신한다.
4. 이후 반복

3번 과정으로 인해 다익스트라 알고리즘은 일종의 그리디 알고리즘으로 분류되기도 한다.

![](1.png)

위와 같이 노드 5개, 간선 7개를 가진 그래프가 존재한다는 상황에서 알아가보자.

## 출발 지점 지정 및 초기화

![](2.png)

각 노드의 최단거리의 기준이 될 출발 지점을 `1`로 지정한다.

![](3.png)

이때 거리 테이블을 `[0, Infinity, Infinity, Infinity, Infinity]`와 같이 도달할 수 없다는 의미의 `Infinity`로 출발 지점을 제외한 노드에 초기화한다.

## 현재 노드에서 갈 수 있는 가장 짧은 노드를 선택

![](4.png)

이제 현재 노드의 방문 가능 노드를 추린다.

`1` 노드에서 다른 노드로 갈 수 있는 경로는 `2`, `3`, `5`가 존재한다.
현재 해당 노드들의 최단거리는 `Infinity`이므로 최단거리를 갱신하여 방문처리한다.

![](5.png)

그리고 가장 가까운 노드인 `3` 노드에 방문한다.

![](6.png)

이후 똑같이 `3` 노드에서 가능한 경로를 탐색한다.

![](7.png)

`4` 노드의 경우 기존 최단거리인 `Infinity`보다 `3의 최단거리(2) + 3에서 4로 가는 거리(1) = 3`가 더 낮으므로 값을 갱신한다.

`5` 노드의 경우도 기존 최단거리인 `5`보다 `3의 최단거리(2) + 3에서 5로 가는 거리(2) = 5`가 더 낮으므로 값을 갱신한다.

![](8.png)
![](9.png)

이후 `4` 노드는 방문 가능한 노드가 없으므로 넘어간다.
나머지 `2 => 5`, `5 => 4` 노드의 그래프도 확인하지만 해당 경우는 기존 최단거리보다 짧지 않으므로 값을 갱신하지 않는다.

위 과정을 반복하면 출발 노드 `1`에 대한 나머지 노드의 최단 거리를 계산할 수 있다.

# 코드로 보기

```js
const graph = Array.from({ length: n + 1 }, () => []);
const d = Array.from({ length: n + 1 }, () => Infinity);

for (const v of arr) {
  const [from, to, dist] = v;
  graph[from].push([to, dist]);
}

const queue = [];
queue.push([start, 0]);
d[start] = 0;

while (queue.length !== 0) {
  const [curNode, dist] = queue.pop();

  if (d[curNode] < dist) continue;

  for (const v of graph[curNode]) {
    const node = v[0];
    const cost = dist + v[1];

    if (cost < d[node]) {
      queue.push([node, cost]);
      queue.sort((a, b) => a[1] - b[1]);
      d[node] = cost;
    }
  }
}
```

그림 백장보다 코드 열줄이 더 이해하기 편하니 코드로 확인해보자. 위 코드를 조각조각 쪼갠다면 다음과 같다.

```js
const graph = Array.from({ length: n + 1 }, () => []);
const d = Array.from({ length: n + 1 }, () => Infinity);
```

**graph**

`graph`는 인덱스마다 각각의 노드를 가지는 이차원 배열이다.

**d**

`d`는 현재 각 노드의 최단 거리를 저장하는 배열이며 초깃값으로 `Infinity`를 가진다.

```js
for (const v of arr) {
  const [from, to, dist] = v;
  graph[from].push([to, dist]);
}
```

주어진 입력값을 바탕으로 그래프를 초기화한다.

> 참고로 해당 코드는 **단방향 간선**을 기준으로 구현되었다!
> 만약 무방향 간선이라면 역방향에도 경로를 추가하는 것을 잊지 말자.

```js
const queue = [];
queue.push([start, 0]);
d[start] = 0;
```

이후 방문 노드 목록을 저장할 큐를 하나 생성해주자.
그리고 출발 지점에 대한 초기화를 실행한다.

만약 출발 지점이 `1`이라면 `queue[1]`의 경우 최단거리는 당연히 `0` 일테니 해당 값으로 초기화 하고 방문 노드에 `[출발 노드, 0]`을 삽입하여 출발 지점부터 탐색을 시작하도록 한다.

```js
while (queue.length !== 0) {
  const [curNode, dist] = queue.pop();

  if (d[curNode] < dist) continue;
  //...
}
```

이후 큐에서 가장 짧은 거리를 가진 방문 노드를 꺼낸다.
이때, 만약 **현재 최단 거리보다 꺼내온 방문 노드의 거리가 더 길다면 스킵한다.**

이유는 간단한다. 가져온 방문 노드가 기존 거리보다 더 길다면 해당 노드에서 어떤 값을 더해봤자 최단 거리를 갱신할 수 있는 경우의 수는 존재하지 않기 때문이다.

_물론 음수는 제외한다! 이는 다익스트라 알고리즘이 음수 가중치 간선이 존재하는 경우 사용이 불가능한 이유이기도 하다._

```js
for (const v of graph[curNode]) {
  const node = v[0];
  const cost = dist + v[1];

  if (cost < d[node]) {
    d[node] = cost;
    queue.push([node, cost]);
    queue.sort((a, b) => b[1] - a[1]);
  }
}
```

그리고 가져온 가장 가까운 노드가 방문 가능한 노드를 탐색한다.
이때 `기존 노드의 최단거리(dist) + 가져온 노드에서 목표 노드의 거리(v[1])`이 목표 노드의 기존 최단거리보다 짧을 경우 최단거리를 갱신한다. 그리고 큐에 `[타켓 노드, 방금 갱신된 최단거리]`를 삽입하여 위 과정을 반복하도록 한다.

이때 정렬을 통하여 이후 과정이 반복되더라도 `pop()`으로 가장 가까운 노드를 반환하도록 설정한다.

하지만 이때, 정렬로 인해서 시간 복잡도에 문제가 생기게 된다.

## 반복된 정렬로 인해 발생하는 비용

위에서도 볼 수 있다시피 가장 가까운 노드를 가져오기 위해서 `sort` 메서드를 활용해 정렬을 수행한다. 하지만 정렬을 반복적으로 실행할 경우 성능상 문제는 더욱 커진다. 만약 현재 큐에서 정렬해야할 노드가 몇만개라면...? 방문해야하는 노드의 개수가 늘어날수록 정렬에서 걸리는 시간과 메모리 또한 기하급수적으로 늘어날 것이다. 이러한 현상을 해결하기 위해서 **우선순위 큐**라는 자료구조를 사용해야한다.

# 우선순위 큐(Priority Queue)

비로소 큐라고 한다면 먼저 들어온 요소가 먼저 나가는, 즉 **선입선출(FIFO, First In Fist Out)**의 원칙을 지키는 것이 도리이다. 하지만 우선순위 큐의 경우 먼저 들어온 것과는 상관이 없이 정해놓은 우선순위에 따라서 값을 반환한다.

그래서 우선순위 큐를 어떻게 구현하냐? 여기서 **힙**이라는 자료구조가 등장한다.

## 힙(Heap)이란?

힙(Heap)이란 (완전 이진 트리(Complete Binary Tree))[https://www.geeksforgeeks.org/complete-binary-tree/]로 이루어진 자료구조이다.

![최소 힙과 최대 힙](10.png)

예를 들어 **최소 힙**의 경우 모든 부모 노드는 자식 노드보다 값이 작거나 같고,
**최대 힙**의 경우 모든 부모 노드는 자식 노드보다 값이 크거나 같다.

따라서 힙에 특정 값을 추가하더라도 이진 탐색을 통해 값을 분류할 수 있게되니 이진 탐색의 시간 복잡도인 `O(log n)`와 동일하다.

## 그래서 자바스크립트에서 힙을 어떻게 쓰죠?

`Java`, `C++`의 경우 `PriorityQueue`가 제공되며 `Python`의 경우 `heapq, heapify`가 존재한다.

_???: 그렇다면 자바스크립트에서는 어떻게 쓰면 되나요?_

하지만 자바스크립트에는 내장 힙 관련 라이브러리가 없다.
즉 **직접 손수 맹글어 쓰라 이 말이다.**

![우리의 심경을 대변해준다](11.png)

어쩔 수 있나 지름길이 없다면 자갈밭을 걸을 수 밖에 없다.

최소 힙을 자바스크립트로 직접 구현해보자.

# 자바스크립트로 최소 힙 만들기

```js
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(data) {
    if (this.size() === 0) {
      this.heap.push(data);
      return;
    }

    this.heap.push(data);
    let checkedIdx = this.heap.length - 1;

    while (checkedIdx > 0) {
      let parentIdx = Math.floor((checkedIdx - 1) / 2);
      if (this.heap[parentIdx][1] > this.heap[checkedIdx][1]) {
        this.swap(parentIdx, checkedIdx);
        checkedIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.size() === 0) return;
    if (this.size() === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIdx = 0;

    while (currentIdx < this.size()) {
      let left = currentIdx * 2 + 1;
      let right = left + 1;

      if (!this.heap[left]) break;

      let smaller = this.heap[right] !== undefined ? (this.heap[left][1] <= this.heap[right][1] ? left : right) : left;

      if (this.heap[smaller][1] < this.heap[currentIdx][1]) {
        this.swap(smaller, currentIdx);
        currentIdx = smaller;
      } else {
        break;
      }
    }

    return value;
  }
}
```

힙의 요소를 컨트롤하는데에는 `Node` 클래스를 만들 수도 있지만 배열을 사용해도 인덱스를 통해 트리 형태로 구조화가 가능하니 배열을 사용한다.

메서들을 설명하자면 `empty`는 힙의 길이를 반환하고, `swap`은 인자로 받은 두 인덱스의 위치를 변경한다. 핵심 메서드는 `push`와 `pop`에 존재한다.

## 삽입(push)

큐에 데이터를 삽입하는 과정은 다음과 같다.

```js
  push(data) {
    if (this.size() === 0) {
      this.heap.push(data);
      return;
    }

    this.heap.push(data);
    let checkedIdx = this.heap.length - 1;

    while (checkedIdx > 0) {
      let parentIdx = Math.floor((checkedIdx - 1) / 2);
      if (this.heap[parentIdx][1] > this.heap[checkedIdx][1]) {
        this.swap(parentIdx, checkedIdx);
        checkedIdx = parentIdx;
      } else {
        break;
      }
    }
  }
```

1. 배열의 가장 마지막에 데이터를 `push`한다.
2. 현재 인덱스를 마지막 인덱스로 설정한다.
3. 부모 인덱스의 요소와 값을 비교한다.
4. 만약 부모의 값이 더 작다면 두 요소의 위치를 바꾸고 현재 인덱스를 부모 인덱스로 교체한다.
5. 3 ~ 4 과정을 반복한다. 부모의 값이 더 크거나 현재 인덱스가 `0`인 경우 정렬을 종료한다.

![](12.png)

그림으로 정리하면 다음과 같다. 위와 같은 힙이 존재한다고 가정하자.

![](13.png)

```js
this.heap.push(data);
let checkedIdx = this.heap.length - 1;
```

이때 해당 배열에 `2`를 삽입하면 위와 같다.

이제 부모 인덱스와 비교한다. 부모 인덱스는 현재 노드과 좌측일때와 우측일때를 모두 고려하여
`Math((현재 인덱스 - 1) / 2)`를 통해 계산한다.

![](14.png)

```js
while (checkedIdx > 0) {
  let parentIdx = Math.floor((checkedIdx - 1) / 2);
  if (this.heap[parentIdx][1] > this.heap[checkedIdx][1]) {
    this.swap(parentIdx, checkedIdx);
    checkedIdx = parentIdx;
  } else {
    break;
  }
}
```

그림을 보면 부모 노드 `4`가 `2`보다 큰 것을 알 수 있다. 따라서 `swap` 메서드를 통해 두 인덱스를 서로 변경한다.

![](15.png)

이후 인덱스를 변경한 후 비교했을때 부모노드 `1`은 `2`보다 작으므로 정렬 로직을 중단한다.

## 추출(pop)

```js
  pop() {
    if (this.size() === 0) return;
    if (this.size() === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIdx = 0;

    while (currentIdx < this.size()) {
      let left = currentIdx * 2 + 1;
      let right = left + 1;

      if (!this.heap[left]) break;

      let smaller = this.heap[right] !== undefined ? (this.heap[left][1] <= this.heap[right][1] ? left : right) : left;

      if (this.heap[smaller][1] < this.heap[currentIdx][1]) {
        this.swap(smaller, currentIdx);
        currentIdx = smaller;
      } else {
        break;
      }
    }

    return value;
  }
```

추출은 삽입의 완벽한 반대 과정이다. 차이점이 있다면 탈출 조건이 `0`에서 마지막으로 변경된 것과 부모 인덱스가 아닌 자식 인덱스를 통해 비교한다는 점이다.

![](16.png)

위와 같은 힙에서 배열의 첫번째를 가져온 후 정렬하는 로직을 실행하자.

```js
const value = this.heap[0];
this.heap[0] = this.heap.pop();
let currentIdx = 0;
```

우선 배열의 `0`번째 인덱스를 가져온 후 배열의 마지막 값을 `pop`을 통해 제거 후 `0`번째 인덱스에 위치시킨다.

```js
while (currentIdx < this.size()) {
  let left = currentIdx * 2 + 1;
  let right = left + 1;

  //...
}
```

이후 현재 인덱스의 좌우측 자식 노드의 인덱스를 계산한다.

```js
if (!this.heap[left]) break;
```

이때 좌측 인덱스 자식이 없는 경우 해당 노드가 현재 트리 분포의 끝이라는 의미이니 정렬을 종료한다.

![](17.png)

```js
let smaller = this.heap[right] !== undefined ? (this.heap[left][1] <= this.heap[right][1] ? left : right) : left;
```

그리고 좌우측 자식 노드 중 더 작은 노드의 인덱스를 가져온다.
만약 우측 자식이 없을 시 왼쪽 자식을 할당하며 우측 자식이 있을 시 각 자식 노드의 값을 비교한다.

![](18.png)

```js
if (this.heap[smaller][1] < this.heap[currentIdx][1]) {
  this.swap(smaller, currentIdx);
  currentIdx = smaller;
} else {
  break;
}
```

만약 더 작은 자식 노드의 값이 더 작다면 두 노드의 위치를 바꾸고, 아닐 경우 정렬 로직을 종료한다.

![](19.png)

이후 위 과정을 반복하면 결국 모든 부모 노드는 자식 노드보다 값이 작거나 같은 상황을 유지할 수 있다.

> 모든 코드와 내용에 대한 오류 지적을 환영합니다.

# References

<hr>

- [이것이 취업을 위한 코딩 테스트다 with 파이썬](https://m.yes24.com/Goods/Detail/91433923)
- [관련 문제 (백준 - 최단경로)](https://www.acmicpc.net/problem/1753)
- [관련 문제 (백준 - 최소 힙)](https://www.acmicpc.net/problem/1927)
- [관련 문제 (프로그래머스 - 배달)](https://school.programmers.co.kr/learn/courses/30/lessons/12978)
