import { useDispatch, useSelector } from '@/services/store';
import { postUpdatePassword } from '@/services/user/actions';
import { getForgotPassword } from '@/services/user/reducer';
import { ROUTES } from '@/utils/constants';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ResetPassword = (): React.JSX.Element => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isForgotPassPageVisited = useSelector(getForgotPassword);

  const resetPassword = (e: React.FormEvent): void => {
    e.preventDefault();
    if (code === '' || password === '') {
      setError('Проверьте правильность заполнения полей');
      return;
    } else {
      setError('');
    }
    dispatch(postUpdatePassword({ password, code }))
      .then((result) => {
        if (postUpdatePassword.fulfilled.match(result)) {
          setSuccess(true);
        } else {
          setError('Упс, что-то пошло не так!..');
        }
      })
      .catch((e) => console.log('Error in registration process: ', e));
  };

  useEffect(() => {
    if (!isForgotPassPageVisited) {
      navigate(ROUTES.forgotPassword);
    }
  }, [isForgotPassPageVisited, navigate]);

  return (
    <>
      <main className={`section-center main pl-5 pr-5`}>
        <form className={`form`} onSubmit={resetPassword}>
          <h3>Восстановление пароля</h3>
          <PasswordInput
            name={'password'}
            value={password}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name={'name'}
            value={code}
            placeholder={'Код из письма'}
            onChange={(e) => setCode(e.target.value)}
          />
          {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
          {success && (
            <div className="form__link">
              <span>Пароль обновлён.</span>
              <Link to={ROUTES.login} className={'link'}>
                Войти
              </Link>
            </div>
          )}
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!code && !password}
          >
            Сохранить
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
