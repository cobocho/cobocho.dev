'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

interface ModalValues {
  open: boolean;
  toggleModal: VoidFunction;
}

const ModalContext = createContext<ModalValues | undefined>(undefined);

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    document.body.classList.toggle('scroll-locked');

    setOpen((prev) => !prev);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        open,
        toggleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal 커스텀 훅은 ModalContextProvider 내부에서 호출해야합니다.');
  }

  return context;
};
