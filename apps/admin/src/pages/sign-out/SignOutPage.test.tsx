import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SignOutPage from './SignOutPage';

const { signOutMock } = vi.hoisted(() => ({
  signOutMock: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@clerk/react', () => ({
  useClerk: () => ({
    signOut: signOutMock,
  }),
}));

describe('SignOutPage', () => {
  it('initiates Clerk sign-out once and redirects to /sign-in', async () => {
    render(<SignOutPage />);

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalledTimes(1);

      expect(signOutMock).toHaveBeenCalledWith({
        redirectUrl: '/sign-in',
      });
    });
  });

  it('displays a signing-out message in a busy region', () => {
    render(<SignOutPage />);

    expect(screen.getByText('Signing out.')).toBeInTheDocument();

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
  });
});
