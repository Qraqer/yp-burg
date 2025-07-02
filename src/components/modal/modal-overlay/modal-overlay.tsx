import styles from './modal-overlay.module.css';

type IModalOverlayProps = {
  onClick: () => void;
};

export const ModalOverlay = ({ onClick }: IModalOverlayProps): React.JSX.Element => {
  return <div className={styles.modal__overlay} onClick={onClick}></div>;
};
