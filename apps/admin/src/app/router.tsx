import { createBrowserRouter } from 'react-router';

import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import RouteErrorPage from '../pages/RouteErrorPage';
import SignInPage from '../pages/SignInPage';
import CategoryPage from '../pages/CategoryPage';

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    Component: SignInPage,
  },
  {
    path: '/',
    Component: AdminLayout,
    ErrorBoundary: RouteErrorPage,
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
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
