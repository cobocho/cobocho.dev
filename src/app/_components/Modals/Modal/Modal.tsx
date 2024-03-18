'use client';

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useModal } from '@/hooks/useModal';

import AppearBottom from '../../Motion/AppearBottom';
import { modalBackdrop, modalContainer, modalHeader } from './Modal.css';

const Modal = ({ children }: PropsWithChildren) => {
  const { open, toggleModal } = useModal();

  if (!open) return null;

  const modalPortal = document.querySelector('#modal') as HTMLDivElement;

  const clickBackdrop = () => {
    toggleModal();
  };

  return createPortal(
    <div id="modal-backdrop" className={modalBackdrop} onClick={clickBackdrop}>
      <AppearBottom className={modalContainer} onClick={(e) => e.stopPropagation()}>
        {children}
      </AppearBottom>
    </div>,
    modalPortal,
  );
};

const ModalHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className={modalHeader}>
      <span>{children}</span>
    </div>
  );
};

export default Object.assign(Modal, {
  Header: ModalHeader,
});
