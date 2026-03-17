import { describe, expect, it, Mock, vi } from 'vitest';
import { render } from '@testing-library/react';
import NavbarLinks from '@/components/layout/Navbar/Desktop/NavbarLinks';
import * as HeaderContextModule from '@/components/layout/Header/Header.context';
import { mockUseHeaderContext } from '@/components/layout/Header/Header.context.test.mock';

describe('NavbarLinks', () => {
  it('should have multiple category links', () => {
    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [
          { id: 'fkjffh1', url: '/newIn', name: 'New In' },
          { id: 'fkjffh2', url: '/sale', name: 'Sale' },
        ],
      }),
    );

    const { getAllByRole } = render(
      <NavbarLinks mouseOverHandler={vi.fn()} mouseOutHandler={vi.fn()} />,
    );
    const categoryLinks = getAllByRole('link');
    expect(categoryLinks.length).toBeGreaterThan(0);
  });

  it('renders all nav links with correct text', () => {
    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [
          { id: 'fkjffh1', url: '/newIn', name: 'New In' },
          { id: 'fkjffh2', url: '/sale', name: 'Sale' },
        ],
      }),
    );

    const { getByText } = render(
      <NavbarLinks mouseOverHandler={vi.fn()} mouseOutHandler={vi.fn()} />,
    );
    expect(getByText('New In')).toBeInTheDocument();
    expect(getByText('Sale')).toBeInTheDocument();
  });

  it('calls mouseOverHandler when a link is hovered', () => {
    const mouseOverHandler = vi.fn();
    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [{ id: 'fkjffh1', url: '/newIn', name: 'New In' }],
      }),
    );

    const { getByText } = render(
      <NavbarLinks
        mouseOverHandler={mouseOverHandler}
        mouseOutHandler={vi.fn()}
      />,
    );
    getByText('New In').dispatchEvent(
      new MouseEvent('mouseover', { bubbles: true }),
    );
    expect(mouseOverHandler).toHaveBeenCalled();
  });

  it('calls mouseOutHandler when a link is mouse out', () => {
    const mouseOutHandler = vi.fn();
    (HeaderContextModule.useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        navLinks: [{ id: 'fkjffh1', url: '/newIn', name: 'New In' }],
      }),
    );

    const { getByText } = render(
      <NavbarLinks
        mouseOverHandler={vi.fn()}
        mouseOutHandler={mouseOutHandler}
      />,
    );
    getByText('New In').dispatchEvent(
      new MouseEvent('mouseout', { bubbles: true }),
    );
    expect(mouseOutHandler).toHaveBeenCalled();
  });
});
