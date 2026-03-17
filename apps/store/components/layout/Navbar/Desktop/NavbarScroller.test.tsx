import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import NavbarScroller from '@/components/layout/Navbar/Desktop/NavbarScroller';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { useHeaderContext } from '@/components/layout/Header/Header.context';
import { mockUseHeaderContext } from '@/components/layout/Header/Header.context.test.mock';

describe('NavbarScroller', () => {
  it('should render the component', () => {
    const { getByRole } = render(<NavbarScroller />);

    const leftArrowButton = getByRole('button', {
      name: 'left scroller',
    });
    expect(leftArrowButton).toBeInTheDocument();

    const rightArrowButton = getByRole('button', {
      name: 'right scroller',
    });
    expect(rightArrowButton).toBeInTheDocument();
  });

  it('renders <NavbarScroller />. Its left arrow button should be disabled initially.', () => {
    const { getByRole } = render(<NavbarScroller />);
    const leftArrowButton = getByRole('button', {
      name: 'left scroller',
    });
    expect(leftArrowButton).toBeInTheDocument();
    expect(leftArrowButton).toBeDisabled();
  });

  it('renders <NavbarScroller />. Its right arrow button shold be enabled initially.', () => {
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        desktop: {
          navbar: {
            child: {
              getBoundingClientRect: () => ({
                width: 5000,
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
            parent: {
              getBoundingClientRect: () => ({
                width: 1000,
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
            childOffset: 0,
          },
        },
      }),
    );

    const { getByRole } = render(<NavbarScroller />);
    const rightArrowButton = getByRole('button', {
      name: 'right scroller',
    });
    expect(rightArrowButton).toBeInTheDocument();
    expect(rightArrowButton).not.toBeDisabled();
  });

  it('renders <NavbarScroller />. Its left arrow button should be enabled as childOffset != 0', async () => {
    // Mocking HeaderContext
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({ desktop: { navbar: { childOffset: -1000 } } }),
    );

    const { getByRole } = render(<NavbarScroller />);
    const leftArrowButton = getByRole('button', {
      name: 'left scroller',
    });
    expect(leftArrowButton).toBeInTheDocument();
    expect(leftArrowButton).not.toBeDisabled();
  });

  it('renders <NavbarScroller />. Its left arrow button should be enabled after clicking on right arrow', async () => {
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        desktop: {
          navbar: {
            child: {
              getBoundingClientRect: () => ({
                width: 5000,
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
            parent: {
              getBoundingClientRect: () => ({
                width: 1000,
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
            childOffset: 0,
          },
        },
      }),
    );

    const { getByRole, rerender } = render(<NavbarScroller />);

    const leftArrowButton = getByRole('button', {
      name: 'left scroller',
    });
    expect(leftArrowButton).toBeInTheDocument();
    expect(leftArrowButton).toBeDisabled();

    const rightArrowButton = getByRole('button', {
      name: 'right scroller',
    });
    expect(rightArrowButton).toBeInTheDocument();
    expect(rightArrowButton).not.toBeDisabled();

    fireEvent.click(rightArrowButton);
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({ desktop: { navbar: { childOffset: -1000 } } }),
    );

    rerender(<NavbarScroller />);
    await waitFor(() => {
      expect(leftArrowButton).not.toBeDisabled();
    });
  });

  it('renders <NavbarScroller />. Its right arrow button should be disabled when childOffset == maxRightOffset', async () => {
    // Mocking HeaderContext
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        desktop: {
          navbar: {
            child: {
              getBoundingClientRect: () => ({
                width: 5000,
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
            parent: {
              getBoundingClientRect: () => ({
                width: 1000,
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 1000,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
            childOffset: -4000,
          },
        },
      }),
    );

    const { getByRole } = render(<NavbarScroller />);

    const leftArrowButton = getByRole('button', {
      name: 'left scroller',
    });
    expect(leftArrowButton).toBeInTheDocument();
    expect(leftArrowButton).not.toBeDisabled();

    const rightArrowButton = getByRole('button', {
      name: 'right scroller',
    });
    expect(rightArrowButton).toBeInTheDocument();
    expect(rightArrowButton).toBeDisabled();
  });

  it('renders <NavbarScroller />. Its left and right arrow buttons should be disabled when childWidth <= parentWidth', () => {
    // Mocking HeaderContext
    (useHeaderContext as Mock).mockReturnValue(
      mockUseHeaderContext({
        desktop: {
          navbar: {
            child: {
              getBoundingClientRect: () => ({
                width: 500, // Mock childWidth
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
            parent: {
              getBoundingClientRect: () => ({
                width: 500, // Mock parentWidth
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                toJSON: () => {},
              }),
            },
          },
        },
      }),
    );

    const { container } = render(<NavbarScroller />);

    // Assert that the parent <div> has the 'hidden' class
    const parentDiv = container.querySelector('div.shadow-left');
    expect(parentDiv).toHaveClass('hidden');
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
});
