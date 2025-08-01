import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');

  return (
    <>
      <main className={`section-center main pl-5 pr-5`}>
        <form className={`form`}>
          <h3>Восстановление пароля</h3>
          <EmailInput
            name={'email'}
            value={email}
            placeholder={'Укажите e-mail'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button htmlType="submit" type="primary" size="medium" disabled={!email}>
            Восстановить
          </Button>
        </form>
        <div className="form__links">
          <div className="form__link">
            <span>Вспомнили пароль?</span>
            <Link to={'/login'} className={'link'}>
              Войти
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
