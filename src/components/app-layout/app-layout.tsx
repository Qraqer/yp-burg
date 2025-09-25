import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import type { FC } from 'react';

import styles from './app-layout.module.css';

export const AppLayout: FC = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`main pl-5 pr-5 ${styles.main}`}>
        <Outlet />
      </main>
    </div>
  );
};
