import { removeIngredient, sortOrderItems } from '@/services/burger-contructor/reducer';
import { useDispatch } from '@/services/store';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TOrderIngredient } from '@/utils/types';

import styles from './ingredient.module.css';

type TOrderIngredientProps = {
  item: TOrderIngredient;
};

export const Ingredient = ({ item }: TOrderIngredientProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const { index } = item;
  const dragRef = useRef(null);

  const removeHandler = (uuid: string): void => {
    dispatch(removeIngredient(uuid));
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'orderItem',
    item: { index },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const [, drop] = useDrop({
    accept: 'orderItem',
    hover: (item: { index: number }) => {
      const itemIndex = item.index;
      const nextIndex = index;
      if (itemIndex === nextIndex || nextIndex === undefined) {
        return;
      }
      dispatch(sortOrderItems({ itemIndex, nextIndex }));
      item.index = nextIndex;
    },
  });

  drag(drop(dragRef));

  return (
    <li
      className={`${styles.component} ${isDragging && styles.component__dragging}`}
      key={item._id}
      ref={dragRef}
    >
      <div className={styles.drag__icon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => removeHandler(item.uuid)}
      />
    </li>
  );
};
