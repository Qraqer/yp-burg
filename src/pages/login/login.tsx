import useForm from '@/hooks/useForm';
import { useDispatch } from '@/services/store';
import { postLogin } from '@/services/user/actions';
import { ROUTES } from '@/utils/constants';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { IUserAuth } from '@/utils/types';
import type { FC } from 'react';

export const Login: FC = (): React.JSX.Element => {
  const [value, onChange] = useForm<IUserAuth>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const formSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (value.email === '' || value.password === '') {
      setError('Проверьте правильность заполнения полей');
      return;
    }
    setError('');
    dispatch(postLogin(value))
      .then((result) => {
        if (!postLogin.fulfilled.match(result)) {
          setError('Упс, что-то пошло не так!..');
          console.log('Error while login: ', result);
        }
      })
      .catch((e) => console.log('Error in login process: ', e));
  };

  return (
    <>
      <main className={`section-center main pl-5 pr-5`}>
        <form className={`form`} onSubmit={formSubmit}>
          <h3>Вход</h3>
          <EmailInput
            name={'email'}
            value={value.email}
            placeholder={'E-mail'}
            onChange={onChange}
            autoComplete="email"
            data-testid="email_data_test"
          />
          <PasswordInput
            name={'password'}
            value={value.password}
            placeholder={'Пароль'}
            onChange={onChange}
            autoComplete="current-password"
            data-testid="password_data_test"
          />
          {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!(value.email && value.password)}
            data-testid="submit_button"
          >
            Войти
          </Button>
        </form>
        <div className="form__links">
          <div className="form__link">
            <span>Вы — новый пользователь?</span>
            <Link to={ROUTES.register} className={'link'}>
              Зарегистрироваться
            </Link>
          </div>
          <div className="form__link">
            <span>Забыли пароль?</span>
            <Link to={ROUTES.forgotPassword} className={'link'}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
