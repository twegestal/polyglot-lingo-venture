import { AuthenticationForm } from './components/auth/AuthenticationForm';
import { useAuth } from './contexts/auth';

export const App = () => {
  const { user } = useAuth();
  
  return <>{user ? <p>Welcome, {user?.email}</p> : <AuthenticationForm />}</>;
};
