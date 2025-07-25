import { createOrder } from '@/services/burger-contructor/actions';
import { addBun, addIngredient, resetOrder } from '@/services/burger-contructor/reducer';
import { useDispatch, useSelector } from '@/services/store';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from '@reduxjs/toolkit';
import { useMemo, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

import { Modal } from '../modal/modal';
import { Bun } from './bun/bun';
import { Ingredient } from './ingredient/ingredient';
import { OrderDetails } from './order-details/order-details';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const { orderBun: bun, orderItems: ingredients } = useSelector((state) => state.order);
  const [orderModal, setOrderModal] = useState(false);
  const dispatch = useDispatch();
  const dropRef = useRef(null);

  const dropHandler = (item: TIngredient): void => {
    if (item.type === 'bun') {
      dispatch(addBun({ ...item, uuid: nanoid() }));
    } else {
      dispatch(addIngredient({ ...item, uuid: nanoid() }));
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: dropHandler,
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  drop(dropRef);

  const totalPrice = useMemo(() => {
    const total =
      bun || ingredients
        ? (bun ? bun.price * 2 : 0) + ingredients.reduce((acc, i) => acc + i.price, 0)
        : null;
    return total;
  }, [bun, ingredients]);

  const orderCreate = (): void => {
    dispatch(createOrder());
    setOrderModal(true);
  };

  const closeOrderModal = (): void => {
    dispatch(resetOrder());
    setOrderModal(false);
  };

  return (
    <section className={styles.burger__constructor} ref={dropRef}>
      <div
        ref={dropRef}
        className={`${styles.constructor__list} ${
          !bun && !ingredients.length && styles.components__list_empty
        } ${isOver && styles.components__list_hover}`}
      >
        {bun && <Bun bun={bun} type="top" />}
        <div className={styles.constructor__view_list}>
          <ul className={styles.components__list}>
            {ingredients.map((item, index) => (
              <Ingredient item={{ ...item, index }} key={item?.uuid} />
            ))}
          </ul>
        </div>
        {bun && <Bun bun={bun} type="bottom" />}
      </div>

      {totalPrice && totalPrice > 0 ? (
        <div className={styles.order}>
          <div className={styles.order__total}>
            <span className={`${styles.order__sum} text text_type_digits-medium`}>
              {totalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={orderCreate}>
            Оформить заказ
          </Button>
        </div>
      ) : (
        <></>
      )}

      {orderModal && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
