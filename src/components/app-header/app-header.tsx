import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';

import { NavItem } from './nav-item/nav-item';

import type { FC } from 'react';

import styles from './app-header.module.css';

export const AppHeader: FC = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={`${styles.menu_part_left}`}>
          <NavItem to="/" icon={<BurgerIcon type="primary" />} text="Конструктор" />
          <NavItem to="/feed" icon={<ListIcon type="primary" />} text="Лента заказов" />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
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
