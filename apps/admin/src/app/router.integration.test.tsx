import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { routes } from './router';

const { signOutMock, useAuthMock } = vi.hoisted(() => ({
  signOutMock: vi.fn().mockResolvedValue(undefined),
  useAuthMock: vi.fn(),
}));

vi.mock('@clerk/react', () => ({
  Show: ({ children }: { children: ReactNode }) => children,
  SignIn: () => <div>Clerk sign-in</div>,
  SignOutButton: ({ children }: { children: ReactNode }) => children,
  useAuth: useAuthMock,
  useClerk: () => ({ signOut: signOutMock }),
}));

const renderRouter = (
  initialEntry: string,
  routeConfiguration: RouteObject[] = routes,
) => {
  const router = createMemoryRouter(routeConfiguration, {
    initialEntries: [initialEntry],
  });

  render(<RouterProvider router={router} />);

  return router;
};

const ThrowingPage = () => {
  throw new Error('Test route failed');
};

describe('admin router', () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      sessionClaims: {
        metadata: { role: 'dashboardUser' },
      },
    });
  });

  it('renders the category page inside the admin layout for a dashboard user', async () => {
    renderRouter('/category');

    expect(
      await screen.findByRole('heading', {
        name: 'This is category page.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Store administration' }),
    ).toBeInTheDocument();
  });

  it('redirects a signed-out category request to sign-in and preserves the destination', async () => {
    useAuthMock.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      sessionClaims: null,
    });

    const router = renderRouter('/category');

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/sign-in');
    });

    expect(
      new URLSearchParams(router.state.location.search).get('redirect_url'),
    ).toBe('/category');
    expect(screen.getByText('Clerk sign-in')).toBeInTheDocument();
  });

  it('matches nested Clerk sign-in paths', async () => {
    renderRouter('/sign-in/factor-one');

    expect(await screen.findByText('Clerk sign-in')).toBeInTheDocument();
  });

  it('keeps the sign-out route outside the authentication guard', async () => {
    renderRouter('/sign-out');

    expect(await screen.findByText('Signing out.')).toBeInTheDocument();
    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalledWith({
        redirectUrl: '/sign-in',
      });
    });
    expect(useAuthMock).not.toHaveBeenCalled();
  });

  it('renders the root route error boundary when a descendant throws', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const rootRoute = routes[0];

    if (rootRoute.index) {
      throw new Error('Expected the root route to accept child routes');
    }

    const errorRoutes: RouteObject[] = [
      {
        ErrorBoundary: rootRoute.ErrorBoundary,
        children: [
          ...(rootRoute.children ?? []),
          {
            path: '/test-error',
            Component: ThrowingPage,
          },
        ],
      },
    ];

    try {
      renderRouter('/test-error', errorRoutes);

      expect(
        await screen.findByRole('heading', { name: 'Something went wrong' }),
      ).toBeInTheDocument();
      expect(
        screen.getByText('The page could not be loaded.'),
      ).toBeInTheDocument();
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
