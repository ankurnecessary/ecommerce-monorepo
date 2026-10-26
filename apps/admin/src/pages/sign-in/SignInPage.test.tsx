import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import SignInPage from './SignInPage';

vi.mock('@clerk/react', () => ({
  SignIn: ({ forceRedirectUrl }: { forceRedirectUrl?: string }) => (
    <div
      data-testid="clerk-sign-in"
      data-force-redirect-url={forceRedirectUrl}
    />
  ),
}));

describe('SignInPage', () => {
  it('uses / when no redirect_url is present', () => {
    render(
      <MemoryRouter initialEntries={['/sign-in']}>
        <SignInPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('clerk-sign-in')).toHaveAttribute(
      'data-force-redirect-url',
      '/',
    );
  });
});
