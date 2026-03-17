import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NavbarMobileMenu from '@/components/layout/Navbar/Mobile/NavbarMobileMenu';
import { MenuCategory } from '@/components/layout/Header/types';

describe('NavbarMobileMenu', () => {
  const mockSetIsSubMenuVisible = vi.fn();
  const mockSetSubCategories = vi.fn();
  const mockLinks: MenuCategory[] = [
    {
      id: 'cat1',
      name: 'With Subcategories',
      url: '/category-1',
      subcategories: [
        {
          id: 'sub1',
          name: 'Sub 1',
          url: '/sub-1',
          imagePath: 'https://picsum.photos/id/1/55/55',
        },
      ],
    },
    {
      id: 'cat2',
      name: 'No Subcategories',
      url: '/category-2',
      subcategories: [],
    },
  ];

  it('should load a list with list items when links are present', () => {
    const { getByRole, getAllByRole } = render(
      <NavbarMobileMenu
        links={mockLinks}
        setIsSubMenuVisible={mockSetIsSubMenuVisible}
        setSubCategories={mockSetSubCategories}
      />,
    );
    const list = getByRole('list');
    const listItems = getAllByRole('listitem');
    expect(list).toBeInTheDocument();
    expect(listItems.length).toBe(2);
  });

  it('renders all category names', () => {
    const { getByText } = render(
      <NavbarMobileMenu
        links={mockLinks}
        setIsSubMenuVisible={mockSetIsSubMenuVisible}
        setSubCategories={mockSetSubCategories}
      />,
    );

    expect(getByText('With Subcategories')).toBeInTheDocument();
    expect(getByText('No Subcategories')).toBeInTheDocument();
  });

  it('should load a "No links found!!" message when links are not available', () => {
    const { getByText } = render(
      <NavbarMobileMenu
        links={[]}
        setIsSubMenuVisible={mockSetIsSubMenuVisible}
        setSubCategories={mockSetSubCategories}
      />,
    );
    expect(getByText('No links found!!')).toBeInTheDocument();
  });

  it('calls handlers on clicking category with subcategories', () => {
    const { getByText } = render(
      <NavbarMobileMenu
        links={mockLinks}
        setIsSubMenuVisible={mockSetIsSubMenuVisible}
        setSubCategories={mockSetSubCategories}
      />,
    );

    fireEvent.click(getByText('With Subcategories'));

    expect(mockSetSubCategories).toHaveBeenCalledWith(
      mockLinks[0].subcategories,
    );
    expect(mockSetIsSubMenuVisible).toHaveBeenCalledWith(true);
  });

  it('renders link when no subcategories', () => {
    const { getByRole } = render(
      <NavbarMobileMenu
        links={mockLinks}
        setIsSubMenuVisible={mockSetIsSubMenuVisible}
        setSubCategories={mockSetSubCategories}
      />,
    );

    const link = getByRole('link', { name: /No Subcategories/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/category/category-2');
  });
});
