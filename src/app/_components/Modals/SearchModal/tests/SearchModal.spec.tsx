import { userEvent } from '@storybook/testing-library';
import { screen } from '@testing-library/react';

import { modalOpenTrigger } from '../../Modal/tests/Modal.spec';
import { posts } from '../mocks/posts';
import SearchForm from '../SearchForm';
import SearchModal from '../SearchModal';

describe('SearchModal 테스트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('검색 입력 창에는 200ms의 디바운스가 적용된다.', async () => {
    const queryFn = jest.fn();
    modalOpenTrigger(<SearchForm setQuery={queryFn} />);
    const searchInput = screen.getByPlaceholderText('검색할 제목을 입력해주세요');
    const user = userEvent.setup({ delay: null });

    await user.type(searchInput, 'typing');

    expect(queryFn).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(200);

    expect(queryFn).toHaveBeenCalledTimes(1);
  });
  it('검색 결과가 없으면 "undefined!"가 출력된다.', async () => {
    modalOpenTrigger(<SearchModal posts={posts} />);
    const searchInput = screen.getByPlaceholderText('검색할 제목을 입력해주세요');
    const user = userEvent.setup({ delay: null });

    await user.type(searchInput, 'fake!');

    expect(await screen.findByText('undefined!')).toBeInTheDocument();
  });

  it('검색 결과의 따른 결과가 출력된다.', async () => {
    modalOpenTrigger(<SearchModal posts={posts} />);
    const searchInput = screen.getByPlaceholderText('검색할 제목을 입력해주세요');

    expect(searchInput).toBeInTheDocument();

    const user = userEvent.setup({ delay: null });
    await user.type(searchInput, 'title');

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);
  });
});
