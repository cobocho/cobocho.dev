import { render } from '@testing-library/react';

import { addExistedHeaderCount, getAllHeaderEls } from '../useTOC';

describe('getAllHeaderEls 테스트', () => {
  it('getAllHeaderEls는 h1 ~ h3를 수집한다.', () => {
    render(
      <div>
        <h1 />
        <h1 />
        <h1 />
        <h2 />
        <h2 />
        <h3 />
        <h4 />
      </div>,
    );

    const result = getAllHeaderEls();

    expect(result).toHaveLength(6);
  });
});

describe('addExistedHeaderCount 테스트', () => {
  it('addExistedHeaderCount는 중복된 header에 번호를 부여한다.', () => {
    render(
      <div>
        <h1 id="first">first</h1>
        <h2 id="first">first</h2>
        <h3 id="first">first</h3>
        <h3 id="first">first</h3>
        <h1 id="second">second</h1>
        <h1 id="second">second</h1>
      </div>,
    );
    const headers = getAllHeaderEls();
    addExistedHeaderCount(headers);

    const ids = ['first', 'first-1', 'first-2', 'first-3', 'second', 'second-1'];

    ids.forEach((id, i) => expect(headers[i].id).toBe(id));
  });
});
