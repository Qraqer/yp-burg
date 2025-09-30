import type { FC } from 'react';

import styles from './modal-overlay.module.css';

type IModalOverlayProps = {
  onClick: () => void;
};

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }): React.JSX.Element => {
  return (
    <div
      className={styles.modal__overlay}
      onClick={onClick}
      data-testid="modal_overlay"
    ></div>
  );
};
