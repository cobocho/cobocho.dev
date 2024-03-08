import { render, screen } from '@testing-library/react';

import Footer from '../Footer';

describe('Footer 테스트', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Footer의 copyright는 현재 연도를 기반으로 출력된다.', () => {
    render(<Footer />);
    const footerMessage = screen.getByText('2020', { exact: false });

    expect(footerMessage).toBeInTheDocument();
  });
});
