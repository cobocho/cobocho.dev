import { renderHook } from '@testing-library/react';
import { JSXElementConstructor, PropsWithChildren } from 'react';
import { act } from 'react-dom/test-utils';

import { ThemeContextProvider, ThemeFlag, useTheme } from '../useTheme';

describe('useTheme 테스트', () => {
  let wrapper: JSXElementConstructor<PropsWithChildren>;

  beforeEach(() => {
    wrapper = ({ children }: PropsWithChildren) => (
      <ThemeContextProvider>{children}</ThemeContextProvider>
    );

    window.localStorage.clear();
  });

  const setLocalStorage = (id: string, data: unknown) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };

  it('ThemeContextProvider 외부에서 useTheme 호출 시 에러가 발생한다.', () => {
    expect(() => renderHook(useTheme)).toThrow(
      'useTheme 커스텀 훅은 ThemeContextProvider 내부에서 호출해야합니다.',
    );
  });

  it.each([{ dark_mode: ThemeFlag.light }, { dark_mode: ThemeFlag.dark }])(
    'useTheme는 로컬 스토리지에 dark_mode가 존재하면 해당 값으로 기본값을 설정한다.',
    ({ dark_mode }) => {
      setLocalStorage('dark_mode', dark_mode);

      const { result } = renderHook(useTheme, {
        wrapper,
      });

      expect(result.current.theme).toBe(dark_mode);
    },
  );

  it('useTheme는 로컬 스토리지에 dark_mode가 존재하지 않으면 라이트 모드를 기본값으로 설정한다.', () => {
    const { result } = renderHook(useTheme, {
      wrapper,
    });

    expect(result.current.theme).toBe(ThemeFlag.light);
  });

  it('themeToggle 호출시 현재 테마가 변경된다.', () => {
    const { result } = renderHook(useTheme, {
      wrapper,
    });

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe(ThemeFlag.dark);

    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe(ThemeFlag.light);
  });
});
