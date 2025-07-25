export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type IOrderIngredient = {
  uuid: string;
  index?: number;
} & TIngredient;

export type IResponseData = {
  success: boolean;
  data?: TIngredient[];
};

export type IResponse = {
  success: boolean;
  message?: string;
};

export type IIngredientsResponseData = {
  data: TIngredient[];
} & IResponse;

export type TIngredientsState = {
  ingredients: TIngredient[] | [];
  error: null | string;
  loading: boolean;
  ingredient: TIngredient;
};

export type IOrderState = {
  orderBun: IOrderIngredient | null;
  orderItems: IOrderIngredient[];
  orderId: number | null;
  orderLoading: boolean;
  orderError: string | null;
};

export type IOrderIdResponse = {
  name: string;
  order: {
    number: number;
  };
} & IResponse;
