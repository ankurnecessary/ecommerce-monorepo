import { render, screen } from '@testing-library/react';
import NavbarMobileSubmenu from '@/components/layout/Navbar/Mobile/NavbarMobileSubmenu';
import type { MenuSubCategory } from '@/components/layout/Header/types';
import { describe, it, expect } from 'vitest';

describe('NavbarMobileSubmenu', () => {
  const mockSubcategories: MenuSubCategory[] = [
    {
      id: '1',
      name: 'T-Shirts',
      url: '/t-shirts',
      imagePath: 'https://picsum.photos/id/1/55/55',
    },
    {
      id: '2',
      name: 'Jeans',
      url: '/jeans',
      imagePath: 'https://picsum.photos/id/2/55/55',
    },
  ];

  it('should load a "No links found!!" message when links are not available', () => {
    const { getByText } = render(<NavbarMobileSubmenu subcategories={[]} />);
    expect(getByText('No links found!!')).toBeInTheDocument();
  });

  it('renders a list element', () => {
    render(<NavbarMobileSubmenu subcategories={mockSubcategories} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('renders correct number of subcategory items', () => {
    render(<NavbarMobileSubmenu subcategories={mockSubcategories} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockSubcategories.length);
  });

  it('renders subcategory names', () => {
    render(<NavbarMobileSubmenu subcategories={mockSubcategories} />);
    for (const sub of mockSubcategories) {
      expect(screen.getByText(sub.name)).toBeInTheDocument();
    }
  });

  it('renders nothing if subcategories is empty', () => {
    const { container } = render(<NavbarMobileSubmenu subcategories={[]} />);
    expect(container.querySelectorAll('li')).toHaveLength(0);
  });
});
