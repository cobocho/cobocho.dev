import { within } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event/setup/setup';

import { renderer } from '@/lib/jest-utils';

import TOC from '../TOC';

describe('Toolbox 테스트', () => {
  let container: HTMLElement;

  let user: UserEvent;

  beforeEach(async () => {
    const { user: createdUser, container: createdContainer } = await renderer(
      <>
        <div>
          <div style={{ height: '10000px' }}>
            <h1 id="first">first</h1>
            <h2 id="second">second</h2>
            <h3 id="third">third</h3>
          </div>
          <TOC />
        </div>
        ,
      </>,
    );

    container = createdContainer;
    user = createdUser;
  });

  it('copy 버튼을 클릭하면 현재 주소를 클립보드에 복사한다.', async () => {
    const copy = within(container).getByLabelText('copy');

    await user.click(copy);

    const copiedText = await window.navigator.clipboard.readText();
    expect(copiedText).toBe(window.location.href);
  });

  it('copy 버튼을 클릭하면 현재 주소를 클립보드에 복사한다.', async () => {
    const top = within(container).getByLabelText('to-the-top');

    await user.click(top);

    expect(window.screenY).toBe(0);
  });
});
