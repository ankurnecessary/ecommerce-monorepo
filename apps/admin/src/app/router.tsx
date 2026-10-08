import { createBrowserRouter } from 'react-router';

import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import RouteErrorPage from '../pages/RouteErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AdminLayout,
    ErrorBoundary: RouteErrorPage,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
