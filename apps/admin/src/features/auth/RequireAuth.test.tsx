import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import RequireAuth from './RequireAuth';

const { useAuthMock } = vi.hoisted(() => ({
  useAuthMock: vi.fn(),
}));

vi.mock('@clerk/react', () => ({
  useAuth: useAuthMock,
}));

describe('RequireAuth', () => {
  it('Shows "Checking authentication." while Clerk is loading', () => {
    useAuthMock.mockReturnValue({
      isLoaded: false,
      isSignedIn: undefined,
      sessionClaims: null,
    });

    render(
      <MemoryRouter initialEntries={['/category']}>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/category" element={<p>Protected content</p>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/^Checking authentication/)).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });
});
