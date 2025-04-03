import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './contexts/auth.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider defaultColorScheme='auto'>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MantineProvider>,
);
