import orderBg from '@/images/order_btn_bg.png';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  return (
    <div className={styles.order__box}>
      <div className={`text text_type_digits-large mt-4 mb-8 ${styles.order__id}`}>
        034536
      </div>
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
    </div>
  );
};
