import { calculatePages, replaceSpaceToHyphen } from '../utils';

describe('replaceSpaceToHyphen 테스트', () => {
  it.each([
    { input: 'test word', result: 'test-word' },
    { input: 'test test word', result: 'test-test-word' },
    { input: 'testWord', result: 'testWord' },
  ])(
    'replaceSpaceToHyphen 호출 시 입력받은 문자열의 공백을 `-`로 변경한다.',
    ({ input, result }) => {
      const converted = replaceSpaceToHyphen(input);

      expect(converted).toBe(result);
    },
  );
});

const createPageResult = (number: number) => Array.from({ length: number }, (_, i) => i + 1);

describe('calculatePages 테스트', () => {
  it.each([
    { input: 1, result: createPageResult(1) },
    { input: 10, result: createPageResult(1) },
    { input: 11, result: createPageResult(2) },
    { input: 20, result: createPageResult(2) },
    { input: 100, result: createPageResult(10) },
  ])(
    'calculatePages 호출 시 입력받은 포스트 수를 대한 페이지 수를 반환한다.',
    ({ input, result }) => {
      const converted = calculatePages(input);

      expect(converted).toEqual(result);
    },
  );
});
