import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import type { TOrder } from '@/utils/types';
import type { FC } from 'react';

import styles from './order-card.module.scss';

type TOrderCardProps = {
  order: TOrder;
  showStatus?: boolean;
  onClick?: () => void;
};

export const OrderCard: FC<TOrderCardProps> = ({
  order,
  showStatus = true,
  onClick,
}): React.JSX.Element => {
  return (
    <>
      <div className={styles.card} onClick={onClick}>
        <div className={styles.title}>
          <div className={styles.number}>#{order.number}</div>
          <FormattedDate className={styles.date} date={new Date(order.createdAt)} />
        </div>
        <div className={styles.body}>
          <div className={styles.name}>{order.name}</div>
          {showStatus && <div className={styles.status}>{order.status}</div>}
        </div>
        <div className={styles.footer}></div>
      </div>
    </>
  );
};
