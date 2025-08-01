import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './profile-edit.module.scss';

export const ProfileEdit = (): React.JSX.Element => {
  const [name, setName] = useState('Вася Пупкин');
  const [email, setEmail] = useState('pupkin@mail.ru');
  const [password, setPassword] = useState('some_password');

  return (
    <form className={styles.profile__form}>
      <Input
        name={'name'}
        value={name}
        placeholder={'Имя'}
        onChange={(e) => setName(e.target.value)}
        icon="EditIcon"
      />
      <EmailInput
        name={'email'}
        value={email}
        placeholder={'E-mail'}
        onChange={(e) => setEmail(e.target.value)}
        isIcon={true}
      />
      <PasswordInput
        name={'password'}
        value={password}
        placeholder={'Пароль'}
        onChange={(e) => setPassword(e.target.value)}
        icon="EditIcon"
      />
    </form>
  );
};
