import { useDispatch } from '@/services/store';
import { postLogout } from '@/services/user/actions';
import { ROUTES } from '@/utils/constants';
import { useState, type FC } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import styles from './profile-menu.module.scss';

export const ProfileMenu: FC = (): React.JSX.Element => {
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const checkIsActive = (link: string): boolean => {
    return location.pathname === link;
  };

  return (
    <div className={styles.leftside}>
      <div className={styles.menu}>
        <NavLink
          to={ROUTES.profile}
          className={`${styles.menu_link} text_type_main-medium ${checkIsActive(ROUTES.profile) && styles.active}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to={ROUTES.profileOrders}
          className={`${styles.menu_link} text_type_main-medium ${checkIsActive(ROUTES.profileOrders) && styles.active}`}
        >
          История заказов
        </NavLink>
        <div className={`${styles.menu_link} text_type_main-medium`} onClick={logout}>
          Выход
        </div>
        {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <div className={styles.lefttext}>
        В этом разделе вы можете изменить свои персональные данные
      </div>
    </div>
  );
};
