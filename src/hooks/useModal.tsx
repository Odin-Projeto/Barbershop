import { useState } from 'react';
import { Modal, ModalProps } from '../components/modal/modal';

export function useModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = (): void => setModalIsOpen(true);
  const handleCloseModal = (): void => setModalIsOpen(false);

  return {
    handleOpenModal,
    handleCloseModal,
    Modal: ({ children, title }: Pick<ModalProps, 'children' | 'title'>) => (
      <Modal isOpen={modalIsOpen} onCloseModal={handleCloseModal} title={title}>
        {children}
      </Modal>
    ),
  };
}
