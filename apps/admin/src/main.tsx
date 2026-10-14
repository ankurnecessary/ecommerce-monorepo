import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './app/router';
import { ClerkProvider } from '@clerk/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "Sign in to Celeb Store's dashboard",
          },
        },
      }}
      routerPush={(to) => router.navigate(to)}
      routerReplace={(to) => router.navigate(to, { replace: true })}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
);
