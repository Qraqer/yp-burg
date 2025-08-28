import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import type { FC } from 'react';

import styles from './app-layout.module.css';

export const AppLayout: FC = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};
