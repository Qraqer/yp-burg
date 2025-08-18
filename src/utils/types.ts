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

export type TOrderIngredient = {
  uuid: string;
  index?: number;
} & TIngredient;

export type TResponseData = {
  success: boolean;
  data?: TIngredient[];
};

export type TResponse = {
  success: boolean;
  message?: string;
};

export type TIngredientsResponseData = {
  data: TIngredient[];
} & TResponse;

export type TIngredientsState = {
  ingredients: TIngredient[] | [];
  error: null | string;
  loading: boolean;
  ingredient: TIngredient;
  showModal: boolean;
};

export type TOrderState = {
  orderBun: TOrderIngredient | null;
  orderItems: TOrderIngredient[];
  orderId: number | null;
  orderLoading: boolean;
  orderError: string | null;
};

export type TOrderIdResponse = {
  name: string;
  order: {
    number: number;
  };
} & TResponse;

export type TLocation = {
  state: Record<string, Location>;
};

export type IEmail = {
  email: string;
};

export type IUserAuth = {
  password: string;
} & IEmail;

export type IUser = {
  name: string;
} & IEmail;

export type IUserState = {
  user: IUser | null;
  isAuthChecked: boolean;
  forgotPassword?: boolean;
};

export type IUserReg = {
  password: string;
} & IUser;

export type IUserData = {
  success: boolean;
  user: IUser;
};

export type IPasswordUpdate = {
  password: string;
  code: string;
};

export type IUserPatch = {
  name: string;
  email: string;
  password?: string;
};

export type ITokenUpdate = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export type IRegistration = {
  user?: IUser;
} & ITokenUpdate;
