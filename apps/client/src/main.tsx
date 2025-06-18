import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './contexts/auth.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider defaultColorScheme='auto'>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </QueryClientProvider>,
);
