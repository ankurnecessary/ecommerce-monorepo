import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '.';

describe('Footer', () => {
  it('renders the component with text', () => {
    render(<Footer />);
    expect(screen.getByText('This is footer.')).toBeInTheDocument();
  });
});
