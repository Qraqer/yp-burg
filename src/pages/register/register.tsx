import { useDispatch, useSelector } from '@/services/store';
import { postRegistration } from '@/services/user/actions';
import { getUser, setAuth } from '@/services/user/reducer';
import { ROUTES } from '@/utils/constants';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError('Проверьте правильность заполнения полей');
      return;
    } else {
      setError('');
    }
    dispatch(postRegistration({ name, email, password }))
      .then((result) => {
        if (postRegistration.fulfilled.match(result)) {
          navigate(ROUTES.index);
        } else {
          setError('Упс, что-то пошло не так!..');
        }
      })
      .catch((e) => console.log('Error in registration process: ', e));
  };

  useEffect(() => {
    if (user) {
      dispatch(setAuth(true));
      navigate(ROUTES.index);
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      <main className={`section-center main pl-5 pr-5`}>
        <form className={`form`} onSubmit={formSubmit}>
          <h3>Регистрация</h3>
          <Input
            name={'name'}
            value={name}
            placeholder={'Имя'}
            onChange={(e) => setName(e.target.value)}
          />
          <EmailInput
            name={'email'}
            value={email}
            placeholder={'E-mail'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            name={'password'}
            value={password}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!(email && password && name) && error !== ''}
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className="form__links">
          <div className="form__link">
            <span>Уже зарегистрированы?</span>
            <Link to={ROUTES.login} className={'link'}>
              Войти
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
