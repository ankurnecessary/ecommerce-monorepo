import { createBrowserRouter } from 'react-router';

import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/dashboard/DashboardPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import RouteErrorPage from '../pages/errors/RouteErrorPage';
import SignInPage from '../pages/sign-in/SignInPage';
import CategoryPage from '../pages/category/CategoryPage';

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
