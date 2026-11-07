import { describe, expect, it } from 'vitest';
import NavbarSubcategory from '@/components/layout/Navbar/Desktop/NavbarSubcategory';
import { fireEvent, render } from '@testing-library/react';

const subCategory = {
  id: '1',
  name: 'electronics',
  url: '/electronics',
  imagePath: '/electronics.jpg',
};

describe('NavbarSubcategory', () => {
  it('renders subcategory name', () => {
    const { getByText } = render(
      <NavbarSubcategory subCategory={subCategory} />,
    );
    expect(getByText('electronics')).toBeInTheDocument();
  });

  it('renders image with correct props', () => {
    const { getByAltText } = render(
      <NavbarSubcategory subCategory={subCategory} />,
    );
    const img = getByAltText('electronics');
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('electronics.jpg'),
    );
    expect(img).toHaveAttribute('width', '55');
    expect(img).toHaveAttribute('height', '55');
  });

  it('shows skeleton before image loads', () => {
    const { getByTestId } = render(
      <NavbarSubcategory subCategory={subCategory} />,
    );
    expect(getByTestId('skeleton')).toBeInTheDocument();
  });

  it('hides skeleton and shows image after load', () => {
    const { getByAltText, queryByTestId } = render(
      <NavbarSubcategory subCategory={subCategory} />,
    );
    const img = getByAltText('electronics');
    fireEvent.load(img);
    expect(queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(img).not.toHaveStyle('visibility: hidden');
  });

  it('link has correct href', () => {
    const { getByRole } = render(
      <NavbarSubcategory subCategory={subCategory} />,
    );
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/category/electronics');
  });
});
