import type { FC } from 'react';

import styles from './loader.module.scss';

type TLoaderProps = {
  text?: string;
};

export const Loader: FC<TLoaderProps> = ({
  text = 'Загружаем...',
}): React.JSX.Element => {
  return (
    <div className={styles.loader}>
      <p>{text}</p>
    </div>
  );
};
