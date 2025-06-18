import { BrowserRouter } from 'react-router-dom';
import { AuthenticationForm } from './components/auth/AuthenticationForm';
import { useAuth } from './contexts/auth';
import { AppRoutes } from './components/routes/AppRoutes';

export const App = () => {
  const { user } = useAuth();

  return <BrowserRouter>{user ? <AppRoutes /> : <AuthenticationForm />}</BrowserRouter>;
};
