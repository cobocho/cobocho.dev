import { render, within } from '@testing-library/react';

import TOC from '../TOC';

describe('TOC 테스트', () => {
  it('TOC의 헤더를 클릭시 해당 섹션으로 이동한다.', async () => {
    const { container } = render(
      <div>
        <div>
          <h1 id="first">first</h1>
          <h2 id="second">second</h2>
          <h3 id="third">third</h3>
        </div>
        <TOC />
      </div>,
    );

    const headers = within(container).getAllByRole('link');

    expect(headers[0]).toHaveAttribute('href', '#first');
    expect(headers[1]).toHaveAttribute('href', '#second');
    expect(headers[2]).toHaveAttribute('href', '#third');
  });
});
