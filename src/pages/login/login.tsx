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

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const formSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Проверьте правильность заполнения полей');
      return;
    } else {
      setError('');
    }
    dispatch(postLogin({ email, password }))
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
            value={email}
            placeholder={'E-mail'}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <PasswordInput
            name={'password'}
            value={password}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!(email && password)}
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
