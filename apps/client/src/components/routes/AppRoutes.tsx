import { Route, Routes } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { HomePage } from '../../pages/Home.page';

export const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </AppLayout>
  );
};
