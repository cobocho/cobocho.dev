import Post from '@/types/post';

import { slicePage, sortByDate } from '../api';

const generateMockPosts = (quantity: number): Post[] => {
  return Array.from({ length: quantity }, (_, i) => {
    const post: Post = {
      slug: String(i),
      title: String(i),
      category: 'category',
      tags: ['tag1', 'tag2'],
      date: '2023/01/01',
      thumbnail: new Image(),
      description: 'description',
      content: 'content',
      images: {},
    };
    return post;
  });
};

describe('slicePage 테스트', () => {
  it('slicePage는 포스트를 페이지에 따라 분할한다.', () => {
    const posts = generateMockPosts(55);

    expect(slicePage(posts, 1)).toHaveLength(10);
    expect(slicePage(posts, 6)).toHaveLength(5);
  });
});

describe('sortByDate 테스트', () => {
  it('sortByDate는 포스트를 날짜순으로 내림차순한다..', () => {
    const posts = generateMockPosts(3);
    posts[0].date = '2023/01/01';
    posts[1].date = '2023/03/01';
    posts[2].date = '2023/02/01';

    const sortedPosts = sortByDate(posts);

    for (let i = 3; i > 0; i--) {
      expect(sortedPosts.shift()!.date).toBe(`2023/0${i}/01`);
    }
  });
});
