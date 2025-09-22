import { useSelector } from '@/services/store';
import { getAuth, getUser } from '@/services/user/reducer';
import { ROUTES } from '@/utils/constants';
import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '../loader/loader';

import type { FC } from 'react';
import type { Location } from 'react-router-dom';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export const Protected: FC<TProtectedProps> = ({
  onlyUnAuth = false,
  children,
}): React.JSX.Element => {
  const isAuthChecked = useSelector(getAuth);
  const user = useSelector(getUser);
  const location = useLocation();

  location.state = location.state as Record<string, Location>;

  if (!isAuthChecked) {
    return <Loader text="Загружаем..." />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.login} state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = (location.state as Record<string, Location>).from
      ? (location.state as Record<string, Location>)
      : { from: { pathname: ROUTES.index } };
    return <Navigate to={from?.pathname} />;
  }

  return <>{children}</>;
};
