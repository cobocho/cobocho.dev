import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import usePagination from '../usePagination';

const mockUsePathname = jest.fn();

const mockUseRouter = jest.fn();

const mockUseParams = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
  useRouter() {
    return mockUseRouter();
  },
  useParams() {
    return mockUseParams();
  },
}));

describe('usePagination 테스트', () => {
  let pushMockFn: jest.Mock<any, any, any>;

  beforeEach(() => {
    pushMockFn = jest.fn();
    mockUseRouter.mockImplementation(() => {
      return {
        push: pushMockFn,
      };
    });
  });

  it.each([{ page: '1' }, { page: undefined }])(
    '현재 페이지가 1이거나 메인페이지라면 isFirstPage는 true이다.',
    ({ page }) => {
      mockUsePathname.mockImplementation(() => '/');
      mockUseParams.mockImplementation(() => ({
        page,
      }));

      const { result } = renderHook(() => usePagination(20));

      expect(result.current.isFirstPage).toBe(true);
    },
  );

  it.each([{ page: '2' }, { page: '3' }])(
    '현재 페이지가 1이거나 메인페이지가 아니라면 isFirstPage는 false이다.',
    ({ page }) => {
      mockUsePathname.mockImplementation(() => '/');
      mockUseParams.mockImplementation(() => ({
        page,
      }));

      const { result } = renderHook(() => usePagination(20));

      expect(result.current.isFirstPage).toBe(false);
    },
  );

  it.each([
    { pageQuantity: 3, page: '1' },
    { pageQuantity: 20, page: '2' },
    { pageQuantity: 30, page: '3' },
    { pageQuantity: 35, page: '4' },
  ])('현재 페이지가 마지막 페이지라면 isLastPage는 true이다.', ({ pageQuantity, page }) => {
    mockUsePathname.mockImplementation(() => '/');
    mockUseParams.mockImplementation(() => ({
      page,
    }));

    const { result } = renderHook(() => usePagination(pageQuantity));

    expect(result.current.isLastPage).toBe(true);
  });

  it.each([
    { pageQuantity: 11, page: '1' },
    { pageQuantity: 30, page: '2' },
    { pageQuantity: 50, page: '3' },
  ])('현재 페이지가 마지막 페이지가 아니라면 isLastPage는 false이다.', ({ pageQuantity, page }) => {
    mockUsePathname.mockImplementation(() => '/');
    mockUseParams.mockImplementation(() => ({
      page,
    }));

    const { result } = renderHook(() => usePagination(pageQuantity));

    expect(result.current.isLastPage).toBe(false);
  });
  it.each([
    { path: '', pageQuantity: 30 },
    { path: '1', pageQuantity: 60 },
  ])(
    '현재 페이지가 1이거나 메인페이지라면 increasePage를 호출시 2 페이지로 이동한다.',
    ({ path, pageQuantity }) => {
      mockUsePathname.mockImplementation(() => `/${path}`);
      mockUseParams.mockImplementation(() => path);

      const { result } = renderHook(() => usePagination(pageQuantity));

      act(() => result.current.increasePage());

      expect(pushMockFn).toHaveBeenCalledWith('/2');
    },
  );
  it.each([
    { path: '/category/1', pageQuantity: 30, page: '1', to: '/category/2' },
    { path: '/category/2', pageQuantity: 60, page: '3', to: '/category/4' },
  ])(
    '다음 페이지가 존재한다면 increasePage를 호출시 다음 페이지로 이동한다.',
    ({ path, pageQuantity, page, to }) => {
      mockUsePathname.mockImplementation(() => path);
      mockUseParams.mockImplementation(() => ({
        page,
      }));

      const { result } = renderHook(() => usePagination(pageQuantity));

      act(() => result.current.increasePage());

      expect(pushMockFn).toHaveBeenCalledWith(to);
    },
  );
  it.each([
    { path: '/2', pageQuantity: 30, page: '2', to: '/1' },
    { path: '/category/2', pageQuantity: 30, page: '2', to: '/category/1' },
    { path: '/category/4', pageQuantity: 60, page: '4', to: '/category/3' },
  ])(
    '첫번째 페이지가 아니라면 decreasePage를 호출시 이전 페이지로 이동한다.',
    ({ path, pageQuantity, page }) => {
      mockUsePathname.mockImplementation(() => path);
      mockUseParams.mockImplementation(() => ({
        page,
      }));

      const { result } = renderHook(() => usePagination(pageQuantity));

      act(() => result.current.decreasePage());

      expect(pushMockFn).toHaveBeenCalled();
    },
  );
  it.each([
    { path: '/category/1', pageQuantity: 30, page: '1' },
    { path: '/1', pageQuantity: 60, page: '1' },
  ])('첫번째 페이지라면 decreasePage를 호출시 이동하지 않는다.', ({ path, pageQuantity, page }) => {
    mockUsePathname.mockImplementation(() => path);
    mockUseParams.mockImplementation(() => ({
      page,
    }));

    const { result } = renderHook(() => usePagination(pageQuantity));

    act(() => result.current.decreasePage());

    expect(pushMockFn).not.toHaveBeenCalled();
  });

  it.each([
    { path: '/category/3', page: '3', current: 3, output: true },
    { path: '/1', page: '3', current: 3, output: true },
    { path: '/category/5', page: '3', current: 5, output: false },
    { path: '/2', page: '3', current: 2, output: false },
  ])('isCurrentPage 현재 페이지와 입력 페이지를 비교한다.', ({ path, page, current, output }) => {
    mockUsePathname.mockImplementation(() => path);
    mockUseParams.mockImplementation(() => ({
      page,
    }));

    const { result } = renderHook(() => usePagination(100));

    act(() => {
      expect(result.current.isCurrentPage(current)).toBe(output);
    });
  });
});
