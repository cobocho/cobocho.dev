import { render, within } from '@testing-library/react';

import CategoryTag from '../CategoryTag';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe('CategoryTag 테스트', () => {
  it('url에 카테고리 path parameter가 props의 category와 동일할 시 current 클래스를 가진다.', () => {
    mockUsePathname.mockImplementation(() => '/category/current/1');

    const { container } = render(<CategoryTag category="current" quantity={10} />);
    const button = within(container).getByRole('link');

    expect(button).toHaveClass('current');
  });

  it('url에 카테고리 path parameter가 props의 category와 동일하지 않을 시 current 클래스를 가지지 않는다.', () => {
    mockUsePathname.mockImplementation(() => '/category/other/1');
    const { container } = render(<CategoryTag category="current" quantity={10} />);
    const button = within(container).getByRole('link');

    expect(button).not.toHaveClass('current');
  });

  it('카테고리가 KOR_CATEGORY에 존재하면 한글로 변환한다.', () => {
    mockUsePathname.mockImplementation(() => '/category/typescript/1');

    const { container } = render(<CategoryTag category="typescript" quantity={10} />);
    const button = within(container).getByRole('link');

    expect(button).toHaveTextContent('타입스크립트');
  });

  it('카테고리가 KOR_CATEGORY에 존재하지 않으면 그대로 출력한다.', () => {
    mockUsePathname.mockImplementation(() => '/category/typescript/1');

    const { container } = render(<CategoryTag category="some" quantity={10} />);
    const button = within(container).getByRole('link');

    expect(button).toHaveTextContent('some');
  });

  it('카테고리를 클릭하면 해당 링크로 이동한다.', async () => {
    mockUsePathname.mockImplementation(() => '/category/typescript/1');

    const target = 'other';
    const { container } = render(<CategoryTag category={target} quantity={10} />);
    const button = within(container).getByRole('link');

    expect(button).toHaveAttribute('href', `/category/${target}/1`);
  });
});
