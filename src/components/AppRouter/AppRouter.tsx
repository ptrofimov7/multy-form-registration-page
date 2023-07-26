import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import LoginRegister from '../../pages/LoginRegisterPage';
import ConfirmationPhonePage from '../../pages/ConfirmationPhonePage';
import RegisterPage from '../../pages/RegisterPage';
import ProfilePage from '../../pages/ProfilePage';

const AppRouter = () => {
   return (
      <Routes>
         <Route path='/' element={<LoginRegister />} />
         <Route path="confirmationphone" element={<ConfirmationPhonePage />} />
         <Route path="registration" element={<RegisterPage />} />
         <Route path="profile" element={<ProfilePage />} />
         <Route
            path="*"
            element={<Navigate to="/" replace />}
         />
      </Routes>
   );
};

export default AppRouter;
