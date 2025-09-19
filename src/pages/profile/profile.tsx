import { ProfileEdit } from './profile-edit/profile-edit';
import { ProfileMenu } from './profile-menu/profile-menu';

import type { FC } from 'react';

import styles from './profile.module.scss';

export const Profile: FC = (): React.JSX.Element => {
  return (
    <main className={`main pl-5 pr-5 ${styles.profile}`}>
      <ProfileMenu />
      <div className={styles.profile__main}>
        <ProfileEdit />
      </div>
    </main>
  );
};
