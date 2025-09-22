import { Error404 } from '@/pages/error404/error404';
import { Feed } from '@/pages/feed/feed';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { OrdersList } from '@/pages/profile/orders-list/orders-list';
import { Profile } from '@/pages/profile/profile';
import { ProfileEdit } from '@/pages/profile/profile-edit/profile-edit';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset';
import { getIngredients } from '@/services/burger-ingredients/actions';
import { setShowModal } from '@/services/burger-ingredients/reducer';
import { useDispatch } from '@/services/store';
import { getProfile } from '@/services/user/actions';
import { ROUTES } from '@/utils/constants';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppLayout } from '../app-layout/app-layout';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { OrderDetail } from '../order-detail/order-detail';
import { Protected } from '../protected-route/protected-route';

import type { FC } from 'react';

export const App: FC = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getIngredients());
  }, [dispatch]);

  const background: Location | null =
    (location.state as Record<string, Location>)?.background ?? null;

  const closeModal = (): void => {
    dispatch(setShowModal(false));
    navigate(-1);
    return;
  };

  return (
    <>
      <Routes location={background ?? location}>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ingredients} element={<IngredientDetails />} />
          <Route path={ROUTES.feedOrder} element={<OrderDetail />} />
          <Route path={ROUTES.feed} element={<Feed />} />
          <Route path={ROUTES.profileOrder} element={<OrderDetail />} />
          <Route
            path={ROUTES.profile}
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          >
            <Route index element={<ProfileEdit />} />
            <Route path={ROUTES.profileOrders} element={<OrdersList />} />
          </Route>
          <Route
            path={ROUTES.login}
            element={
              <Protected onlyUnAuth={true}>
                <Login />
              </Protected>
            }
          />
          <Route
            path={ROUTES.register}
            element={
              <Protected onlyUnAuth={true}>
                <Register />
              </Protected>
            }
          />
          <Route
            path={ROUTES.forgotPassword}
            element={
              <Protected onlyUnAuth={true}>
                <ForgotPassword />
              </Protected>
            }
          />
          <Route
            path={ROUTES.resetPassword}
            element={
              <Protected onlyUnAuth={true}>
                <ResetPassword />
              </Protected>
            }
          />
          <Route path={ROUTES.error404} element={<Error404 />} />
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
          <Route
            path={ROUTES.profileOrder}
            element={
              <Modal onClose={closeModal}>
                <OrderDetail />
              </Modal>
            }
          />
          <Route
            path={ROUTES.feedOrder}
            element={
              <Modal onClose={closeModal}>
                <OrderDetail />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
