import useForm from '@/hooks/useForm';
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
  const [value, onChange] = useForm({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (value.name === '' || value.email === '' || value.password === '') {
      setError('Проверьте правильность заполнения полей');
      return;
    }
    setError('');
    dispatch(postRegistration(value))
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
            value={value.name}
            placeholder={'Имя'}
            onChange={onChange}
          />
          <EmailInput
            name={'email'}
            value={value.email}
            placeholder={'E-mail'}
            onChange={onChange}
          />
          <PasswordInput
            name={'password'}
            value={value.password}
            placeholder={'Пароль'}
            onChange={onChange}
          />
          {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!(value.email && value.password && value.name) && error !== ''}
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
