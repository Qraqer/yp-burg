import useForm from '@/hooks/useForm';
import { useDispatch } from '@/services/store';
import { postForgotPassword } from '@/services/user/actions';
import { setForgotPassword } from '@/services/user/reducer';
import { ROUTES } from '@/utils/constants';
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ForgotPassword = (): React.JSX.Element => {
  const [value, onChange] = useForm({ email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotPassword = (e: React.FormEvent): void => {
    e.preventDefault();
    if (value.email === '') {
      setError('E-mail не может быть пустым!');
      return;
    }
    setError('');
    dispatch(postForgotPassword(value))
      .then((result) => {
        if (postForgotPassword.fulfilled.match(result)) {
          setSuccess(true);
          dispatch(setForgotPassword(true));
          navigate(ROUTES.login);
        } else {
          setError('Упс, что-то пошло не так!..');
        }
      })
      .catch((e) => console.log('Error in registration process: ', e));
  };

  return (
    <>
      <main className={`section-center main pl-5 pr-5`}>
        <form className={`form`} onSubmit={forgotPassword}>
          <h3>Восстановление пароля</h3>
          <EmailInput
            name={'email'}
            value={value.email}
            placeholder={'Укажите e-mail'}
            onChange={onChange}
          />
          {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
          {success && (
            <div style={{ color: 'blue' }}>
              <p>
                Инструкции по восстановлению пароля отправлены на {value.email}.
                <Link to={ROUTES.resetPassword} className={'link'}>
                  Перейти на страницу обновления пароля
                </Link>
              </p>
            </div>
          )}
          <Button htmlType="submit" type="primary" size="medium" disabled={!value.email}>
            Восстановить
          </Button>
        </form>
        <div className="form__links">
          <div className="form__link">
            <span>Вспомнили пароль?</span>
            <Link to={ROUTES.login} className={'link'}>
              Войти
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
