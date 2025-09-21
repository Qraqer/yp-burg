import { ProfileMenu } from '@/components/profile-menu/profile-menu';

import { ProfileEdit } from './profile-edit/profile-edit';

import type { FC } from 'react';

import styles from './profile.module.scss';

export const Profile: FC = (): React.JSX.Element => {
  return (
    <div className={styles.profile}>
      <ProfileMenu />
      <div className={styles.profile__main}>
        <ProfileEdit />
      </div>
    </div>
  );
};
