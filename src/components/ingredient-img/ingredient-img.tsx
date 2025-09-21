import type { FC } from 'react';

import styles from './ingredient-img.module.scss';

type TIngredientImgProps = {
  src: string;
  alt?: string;
  styleClass?: string;
  style?: Record<string, string | number>;
  children?: React.JSX.Element;
};

export const IngredientImg: FC<TIngredientImgProps> = ({
  src = '',
  alt = '',
  styleClass = '',
  style = {},
  children = <></>,
}): React.JSX.Element => {
  return (
    <div className={styles.box} style={style}>
      {src !== '' && (
        <img src={src} className={[styles.img, styleClass].join(' ')} alt={alt} />
      )}
      {children}
    </div>
  );
};
