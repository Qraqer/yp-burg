import orderBg from '@/images/order_btn_bg.png';
import { useSelector } from '@/services/store';

import type { FC } from 'react';

import styles from './order-details.module.css';

export const OrderDetails: FC = (): React.JSX.Element => {
  const { orderLoading, orderId, orderError } = useSelector((state) => state.order);

  return (
    <div className={styles.order__box}>
      <div className={`text text_type_digits-large mt-4 mb-8 ${styles.order__id}`}>
        {orderId}
      </div>
      {orderLoading ? (
        <p className="mt-15 mb-15">
          <span className="text text_type_main-medium">Отправляем заказ...</span>
        </p>
      ) : (
        <>
          <div className={`text text_type_main-medium ${styles.order__id_text}`}>
            идентификатор заказа
          </div>
          <div className={styles.order__success}>
            <img src={orderBg} alt="Заказ успешно оформлен - фон" />
          </div>
          <div className={`text text_type_main-default mb-2 ${styles.order__highlight}`}>
            Ваш заказ начали готовить
          </div>
          <div className={`text text_type_main-default mb-20 ${styles.order__text}`}>
            Дождитесь готовности на орбитальной станции
          </div>
        </>
      )}
      {orderError && (
        <p className="mt-15 mb-15">
          <span className="text text_type_main-medium">Ошибка создания заказа</span>
          <span className="text text_type_main-medium">{orderError}</span>
        </p>
      )}
    </div>
  );
};
