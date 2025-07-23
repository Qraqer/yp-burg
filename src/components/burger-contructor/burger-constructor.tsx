import { loadIngredients } from '@/services/burger-ingredients/reducer';
import { useSelector } from '@/services/store';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '../modal/modal';
import { OrderDetails } from './order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const { ingredients } = useSelector(loadIngredients);
  const [orderModal, setOrderModal] = useState(false);

  // const bun: TIngredient | null = null;
  const condiments: TIngredient[] = ingredients.filter((item) => item.type !== 'bun');

  /*
        {bun && (
          <div className={styles.component__fixed}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        {!!bun && (
          <div className={styles.component__fixed}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
  */
  return (
    <section className={styles.burger__constructor}>
      <div className={styles.constructor__list}>
        <div className={styles.constructor__view_list}>
          <ul className={styles.components__list}>
            {condiments.map((item) => (
              <li className={styles.component} key={item?._id}>
                <div className={styles.drag__icon}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  text={item?.name}
                  price={item?.price}
                  thumbnail={item?.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.order}>
        <div className={styles.order__total}>
          <span className={`${styles.order__sum} text text_type_digits-medium`}>
            610
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setOrderModal(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {orderModal && (
        <Modal onClose={() => setOrderModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
