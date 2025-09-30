import { checkAuth, postLogin, postLogout } from '@/services/user/actions';
import { initialState, userSlice } from '@/services/user/reducer';
import { describe, expect, it } from 'vitest';

const userMock = {
  name: 'User',
  email: 'user@mail.ru',
};

describe('Тестирование слайса userSlice', () => {
  it('Неизвестный action: возвращает начальное значение для userSlice', () => {
    expect(
      userSlice.reducer(undefined, {
        type: 'unknown',
      })
    ).toEqual(initialState);
  });

  it('Устанавливаем статус проверки авторизации', () => {
    expect(
      userSlice.reducer(undefined, {
        type: 'user/setAuth',
        payload: true,
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('Сохраняем пользователя', () => {
    expect(
      userSlice.reducer(undefined, {
        type: 'user/setUser',
        payload: userMock,
      })
    ).toEqual({
      ...initialState,
      user: userMock,
      isAuthChecked: true,
    });
  });

  it('Устанавливаем статус забытого пароля', () => {
    expect(
      userSlice.reducer(undefined, {
        type: 'user/setForgotPassword',
        payload: true,
      })
    ).toEqual({
      ...initialState,
      forgotPassword: true,
    });
  });

  it('Проверяем процедуру логина', () => {
    const action = {
      type: postLogin.fulfilled.type,
      payload: userMock,
    };
    expect(userSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: userMock,
    });
  });

  it('Проверяем, что пользователь отлогинился', () => {
    const action = {
      type: postLogout.fulfilled.type,
    };
    expect(userSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      user: null,
    });
  });

  it('Первичная проверка авторизации пройдена', () => {
    const action = {
      type: checkAuth.fulfilled.type,
    };
    expect(userSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });
});
