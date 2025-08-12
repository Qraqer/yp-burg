import { Error404 } from '@/pages/error404/error404';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset';
import { getIngredients } from '@/services/burger-ingredients/actions';
import { setShowModal } from '@/services/burger-ingredients/reducer';
import { useDispatch } from '@/services/store';
import { ROUTES } from '@/utils/constants';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppLayout } from '../app-layout/app-layout';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { UserIsAuthorized, UserNotAuthorized } from '../protected-route/protected-route';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const background: Location | null =
    (location.state as Record<string, Location>)?.background ?? null;

  const closeModal = (): void => {
    dispatch(setShowModal(false));
    navigate(-1);
    return;
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <Routes location={background ?? location}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.ingredients} element={<IngredientDetails />} />
          <Route
            path={ROUTES.login}
            element={<UserNotAuthorized component={<Login />} />}
          />
          <Route
            path={ROUTES.register}
            element={<UserNotAuthorized component={<Register />} />}
          />
          <Route
            path={ROUTES.forgotPassword}
            element={<UserNotAuthorized component={<ForgotPassword />} />}
          />
          <Route
            path={ROUTES.resetPassword}
            element={<UserNotAuthorized component={<ResetPassword />} />}
          />
          <Route
            path={ROUTES.profile}
            element={<UserIsAuthorized component={<Profile />} />}
          />
          <Route path={ROUTES.error404} element={<Error404 />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path={ROUTES.ingredients}
            element={
              <Modal title="Детали ингредиента" onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
