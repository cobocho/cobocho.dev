import { userEvent } from '@storybook/testing-library';
import { render, renderHook, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { act } from 'react-dom/test-utils';

import { useModal } from '@/hooks/useModal';
import { ModalContextProvider } from '@/hooks/useModal';

import Modal from '../Modal';

describe('Modal 테스트', () => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <ModalContextProvider>
      {children}
      <Modal>
        <div>modal child</div>
      </Modal>
      <div id="modal" />
    </ModalContextProvider>
  );

  it('모달이 open 상태가 아니라면 렌더링되지 않는다.', async () => {
    render(<Wrapper />);

    expect(screen.queryByText('modal child')).not.toBeInTheDocument();
  });

  it('모달이 open 상태라면 렌더링된다.', async () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: Wrapper,
    });

    act(() => result.current.toggleModal());

    expect(result.current.open).toBe(true);
    expect(screen.getByText('modal child')).toBeInTheDocument();
  });

  it('모달의 backdrop을 클릭하면 모달이 닫힌다.', async () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: Wrapper,
    });
    act(() => result.current.toggleModal());

    const user = userEvent.setup();
    const backdrop = document.getElementById('modal-backdrop') as HTMLDivElement;

    await user.click(backdrop);

    expect(screen.queryByText('modal child')).not.toBeInTheDocument();
    expect(result.current.open).toBe(false);
  });
});
