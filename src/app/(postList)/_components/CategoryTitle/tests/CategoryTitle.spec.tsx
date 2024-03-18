import { render, within } from '@testing-library/react';

import LAYOUT_VARIABLES from '@/styles/layout-variables';

import CategoryTitle from '../CategoryTitle';

describe('CategoryTitle 테스트', () => {
  it('CategoryTitle은 한글로 변환된다.', () => {
    const { container } = render(<CategoryTitle title="typescript" />);

    expect(container).toHaveTextContent('타입스크립트');
  });

  it('CategoryTitle은 category에 대한 설명을 띄운다.', () => {
    const { container } = render(<CategoryTitle title="typescript" />);

    expect(container).toHaveTextContent('타입스크립트 파헤치기');
  });

  it('데스크탑에서는 레이아웃 변경 버튼이 노출되지 않는다.', () => {
    window.innerWidth = LAYOUT_VARIABLES.breakPoint + 1;

    const { container } = render(<CategoryTitle title="typescript" />);

    const postViewButton = within(container).getByTestId('post-view');

    expect(postViewButton).toBeInTheDocument();
  });

  it('모바일에서는 레이아웃 변경 버튼이 노출되지 않는다.', () => {
    window.innerWidth = LAYOUT_VARIABLES.breakPoint - 100;

    const { container } = render(<CategoryTitle title="typescript" />);

    const postViewButton = within(container).queryByTestId('post-view');

    expect(postViewButton).not.toBeInTheDocument();
  });
});
