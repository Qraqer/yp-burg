import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <main className={`section-center main pl-5 pr-5`}>
        <form className={`form`}>
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
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!(email && password && name)}
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className="form__links">
          <div className="form__link">
            <span>Уже зарегистрированы?</span>
            <Link to={'/login'} className={'link'}>
              Войти
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
