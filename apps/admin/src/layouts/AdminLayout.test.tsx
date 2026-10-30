import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import AdminLayout from './AdminLayout';

vi.mock('@clerk/react', () => ({
  Show: ({ children }: { children: ReactNode }) => children,
}));

describe('AdminLayout', () => {
  it('navigates to the sign-out page when Sign out is selected', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<p>Dashboard content</p>} />
          </Route>

          <Route path="/sign-out" element={<p>Sign-out page</p>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard content')).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Sign out',
      }),
    );

    expect(await screen.findByText('Sign-out page')).toBeInTheDocument();

    expect(screen.queryByText('Dashboard content')).not.toBeInTheDocument();
  });
});
