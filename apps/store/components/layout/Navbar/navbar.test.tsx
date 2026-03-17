import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from '@/components/layout/Navbar';
import { MEDIA_QUERIES } from '@/constants';

describe('Navbar', () => {
  it('renders the text inside the component', () => {
    globalThis.matchMediaMock.useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
    render(<Navbar />);
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
});
