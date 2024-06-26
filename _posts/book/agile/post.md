---
title: '개발자 지망생이 읽은 「함께 자라기 : 애자일로 가는 길」'
description: '프로그래머의 커뮤니케이션에 관하여'
date: '2023/05/21'
tags: ['애자일', '독후감']
---

# 개요

며칠간 편도염으로 인해 고생을 좀 했다.
코로나도 한번 안 걸려 봤는데 예상치도 못한 편도염에 걸려서 살면서 처음으로 39도가 넘는 고열을 겪어보았다.

비겁한 변명이 아니라 정말 코드를 짤 컨디션이 되질 않아서 어쩔 수 없이 요양도 할 겸 침대에 누워서 예전에 사놓은 **「함께 자라기 : 애자일로 가는 길」** 을 읽어보기로 하였다.

예전부터 프로그래머들이 그렇게 말하던 **애자일**에 대한 궁금증이 조금이나마 풀릴까 하는 생각에 사놓은 기억이 있는데 책장 어딘가에 방치해두다가 곧 팀 프로젝트도 얼마 남지 않았고 좋은 협업에 대한 생각도 드는 시점에서 이번 기회에 읽어보게 되었다.

이 책을 읽으면서 인상 깊은 내용이나 구절들을 정리해 보며 애자일에 대한 이해 아닌 이해(?)를 해 볼 생각이다.

# 기억에 남는 이야기들

## 직무 성과의 상관성

미국의 **존 헌터**는 미국 연방정부의 채용 데이터를 바탕으로 채용 시 가장 효과적인 예측 변수가 무엇인지에 대한 연구를 진행한 적이 있다.
다르게 말하자면 **'과연 어떤 요소가 A급 직원을 뽑는데 가장 큰 영향을 끼칠까?'** 라고 할 수 있다.

결과는 다음과 같았다.

- 작업 샘플 테스트 (채용 이후 실제로 할 작업의 일부를 해보는 테스트) **[0.54]**
- 지능 테스트 **[0.54]**
- 성실성 테스트 **[0.31]**
- 레퍼런스 체크 (이전 직장 상사 등에게 확인) **[0.26]**
- 경력 연차 **[0.18]**
- 학력 **[0.1]**
- 필체 **[0.02]**
- 나이 **[-0.01]**

예상외로 연차보다 작업 샘플 테스트나 지능 테스트 같은 요소들이 더욱 연관성이 높았다.
물론, 이건 단순한 결과이고 신입일수록 연차의 연관성을 좀 더 높다는 결과도 존재한다.

현재 웹 개발 채용 프로세스에서 자주 볼 수 있는 항목들이 순위권에 존재했다.

작업 샘플 테스트 같은 경우는 **과제 전형**과 비슷하고 지능 테스트는 **코딩 테스트**, 성실성 테스트는 **자소서**를 비추는 듯한 느낌이 들었다.

## 1만 시간의 배신

대부분의 사람들은 **1만 시간의 법칙**이라는 말을 들어봤을 것이다.
무엇이든 1만 시간을 투자한다면 한 분야의 장인이 될 수 있다는 말이다.

하지만 이는 한가지의 오류를 범하고 있다. 우리는 이 시간을 **의도적 수련**의 시간으로 채워야 한다.

> "55년 동안 걸었다고 걷는 게 점점 더 나아지고 있는 건 아닙니다. 자신이 즐기는 걸 잘한다고 해서 더 뛰어나게 될 것이라고 믿는 것은 미신입니다."
> _- 안데쉬 에릭손_

그렇다면 **의도적 수련**이란 과연 무엇인가? 책에서는 이를 다음과 같이 정의한다.

> 의도적 수련은 **기량의 향상**을 목적으로 두어야 한다.

의도적 수련의 가장 큰 목표는 **기량의 향상**이다. 연주가의 공연시간이나 체스 선수의 토너먼트 같은 시간들은 이에 포함되지 않는다.
만약에 내가 개발자라면? 회사에서 단순히 내 업무를 진행하고 야근하면서 쌓은 시간은 의도적 수련에 포함되지 않는다는 소리이다.

하지만 업무를 하면서도 짧고 반복적인 피드백을 받으며 실수를 교정하는 사이클을 통해서 업무를 통해 나의 기량이 효과적으로 상승한다면, 그것은 의도적 수련이라 말할 수 있다.

## 자기 계발은 "복리"이다

조직에는 3가지 작업이 존재한다.

- A 작업

A 작업은 가장 대표적으로 드러나는 작업으로서 **제품과 서비스를 생산하고 판매하는 프로세스**를 의미한다.

- B 작업

B 작업은 A 작업의 **시스템과 프로세스를 설계**한다.

- C 작업

C 작업은 기업의 **사고방식과 상호 작용 방식**을 개선한다.

![일반 조직의 업무 프로세스](1.png)

일반 조직의 경우에는 A 작업에만 몰두한다. 그러다 보니 기업은 항상 같은 결과물을 만들어 내며 성장하지 않는다.

![복리 조직의 업무 프로세스](2.png)

하지만 복리 조직의 경우에는 직전 단계의 결과물을 바탕으로 조직이 성장하여 이후에는 더욱 개선된 결과물이 나오게 된다.

이러한 과정은 조직의 성장을 지수적, 즉 **기하급수적으로 성장하게 만든다.**

## 몰입 이론

이 책에서는 몰입에 관하여 **미하이 칙센트미하이의 몰입이론**을 바탕으로 설명한다.

![몰입 채널 도식](3.png)

우리는 **몰입**을 통해 학습에서 최고의 퍼포먼스를 끌어낼 수 있다.
몰입의 조건으로는 두 가지가 존재하는데 바로 **적절한 난이도와 실력**을 바탕으로 삼야야 한다.

너무 높은 난이도의 일은 사람에게 불안감을 느끼게 하고 그렇다고 낮은 난이도의 일은 사람을 지루하게 만든다.

우리는 그러므로 항상 나의 능력보다 약간 높은 기준치를 목표로 삼으며 몰입하며 성장할 수 있어야 한다.

낮은 난이도로 인하여 지루함이 느껴질 때는 작업물의 요구 수준을 높여 난이도를 높이거나 보조 도구의 개입을 줄여 개인 능력을 제한시키고,
높은 난이도로 인하여 불안감이 느껴질 때는 스터디나 교육을 통해 개인 능력을 높이거나 가장 간단한 단계부터 시작하여 난이도를 낮추어 몰입 영역에 들어가야 한다.

## 고독한 전문가

보통 사람들이 생각하는 고수 개발자들의 이미지는 대외관계 없이 방에 틀어박혀서 하루 종일 프로그래밍만 하는 사람이라는 편견이 존재한다. _(나 혼자만의 편견일 수도 있다)_

하지만 실제 연구 결과에서는 **뛰어난 소프트웨어 개발자일수록 타인과 인터랙션에 더 많은 시간을 쓰며, 초보 개발자들에게 조언을 할 때 사회적인 측면을 포함시킨다.** 라는 결과가 나왔다.

프로그래밍 실력에 사회성이 포함되지 않는다는 건 오래전 얘기라는 소리이다.

## 최고 공유와 최다 공유

두 명의 디자이너에게 광고 디자인을 맡긴 후 3가지의 상황을 제시하였다.

- 각자 하나의 디자인을 만든 후 서로 공유하기
- 각자 3개의 디자인을 만든 후 서로 가장 잘한 한 가지만 공유하기
- 각자 여러 개의 디자인을 만든 후 서로 모두 공유하기

이후 두 디자이너의 신뢰도를 테스트하였을 때 첫 번째와 두 번째의 경우는 **서로의 신뢰가 감소**하였고, 세 번째의 경우만 **신뢰가 유의미하게 증가**하였다.
즉 하나 공유나 최고 공유의 방식은 신뢰 방면에서 봤을 때 **안 하느니만 못하다**는 소리와 같다.

두 케이스의 경우는 서로 **공유에 의한 기대감보다 불안감**을 느끼게 만든다.

_'만약 상대방이 내 작품을 무시하면 어쩌지?_ 라는 생각이 들기도 하며 동시에 _'내 의견에 저 사람이 상처받으면 어쩌지?'_ 라는 생각에 솔직한 피드백을 주지 못하기도 한다.

제작자는 `작업물 = 나`라는 생각을 가지게 되며 이에따른 방어기제가 일어나기도 한다.

하지만 여러 개를 공유하는 최다 공유는 `작업물 = 나`라는 생각이 깨지게 되며 이에 따라 솔직한 피드백을 주고받으며 개선 정도를 크게 늘릴 수 있다.

과연 우리는 **신뢰를 깎아 먹는 공유**와 **신뢰를 쌓아가는 공유** 중 어떤 공유를 하고 있을까?

# 개인적인 느낀 점

처음에는 사실 그저 단순히 애자일이 뭔지 궁금해서 구매했던 책이었다. 하지만 직접 읽어보니 애자일이 무엇인지 설명하는 개념서라기보단 프로그래머로서 추구해야 할 학습 방법과 커뮤니케이션의 방향성을 잡아주는 책이라는 느낌이 강하게 들었다.

어쩌면 그렇기에 이 책의 부제가 **애자일로 가는 길**인 것일 수도 있을 것 같다.

협업을 어떻게 해야 하나뿐만이 아니라, 어떤 학습 마인드를 가지고 어떤 환경을 구축하는 것이 효율적인지 알 수 있었다.

특히 실제로도 학습하면서 몰입을 중요시하는 편이기에 책에서 몰입에 대한 부분이 꽤나 인상 깊었는데 상기한 바와 같이 몰입 영역을 도식화하여 상황에 따른 몰입 방법을 제시 한 부분이 이후에 학습하면서 큰 도움이 될 것 같다.

동시에 정곡을 찌르는 뾰족한 글들 또한 존재하였다.
_'과연 내가 지금까지 해온 회고가 의미 있는 회고였을까?'_, _'완전 내 이야긴데?'_ 라는 생각이 드는 부분도 있었고 반성할 만한 부분 또한 존재하였다.

그래도 책을 읽으면서 가장 크게 얻은 것은 **커뮤니케이션의 중요성**이라 말할 수 있을 것 같다.
사실 개발자, 특히 프론트엔드에게 커뮤니케이션이 중요하다는 말은 끊임없이 듣고 봐왔지만, 정말로 그게 왜 중요한가에 대해서는 크게 체감 한 적이 없었다.
이전에 처음으로 팀 프로젝트를 경험하면서도 사실 커뮤니케이션 부분에서 큰 문제를 겪지 않았고 _(사실 이건 그냥 팀운이 좋았다)_
커뮤니케이션이 아무리 중요해봤자 결국 제일 중요한 건 개인 능력이 받쳐주어야 하는 것 아닌가? 라는 생각을 은연중에 가지고 있었다.

하지만 책을 읽으면서 실제 업무, 그리고 현업에서 커뮤니케이션이 긍정적으로, 또는 부정적으로 영향을 끼치는 케이스들을 읽다 보니 어째서 개발자에게 커뮤니케이션 능력이 중요한지 알 수 있는 계기가 된 것이 이 책을 읽고 나서 얻게 된 가장 큰 수확이 아닐까 싶다.

물론 이 책에서도 말하듯이 단순히 `애자일 > 폭포수 모델`이라고 단정 지을 수는 없다. 애자일 모델 또한 완벽한 모델은 아니기 때문이다.
하지만 어째서 폭포수 모델 이후에 애자일 방법론이 나왔는지 또한 생각해야 할 부분이고 많은 기업들이 애자일을 도입하기 위해 노력하는지 생각해야 할 부분이다.

사실 그저 책 한 권 읽고 어떤 게 애자일이고 어떤 건 애자일이 아니고 라고 말할 기준을 알 수 있는 것도 아니고 애자일을 깨우쳤다고도 할 수 없다.

다만 프로그래머로서의 태도와 커뮤니케이션 방식에 대해 조금이라도 깨달은 것이 있다면 그것만으로도 만족스러운 성과라고 할 수 있지 않을까.

> Referenced by [애자일 이야기](http://agile.egloos.com/)
