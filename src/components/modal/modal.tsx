import ReactModal from 'react-modal';
import { ReactNode } from 'react';
import CloseIcon from '../../assets/close.svg?react';

export type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onCloseModal: () => void;
};

const customStyles = {
  overlay: {
    background: 'rgba(0,0,0,0.5)',
    zIndex: '99999',
    border: '2px solid ',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    border: '0',
    background: 'rgb(29, 41, 57)',
    padding: '1rem',
    borderRadius: '16px',
    inset: '50% auto auto 50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
  },
};

ReactModal.setAppElement('#root');

export function Modal({ isOpen, onCloseModal, title, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCloseModal}
    >
      <div>
        <div className='flex flex-col'>
          <button
            type='button'
            className='react-modal-close rounded-full bg-gray-600 p-2 ml-auto'
            onClick={onCloseModal}
          >
            <CloseIcon className='h-4 fill-gray-25' />
          </button>
          <h2 className='text-gray-25 text-center'>{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </ReactModal>
  );
}
