import { describe, expect, it, Mock, vi } from 'vitest';
import NavbarMenu from '@/components/layout/Navbar/Desktop/NavbarMenu';
import { fireEvent, render } from '@testing-library/react';
import * as HeaderContextModule from '@/components/layout/Header/Header.context';
import { mockUseHeaderContext } from '@/components/layout/Header/Header.context.test.mock';
import { MenuCategory } from '@/components/layout/Header/types';
import { MEDIA_QUERIES } from '@/constants';

describe('NavbarMenu', () => {
  it('renders in the DOM.', () => {
    globalThis.matchMediaMock.useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
    const { getByTestId } = render(<NavbarMenu />);
    expect(getByTestId('navbar-menu')).toBeInTheDocument();
  });

  it('applies the correct class based on visibility', () => {
    globalThis.matchMediaMock.useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
    const { getByTestId, rerender } = render(<NavbarMenu />);
    const menu = getByTestId('navbar-menu');

    // Mock `isMenuVisible` as false
    expect(menu).toHaveClass('-translate-y-full');

    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        desktop: {
          isMenuVisible: [
            true,
            { id: '1', name: 'Category1', url: '/category1' },
          ],
        },
      }),
    );
    rerender(<NavbarMenu />);
    expect(menu).not.toHaveClass('-translate-y-full');
  });

  it('calls menuMouseOverHandler on mouse over', () => {
    globalThis.matchMediaMock.useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
    const toggleMenuMock = vi.fn();
    const setSelectedHorizontalNavLinkMock = vi.fn();
    const setSelectedVerticalNavLinkMock = vi.fn();

    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        desktop: {
          toggleMenu: toggleMenuMock,
          setSelectedHorizontalNavLink: setSelectedHorizontalNavLinkMock,
          setSelectedVerticalNavLink: setSelectedVerticalNavLinkMock,
          isMenuVisible: [false, {} as MenuCategory],
        },
      }),
    );

    const { getByTestId } = render(<NavbarMenu />);
    const menu = getByTestId('navbar-menu');

    fireEvent.mouseOver(menu);
    expect(toggleMenuMock).toHaveBeenCalledWith(true, expect.any(Object));
    expect(setSelectedHorizontalNavLinkMock).toHaveBeenCalled();
    expect(setSelectedVerticalNavLinkMock).toHaveBeenCalled();
  });

  it('calls categoryMouseOverHandler on category hover', async () => {
    globalThis.matchMediaMock.useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
    const setSelectedHorizontalNavLinkMock = vi.fn();
    const toggleMenuMock = vi.fn();
    const setSelectedVerticalNavLinkMock = vi.fn();
    const setVerticalNavScrollToElementIdMock = vi.fn();

    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [{ id: '1', name: 'Category', url: '/category' }],
        desktop: {
          setSelectedHorizontalNavLink: setSelectedHorizontalNavLinkMock,
          isMenuVisible: [
            true,
            { id: '1', name: 'Category', url: '/category' },
          ],
          toggleMenu: toggleMenuMock,
          setSelectedVerticalNavLink: setSelectedVerticalNavLinkMock,
          setVerticalNavScrollToElementId: setVerticalNavScrollToElementIdMock,
        },
      }),
    );

    const { getByTestId } = render(<NavbarMenu />);
    const verticalScrollContainer = getByTestId('navbar-menu').querySelector(
      '[data-testid="vertical-scrollable-content"]',
    );
    const navLink = verticalScrollContainer?.querySelector('span');
    expect(navLink).toBeInTheDocument();
    fireEvent.mouseOver(navLink as HTMLAnchorElement);

    expect(toggleMenuMock).toHaveBeenCalledWith(true, {
      id: '1',
      name: 'Category',
      url: '/category',
    });
    expect(setSelectedVerticalNavLinkMock).toHaveBeenCalledWith('Category');
    expect(setVerticalNavScrollToElementIdMock).toHaveBeenCalledWith('');
  });

  it('should have a link with id `scrollToElementId` when `scrollToElementId` is passed', () => {
    globalThis.matchMediaMock.useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [{ id: '1', name: 'Category', url: '/category' }],
        desktop: {
          isMenuVisible: [
            true,
            { id: '1', name: 'Category', url: '/category' },
          ],
          verticalNavScrollToElementId: '1',
        },
      }),
    );

    const { getByTestId } = render(<NavbarMenu />);
    const verticalScrollContainer = getByTestId('navbar-menu').querySelector(
      '[data-testid="vertical-scrollable-content"]',
    );
    expect(
      verticalScrollContainer?.querySelector('#vertical-1'),
    ).toBeInTheDocument(); // "vertical-" is constant part of the id
  });

  it('should highlight the hovered category', () => {
    globalThis.matchMediaMock.useMediaQuery(MEDIA_QUERIES.DESKTOP_MIN_WIDTH);
    const setSelectedVerticalNavLinkMock = vi.fn();

    // Initial mock setup
    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [
          { id: '1', name: 'Category1', url: '/category1' },
          { id: '2', name: 'Category2', url: '/category2' },
        ],
        desktop: {
          isMenuVisible: [
            true,
            { id: '1', name: 'Category1', url: '/category1' },
          ],
          selectedVerticalNavLink: 'Category1', // Initially set to 'Category1'
          setSelectedVerticalNavLink: setSelectedVerticalNavLinkMock,
          toggleMenu: vi.fn(),
          setVerticalNavScrollToElementId: vi.fn(),
        },
      }),
    );

    const { getByTestId, rerender } = render(<NavbarMenu />);
    const verticalScrollContainer = getByTestId('navbar-menu').querySelector(
      '[data-testid="vertical-scrollable-content"]',
    );
    const category = verticalScrollContainer?.querySelector('#vertical-2');

    expect(category).toBeInTheDocument();

    // Simulated mouse over
    fireEvent.mouseOver(category as HTMLSpanElement);

    // Updated mock to reflect the state change
    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [
          { id: '1', name: 'Category1', url: '/category1' },
          { id: '2', name: 'Category2', url: '/category2' },
        ],
        desktop: {
          isMenuVisible: [
            true,
            { id: '2', name: 'Category2', url: '/category2' },
          ], // Update to 'Category2'
          selectedVerticalNavLink: 'Category2', // Update to 'Category2'
          setSelectedVerticalNavLink: setSelectedVerticalNavLinkMock,
          toggleMenu: vi.fn(),
          setVerticalNavScrollToElementId: vi.fn(),
        },
      }),
    );

    // Rerender the component to reflect the updated state
    rerender(<NavbarMenu />);

    // Assert that the mock function was called with 'Category2'
    expect(setSelectedVerticalNavLinkMock).toHaveBeenCalledWith('Category2');

    // Assert that the hovered category has the 'bg-gray-100' class
    expect(category).toHaveClass('bg-gray-100');
  });
});
