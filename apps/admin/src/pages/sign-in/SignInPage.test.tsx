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

  it('passes a valid internal path such as /category to Clerk', () => {
    render(
      <MemoryRouter initialEntries={['/sign-in?redirect_url=/category']}>
        <SignInPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('clerk-sign-in')).toHaveAttribute(
      'data-force-redirect-url',
      '/category',
    );
  });

  it('preserves a valid internal path containing a query string', () => {
    const searchParams = new URLSearchParams({
      redirect_url: '/category?page=2&sort=name',
    });

    render(
      <MemoryRouter initialEntries={[`/sign-in?${searchParams.toString()}`]}>
        <SignInPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('clerk-sign-in')).toHaveAttribute(
      'data-force-redirect-url',
      '/category?page=2&sort=name',
    );
  });

  it('Rejects an absolute external URL such as https://example.com', () => {
    const searchParams = new URLSearchParams({
      redirect_url: 'http://example.com',
    });

    render(
      <MemoryRouter initialEntries={[`/sign-in?${searchParams.toString()}`]}>
        <SignInPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('clerk-sign-in')).toHaveAttribute(
      'data-force-redirect-url',
      '/',
    );
  });

  it('Rejects a protocol-relative URL such as //example.com.', () => {
    const searchParams = new URLSearchParams({
      redirect_url: '//example.com',
    });

    render(
      <MemoryRouter initialEntries={[`/sign-in?${searchParams}`]}>
        <SignInPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('clerk-sign-in')).toHaveAttribute(
      'data-force-redirect-url',
      '/',
    );
  });
});
