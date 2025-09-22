import { ProfileMenu } from '@/components/profile-menu/profile-menu';
import { Outlet } from 'react-router-dom';

import type { FC } from 'react';

import styles from './profile.module.scss';

export const Profile: FC = (): React.JSX.Element => {
  return (
    <div className={styles.profile}>
      <ProfileMenu />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
