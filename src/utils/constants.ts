export const API = 'https://norma.nomoreparties.space/api';

export const API_POINTS = {
  ingredients: `${API}/ingredients`,
  orders: `${API}/orders`,
  forgotPassword: `${API}/password-reset`,
  resetPassword: `${API}/password-reset/reset`,
  register: `${API}/auth/register`,
  login: `${API}/auth/login`,
  logout: `${API}/auth/logout`,
  token: `${API}/auth/token`,
  profile: `${API}/auth/user`,
};

export const ROUTES = {
  index: '/',
  ingredients: '/ingredients/:id',
  ingredientsBase: '/ingredients/',
  login: '/login',
  profile: '/profile',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  feed: '/feed',
  error404: '*',
};

export const SKIPBACK = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
];
