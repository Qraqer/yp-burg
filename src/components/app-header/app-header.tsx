import { ROUTES } from '@/utils/constants';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NavItem } from './nav-item/nav-item';

import styles from './app-header.module.css';

export const AppHeader: FC = (): React.JSX.Element => {
  const location = useLocation();

  const isMain = useMemo(() => {
    return location.pathname === '/';
  }, [location]);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={`${styles.menu_part_left}`}>
          <NavItem to="/" icon={<BurgerIcon type="primary" />} text="Конструктор" />
          <NavItem to="/feed" icon={<ListIcon type="primary" />} text="Лента заказов" />
        </div>
        {isMain ? (
          <div className={styles.logo}>
            <Logo />
          </div>
        ) : (
          <Link to={ROUTES.index} className={styles.logo}>
            <Logo />
          </Link>
        )}
        <NavItem
          to="/profile"
          icon={<ProfileIcon type="secondary" />}
          text="Личный кабинет"
          className={`${styles.link_position_last}`}
        />
      </nav>
    </header>
  );
};
