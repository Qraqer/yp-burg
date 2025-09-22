import { useSelector } from '@/services/store';

import type { TOrder } from '@/utils/types';
import type { FC } from 'react';

type TOrderPriceProps = {
  order: TOrder;
};

export const OrderPrice: FC<TOrderPriceProps> = ({ order }): React.JSX.Element => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const price = order?.ingredients.reduce(
    (acc, id) => acc + (ingredients.find((item) => item._id === id)?.price ?? 0),
    0
  );

  return <div className="text text_type_digits-default mr-2">{price}</div>;
};
