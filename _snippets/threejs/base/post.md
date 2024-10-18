---
title: 'Three.js 기본 객체 소개'
date: '2024/10/18'
---

# Three.js 기본 객체

## 씬 (Scene)

`Scene`은 렌더링할 모든 요소인 3D 그래픽을 구성하는 컨테이너 역할을 한다.

## 기하학 객체 (Geometry)

`Geometry`는 렌더링 될 객체의 형태를 정의한다. `Geometry`는 정점*Vertex*와 면*Face*으로 구성되며, 이들이 모여 3D 형태를 만든다.

## 재질 (Material)

`Material`은 객체의 표면을 정의한다. `Material`은 객체가 어떻게 빛을 반사하고 어떤 색상을 가질지를 결정한다.

## 메쉬 (Mesh)

`Mesh`는 `Geometry`와 `Material`을 결합한 객체이다. `Mesh`는 `Geometry`의 형태와 `Material`의 표면을 결합하여 3D 객체를 만든다.
간단한 큐브 객체를 만드는 예제 코드는 다음과 같다.

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)
```

## 카메라 (Camera)

`Camera`는 뷰포트에 보이는 부분을 결정한다. `Camera`는 렌더링된 객체를 보여주는 관찰자 역할을 한다.

### 시야각

`PerspectiveCamera`는 시야각을 설정할 수 있다. 시야각은 카메라의 시야를 결정하는 속성이다. 시야각이 작을수록 화면에 가까운 부분만 보이고, 시야각이 클수록 화면에 넓은 부분이 보인다.
`PerspectiveCamera`은 두가지의 인자를 받는데, 첫번째 인자는 시야각*fov*, 두번째 인자는 화면의 가로 세로 비율*aspect*이다.

![시야각 30의 경우](1.png)

![시야각 70의 경우](2.png)

# 렌더러 (Renderer)

`Renderer`는 `Scene`과 `Camera`를 결합하여 렌더링된 결과를 화면에 보여준다.

# 객체 변형

`Mesh`나 `Camera` 같은 `Scene` 내에서 기하학적인 객체들을 변형을 시킬 수 있다. 이러한 기하학 객체들은 `Object3D`를 상속받아 `position`, `rotation`, `scale` 등의 속성을 가지고 있다.

## 위치 (Position)

`position`은 객체의 위치를 결정한다. `position`은 `Vector3`의 인스턴스로서 `Object3D` 객체의 위치를 결정한다. `Vector3`는 3차원 공간의 좌표를 나타내는 객체이다.

```javascript
cube.position.set(1, 1, 1)

// or

cube.position.x = 1
cube.position.y = 1
cube.position.z = 1
```

![위치가 이동된 객체](3.png)

## 크기 (Scale)

`scale`은 객체의 크기를 결정한다. `scale`은 `Object3D` 객체의 크기를 결정한다.

```javascript
cube.scale.set(2, 2, 2)

// or

cube.scale.x = 2
cube.scale.y = 0.5
cube.scale.z = 0.5
```

![크기가 변경된 객체](4.png)

## 회전 (Rotation)

`rotation`은 객체의 회전을 결정한다. `rotation`은 `Euler`의 인스턴스로서 `Object3D` 객체의 회전을 결정한다. 회전의 기준이 되는 축은 객체를 중심으로 결정된다. `Math.PI` 상수를 사용하여 라디안 단위로 회전을 결정할 수 있다. `Math.PI`는 180도를 의미한다.

```javascript
cube.rotation.set(0, Math.PI / 4, 0)

// or

cube.rotation.x = 0
cube.rotation.y = Math.PI / 4
cube.rotation.z = 0
```

![회전된 객체](5.png)

객체를 여러축 기준으로 회전시키다 보면 예상치 못한 결과가 나올 수 있다. 이는 객체가 회전하면서 축 또한 같이 회전하기 때문이다. 이러한 문제를 해결하기 위해서는 `rotation.reorder`를 사용하여 회전의 순서를 결정할 수 있다.

## 그룹 (Group)

대부분의 경우에는 여러 객체를 그룹으로 묶어서 관리하는 것이 편리하다. `Group`은 여러 `Object3D` 객체를 묶어서 관리할 수 있는 객체이다.

```javascript
const scene = new THREE.Scene()
const group = new THREE.Group()

scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)

cube1.position.set(0.7, -0.6, 1)
cube1.rotation.set(Math.PI * 0.25, Math.PI * 0.25, Math.PI * 0.25)

group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
)

group.add(cube2)
```

![그룹화된 객체](6.png)
