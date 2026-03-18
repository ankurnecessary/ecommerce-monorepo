import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '@/components/layout/Header';

describe('<Header />', () => {
  it('should show the mobile-navbar on click of the button', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(button).toBeInTheDocument();
    const navbar = screen.getByTestId('mobile-menu');
    expect(navbar).toHaveClass('-translate-x-full');
    expect(navbar).toBeInTheDocument();
    fireEvent.click(button);
    expect(navbar).not.toHaveClass('-translate-x-full');
  });
});
