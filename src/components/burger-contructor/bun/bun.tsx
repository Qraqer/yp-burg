import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';
import type { FC } from 'react';

import styles from './bun.module.css';

type TBunProps = {
  bun: TIngredient;
  type: 'top' | 'bottom' | undefined;
};

export const Bun: FC<TBunProps> = ({ bun, type }): React.JSX.Element => {
  const typeExplain = {
    top: 'верх',
    bottom: 'низ',
    other: '',
  };

  return (
    <div className={styles.component__fixed}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={type ? `${bun.name} (${typeExplain[type ?? 'other']})` : ''}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
};
