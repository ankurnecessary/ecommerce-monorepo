import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './app/router';
import { ClerkProvider } from '@clerk/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);
