import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './contexts/auth.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/App.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider defaultColorScheme='auto'>
      <Notifications position='top-right' />
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </QueryClientProvider>,
);
