import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import RouteErrorPage from './RouteErrorPage';

const { useRouteErrorMock } = vi.hoisted(() => ({
  useRouteErrorMock: vi.fn(),
}));

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();

  return {
    ...actual,
    useRouteError: useRouteErrorMock,
  };
});

describe('RouteErrorPage', () => {
  it('shows the status and status text for a route error response', () => {
    useRouteErrorMock.mockReturnValue({
      status: 403,
      statusText: 'Forbidden',
      data: null,
      internal: false,
    });

    render(
      <MemoryRouter>
        <RouteErrorPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('403 Forbidden')).toBeInTheDocument();
  });
});
