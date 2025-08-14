import { useDispatch, useSelector } from '@/services/store';
import { getProfile } from '@/services/user/actions';
import { getUser } from '@/services/user/reducer';
import { SKIPBACK, ROUTES } from '@/utils/constants';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactElement } from 'react';
import type { Location } from 'react-router-dom';
// import { Nav } from '../nav/nav';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TProtectedProps): React.JSX.Element => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const location = useLocation();
  location.state = (location.state as Record<string, Location>) ?? {};

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // console.log('user', user);
  // console.log('location', location);

  if (SKIPBACK.includes(location.pathname)) {
    (location.state as Record<string, Location>).last = location;
  }

  if (!onlyUnAuth && !user) {
    // console.log('userMustBeAuthorized && !user', onlyUnAuth, user);
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

  if (onlyUnAuth && user) {
    // console.log('!userMustBeAuthorized && user', onlyUnAuth, user);
    const { from } = (location.state as Record<string, Location>).from
      ? (location.state as Record<string, Location>)
      : { from: { pathname: ROUTES.index } };
    // console.log('from', from.pathname, component);
    return <Navigate to={from.pathname} replace />;
    // return <Nav pathname={from.pathname} />;
  }

  // console.log('return component', location, onlyUnAuth, user, component);
  return component;
};

type TUserNotAuthorizedProps = {
  component: ReactElement;
};

export const OnlyAuthorized = Protected;
export const OnlyGuest = ({ component }: TUserNotAuthorizedProps): ReactElement => (
  <Protected onlyUnAuth={true} component={component} />
);
