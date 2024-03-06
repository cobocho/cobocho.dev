'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

interface ModalValues {
  open: boolean;
  toggleModal: VoidFunction;
}

const ModalContext = createContext<ModalValues>({} as ModalValues);

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
  return useContext(ModalContext);
};
