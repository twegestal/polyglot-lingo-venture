import { BrowserRouter } from 'react-router-dom';
import { AuthenticationForm } from './components/auth/AuthenticationForm';
import { useAuth } from './contexts/auth';
import { AppRoutes } from './components/routes/AppRoutes';
import { LoadingOverlay } from '@mantine/core';

export const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay visible />;
  }

  return <BrowserRouter>{user ? <AppRoutes /> : <AuthenticationForm />}</BrowserRouter>;
};
