import { Error404 } from '@/pages/error404/error404';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset';
import { getIngredients } from '@/services/burger-ingredients/actions';
import { useDispatch } from '@/services/store';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppLayout } from '../app-layout/app-layout';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const background: Location | null =
    (location.state as Record<string, Location>)?.background ?? null;

  const closeModal = (): void => {
    navigate(-1);
    return;
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  /*
   */

  return (
    <>
      <Routes location={background ?? location}>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
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
