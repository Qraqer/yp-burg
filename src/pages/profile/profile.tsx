import { useDispatch } from '@/services/store';
import { postLogout } from '@/services/user/actions';
import { ROUTES } from '@/utils/constants';
import { useState } from 'react';
import { /* Link, */ NavLink, useNavigate } from 'react-router-dom';

import { ProfileEdit } from './profile-edit/profile-edit';

import type { FC } from 'react';

import styles from './profile.module.scss';

export const Profile: FC = (): React.JSX.Element => {
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (): void => {
    dispatch(postLogout())
      .then((result) => {
        if (postLogout.fulfilled.match(result)) {
          navigate(ROUTES.index);
        } else {
          setError('Упс, что-то пошло не так!..');
        }
      })
      .catch((e) => console.log('Error in login process: ', e));
  };

  return (
    <>
      <main className={`main pl-5 pr-5 ${styles.profile}`}>
        <div className={styles.profile__leftside}>
          <div className={styles.profile__menu}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles.profile__menu_link} text_type_main-medium ${isActive && styles.active}`
              }
            >
              Профиль
            </NavLink>
            <NavLink
              to="/profile/orders"
              className={({ isActive }) =>
                `${styles.profile__menu_link} text_type_main-medium ${isActive && styles.active}`
              }
            >
              История заказов
            </NavLink>
            <div
              className={`${styles.profile__menu_link} text_type_main-medium`}
              onClick={logout}
            >
              Выход
            </div>
            {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
          </div>
          <div className={styles.profile__lefttext}>
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
        <div className={styles.profile__main}>
          <ProfileEdit />
        </div>
      </main>
    </>
  );
};
