import { useEscape } from '@/hooks/useEscape';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';

import { ModalOverlay } from './modal-overlay/modal-overlay';

import type { FC } from 'react';

import styles from './modal.module.css';

type IModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

export const Modal: FC<IModalProps> = ({
  children,
  onClose,
  title = '',
}): React.JSX.Element => {
  const modal = document.getElementById('modal')!;

  useEscape(onClose);

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal__panel}>
        <div className={styles.modal__header}>
          <h3 className="text text_type_main-large">{title}</h3>
          <button className={styles.modal__close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.modal__body}>{children}</div>
      </div>
    </div>,
    modal
  );
};
