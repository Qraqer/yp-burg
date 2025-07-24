import { removeIngredient } from '@/services/burger-contructor/reducer';
import { useDispatch } from '@/services/store';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import type { IOrderIngredient } from '@/utils/types';

import styles from './ingredient.module.css';

type TOrderIngredient = {
  item: IOrderIngredient;
};

export const Ingredient = ({ item }: TOrderIngredient): React.JSX.Element => {
  const dispatch = useDispatch();

  const removeHandler = (uuid: string): void => {
    dispatch(removeIngredient(uuid));
  };

  return (
    <li className={styles.component} key={item._id}>
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
