import { renderHook } from '@testing-library/react';
import { JSXElementConstructor, PropsWithChildren } from 'react';
import { act } from 'react-dom/test-utils';

import { postViewFlag, PostViewProvider, usePostView } from '../usePostView';

describe('usePostView 테스트', () => {
  let wrapper: JSXElementConstructor<PropsWithChildren>;

  beforeEach(() => {
    wrapper = ({ children }: PropsWithChildren) => <PostViewProvider>{children}</PostViewProvider>;
  });

  it('PostViewProvider 외부에서 usePostView 호출 시 에러가 발생한다.', () => {
    expect(() => renderHook(usePostView)).toThrow(
      'usePostView 커스텀 훅은 PostViewProvider 내부에서 호출해야합니다.',
    );
  });

  it('usePostView의 기본 postView는 두 개씩 보기이다.', () => {
    const { result } = renderHook(usePostView, {
      wrapper,
    });

    ('usePostView 커스텀 훅은 PostViewProvider 내부에서 호출해야합니다.');

    expect(result.current.postView).toBe(postViewFlag.two);
  });

  it('changePostView 호출시 postView가 변경된다.', () => {
    const { result } = renderHook(usePostView, {
      wrapper,
    });

    act(() => result.current.changePostView(postViewFlag.one));
    expect(result.current.postView).toBe(postViewFlag.one);

    act(() => result.current.changePostView(postViewFlag.two));
    expect(result.current.postView).toBe(postViewFlag.two);
  });
});
