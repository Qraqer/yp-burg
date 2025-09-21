import { useDispatch, useSelector } from '@/services/store';
import { patchProfile } from '@/services/user/actions';
import { getUser } from '@/services/user/reducer';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import type { FC } from 'react';

import styles from './profile-edit.module.scss';

export const ProfileEdit: FC = (): React.JSX.Element => {
  const user = useSelector(getUser);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [valuesChanged, setValuesChanged] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.name && user.name !== '') setName(user.name);
    if (user?.email && user.email !== '') setEmail(user.email);
  }, [user]);

  const formReset = (e: React.FormEvent): void => {
    e.preventDefault();
    if (user?.name && user.name !== '') setName(user.name);
    if (user?.email && user.email !== '') setEmail(user.email);
    setPassword('');
  };

  const formSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (name === '' || email === '') {
      setError('Проверьте правильность заполнения полей');
      return;
    } else {
      setError('');
    }
    dispatch(patchProfile({ name, email, password }))
      .then((result) => {
        if (patchProfile.fulfilled.match(result)) {
          setValuesChanged(false);
        } else {
          setError('Упс, что-то пошло не так!..');
        }
      })
      .catch((e) => console.log('Error in login process: ', e));
  };

  return (
    <form className={styles.profile__form}>
      <Input
        name={'name'}
        value={name}
        placeholder={'Имя'}
        onChange={(e) => {
          setValuesChanged(true);
          setName(e.target.value);
        }}
        icon="EditIcon"
        autoComplete="name"
      />
      <EmailInput
        name={'email'}
        value={email}
        placeholder={'E-mail'}
        onChange={(e) => {
          setValuesChanged(true);
          setEmail(e.target.value);
        }}
        isIcon={true}
        autoComplete="email"
      />
      <PasswordInput
        name={'password'}
        value={password}
        placeholder={'Пароль'}
        onChange={(e) => {
          setValuesChanged(true);
          setPassword(e.target.value);
        }}
        icon="EditIcon"
        autoComplete="current-password"
      />
      {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
      {valuesChanged && (
        <section className={`${styles.profile__buttons} input_size_default`}>
          <Button htmlType="reset" type="secondary" size="medium" onClick={formReset}>
            Отменить
          </Button>
          <Button htmlType="submit" type="primary" size="medium" onClick={formSubmit}>
            Сохранить
          </Button>
        </section>
      )}
    </form>
  );
};
