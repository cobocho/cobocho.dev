import '@testing-library/jest-dom';

import { screen, within } from '@testing-library/react';
import React from 'react';

import { renderer } from '../../../../lib/test-utils';
import Header from '../Header';

describe('Header 테스트', () => {
  it('다크모드 토글 버튼을 렌더링한다.', async () => {
    await renderer(<Header posts={[]} />);
    const darkmodeButton = screen.getByTestId('dark-mode');

    expect(darkmodeButton).toBeInTheDocument();
  });

  it('다크모드 토글 버튼을 클릭시 다크 모드가 변경된다.', async () => {
    const { user } = await renderer(<Header posts={[]} />);
    const darkmodeButton = screen.getByTestId('dark-mode');

    expect(darkmodeButton).toHaveValue('light');

    await user.click(darkmodeButton);

    expect(darkmodeButton).toHaveValue('dark');
  });

  it('검색 버튼을 클릭시 검색 모달이 열린다.', async () => {
    const { user } = await renderer(<Header posts={[]} />);
    const searchButton = screen.getByTestId('search');

    await user.click(searchButton);

    const searchModal = within(document.getElementById('modal') as HTMLDivElement).getByText(
      '검색',
    );

    expect(searchModal).toBeInTheDocument();
  });
});
