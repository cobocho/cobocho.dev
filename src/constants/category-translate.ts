export const KOR_CATEGORY = {
  recent: 'recent',
  edd: 'edd',
  review: '회고',
  blog: '블로그 제작기',
  book: '독후감',
  'nextstep-js': 'NEXTSTEP',
  '9oormthon': '구름톤',
  'woowa-tech': '우아한테크코스',
  algorithm: '알고리즘',
};

export type KOR_CATEGORY_KEYS = keyof Readonly<typeof KOR_CATEGORY>;

export const CATEGORY_DESCRIPTIONS: {
  [key in KOR_CATEGORY_KEYS]: string;
} = {
  recent: '최근 포스트입니다',
  review: '반성과 후회의 장',
  blog: '관상용 블로그 육성일기',
  edd: 'Error Driven Development',
  book: '책책책 책을 읽읍시다',
  'nextstep-js': '바닐라JS 방황기',
  '9oormthon': '구름톤 생존기',
  'woowa-tech': '우아한테크코스',
  algorithm: '자료구조에서 살아남기',
};
