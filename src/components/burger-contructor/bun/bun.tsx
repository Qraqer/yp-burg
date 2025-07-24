import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './bun.module.css';

type TBunProps = {
  bun: TIngredient;
  type: 'top' | 'bottom' | undefined;
};

export const Bun = ({ bun, type }: TBunProps): React.JSX.Element => {
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
