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
};

export type IStateOrder = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
};

export type IOrderNumberResponse = {
  name: string;
  order: {
    number: number;
  };
} & IResponse;
