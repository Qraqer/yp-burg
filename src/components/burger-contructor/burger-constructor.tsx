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

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [orderModal, setOrderModal] = useState(false);

  const bun: TIngredient = ingredients.filter((item) => item.type === 'bun').shift()!;
  const condiments: TIngredient[] = ingredients.filter((item) => item.type !== 'bun');

  return (
    <section className={styles.burger__constructor}>
      <div className={styles.constructor__list}>
        {!!bun && (
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
