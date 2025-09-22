export const WS = 'wss://norma.nomoreparties.space';

export const API = `https://norma.nomoreparties.space/api`;

export const API_POINTS = {
  ingredients: `${API}/ingredients`,
  orders: `${API}/orders`,
  order: `${API}/orders/:id`,
  forgotPassword: `${API}/password-reset`,
  resetPassword: `${API}/password-reset/reset`,
  register: `${API}/auth/register`,
  login: `${API}/auth/login`,
  logout: `${API}/auth/logout`,
  token: `${API}/auth/token`,
  profile: `${API}/auth/user`,

  ordersAll: `${WS}/orders/all`,
  ordersUser: `${WS}/orders`,
};

export const ROUTES = {
  index: '/',
  ingredients: '/ingredients/:id',
  ingredientsBase: '/ingredients/',
  login: '/login',
  profileOrder: '/profile/orders/:id',
  profile: '/profile',
  profileOrders: 'orders',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  feedOrder: '/feed/:id',
  feed: '/feed',
  error404: '*',
};

export const SKIPBACK = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
];
