import { createBrowserRouter } from 'react-router';

import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/dashboard/DashboardPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import RouteErrorPage from '../pages/errors/RouteErrorPage';
import SignInPage from '../pages/sign-in/SignInPage';
import CategoryPage from '../pages/category/CategoryPage';
import RequireAuth from '../features/auth/RequireAuth';
import UnauthorizedPage from '../pages/errors/UnauthorizedPage';
import SignOutPage from '../pages/sign-out/SignOutPage';

export const router = createBrowserRouter([
  {
    ErrorBoundary: RouteErrorPage,
    children: [
      {
        path: '/sign-in/*',
        Component: SignInPage,
      },
      {
        path: '/sign-out',
        Component: SignOutPage,
      },
      {
        path: '/unauthorized',
        Component: UnauthorizedPage,
      },
      {
        Component: RequireAuth,
        children: [
          {
            path: '/',
            Component: AdminLayout,
            children: [
              {
                index: true,
                Component: DashboardPage,
              },
              {
                path: 'category',
                Component: CategoryPage,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
