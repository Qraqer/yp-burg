import { useDispatch, useSelector } from '@/services/store';
import { getProfile } from '@/services/user/actions';
import { getUser, setUser } from '@/services/user/reducer';
import { SKIPBACK, ROUTES } from '@/utils/constants';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import type { IUser } from '@/utils/types';
import type { ReactElement } from 'react';
import type { Location } from 'react-router-dom';

type TProtectedProps = {
  userIsAuthorized?: boolean;
  component: ReactElement;
};

const Protected = ({
  userIsAuthorized = true,
  component,
}: TProtectedProps): React.JSX.Element => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const location = useLocation();
  location.state = (location.state as Record<string, Location>) ?? {};

  useEffect(() => {
    // console.log('useEffect user', user);
    dispatch(getProfile())
      .then((result) => {
        if (result.payload) {
          dispatch(setUser(result.payload as IUser));
        }
      })
      .catch((e) => console.log('protected error:', e));
  }, [dispatch]);

  // console.log('user', user);
  // console.log('location', location);

  if (SKIPBACK.includes(location.pathname)) {
    (location.state as Record<string, Location>).last = location;
  }

  if (userIsAuthorized && !user) {
    return location.pathname === ROUTES.login ? (
      component
    ) : (
      <Navigate
        to={ROUTES.login}
        state={{
          from: (location.state as Record<string, Location>).last ?? location,
        }}
      />
    );
  }

  if (!userIsAuthorized && user) {
    const { from } = (location.state as Record<string, Location>).from
      ? (location.state as Record<string, Location>)
      : { from: { pathname: ROUTES.index } };
    // console.log('from', from);
    return <Navigate to={from} />;
  }

  return component;
};

type TUserNotAuthorizedProps = {
  component: ReactElement;
};

export const UserIsAuthorized = Protected;
export const UserNotAuthorized = ({
  component,
}: TUserNotAuthorizedProps): ReactElement => (
  <Protected userIsAuthorized={false} component={component} />
);
