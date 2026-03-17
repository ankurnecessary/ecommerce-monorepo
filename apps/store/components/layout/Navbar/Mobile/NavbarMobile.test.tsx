import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import NavbarMobile from '@/components/layout/Navbar/Mobile/NavbarMobile';
import { useHeaderContext } from '@/components/layout/Header/Header.context';
import { mockUseHeaderContext } from '@/components/layout/Header/Header.context.test.mock';

const toggleMenuMock = vi.fn();
describe('<NavbarMobile />', () => {
  it('should not render menu when isMenuVisible is false', () => {
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        mobile: { isMenuVisible: false, toggleMenu: toggleMenuMock },
      }),
    );

    render(<NavbarMobile />);
    expect(screen.queryByTestId('mobile-menu')).toHaveClass(
      '-translate-x-full',
    );
  });

  it('should render menu when isMenuVisible is true', () => {
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        mobile: { isMenuVisible: true, toggleMenu: toggleMenuMock },
      }),
    );

    render(<NavbarMobile />);
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    expect(screen.getByLabelText('Close Menu')).toBeInTheDocument(); // close button
  });

  it('should close the menu when X button is clicked', () => {
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        mobile: { isMenuVisible: true, toggleMenu: toggleMenuMock },
      }),
    );

    render(<NavbarMobile />);
    const closeButton = screen.getAllByRole('button')[0]; // The X button
    fireEvent.click(closeButton);
    expect(toggleMenuMock).toHaveBeenCalledWith(false);
  });

  it('should close the menu when backdrop is clicked', () => {
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        mobile: { isMenuVisible: true, toggleMenu: toggleMenuMock },
      }),
    );

    render(<NavbarMobile />);
    const backdrop = screen.getByTestId('backdrop');
    fireEvent.click(backdrop);
    expect(toggleMenuMock).toHaveBeenCalledWith(false);
  });
});
