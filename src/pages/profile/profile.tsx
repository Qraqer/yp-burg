import { Link, NavLink } from 'react-router-dom';

import { ProfileEdit } from './profile-edit/profile-edit';

import styles from './profile.module.scss';

export const Profile = (): React.JSX.Element => {
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
            <Link
              className={`${styles.profile__menu_link} text_type_main-medium`}
              to={'/login'}
            >
              Выход
            </Link>
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
