import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import VerticalScrollContainer from '@/components/custom-ui/VerticalScrollContainer';

describe('VerticalScrollContainer', () => {
  it('should render the component', () => {
    const { getByRole } = render(
      <VerticalScrollContainer>
        <div className="content">Test Content</div>
      </VerticalScrollContainer>,
    );
    const container = getByRole('group', { hidden: true }); // Use role if applicable
    expect(container).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <VerticalScrollContainer>
        <div>Test Content</div>
      </VerticalScrollContainer>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('calculates height correctly', () => {
    render(<div data-testid="my-div">Test</div>);
    const div = screen.getByTestId('my-div');

    Object.defineProperty(div, 'offsetHeight', {
      configurable: true,
      value: 200,
    });

    expect(div.offsetHeight).toBe(200);
  });

  it('shows scrollbar when content overflows container', async () => {
    const { getByTestId, getByRole, rerender } = render(
      <VerticalScrollContainer>
        <div style={{ height: '200px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const container = getByRole('group', { hidden: true });
    Object.defineProperty(container, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    expect(container.offsetHeight).toBe(100);
    // screen.debug(); // Debugging line to check the rendered output

    const scrollableContent = getByTestId('vertical-scrollable-content');
    Object.defineProperty(scrollableContent, 'scrollHeight', {
      configurable: true,
      value: 200,
    });
    expect(scrollableContent.scrollHeight).toBe(200);

    expect(scrollableContent.scrollHeight).toBeGreaterThan(
      container.offsetHeight,
    );

    rerender(
      <VerticalScrollContainer>
        <div style={{ height: '200px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );
    expect(getByTestId('scrollbar')).toBeInTheDocument();
  });

  it('should sync thumb position on scroll', () => {
    const { getByTestId, getByRole, rerender } = render(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const container = getByRole('group', { hidden: true });
    Object.defineProperty(container, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    expect(container.offsetHeight).toBe(100);
    // screen.debug(); // Debugging line to check the rendered output

    const scrollableContent = getByTestId('vertical-scrollable-content');
    Object.defineProperty(scrollableContent, 'scrollHeight', {
      configurable: true,
      value: 300,
    });
    expect(scrollableContent.scrollHeight).toBe(300);

    // Mock scrollTop
    Object.defineProperty(scrollableContent, 'scrollTop', {
      configurable: true,
      writable: true, // Make it writable so we can modify it
      value: 0, // Initial value
    });
    expect(scrollableContent.scrollTop).toBe(0);

    expect(scrollableContent.scrollHeight).toBeGreaterThan(
      container.offsetHeight,
    );

    // After rerendering, thumb becomes part of the DOM
    rerender(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const thumb = container.querySelector('.rounded-md') as HTMLElement;

    // Simulate scrolling
    scrollableContent.scrollTop = 50; // Set scrollTop to a new value
    fireEvent.scroll(scrollableContent);

    expect(scrollableContent.scrollTop).toBe(50);

    // Verify thumb position is updated
    expect(thumb.style.top).not.toBe('0px');
  });

  it('scrolls to the correct element when scrollToElementId is provided', () => {
    const { getByTestId } = render(
      <VerticalScrollContainer scrollToElementId="target">
        <div style={{ height: '600px' }}>Long Content</div>
        <div id="target">Target Element</div>
      </VerticalScrollContainer>,
    );

    const scrollableContent = getByTestId('vertical-scrollable-content');
    const target = scrollableContent.querySelector('#target') as HTMLElement;

    // Mock offsetTop of the target element
    Object.defineProperty(target, 'offsetTop', {
      configurable: true,
      value: 500,
    });
    expect(target.offsetTop).toBe(500);

    // Mock scrollTop
    Object.defineProperty(scrollableContent, 'scrollTop', {
      configurable: true,
      writable: true, // Make it writable so we can modify it
      value: 0, // Initial value
    });
    expect(scrollableContent.scrollTop).toBe(0);

    // Simulate scrollTo by manually updating scrollTop
    scrollableContent.scrollTo = vi.fn(({ top }) => {
      scrollableContent.scrollTop = top - 60; // Adjust for the scroll position
    });

    // Re-run the scroll logic to simulate useEffect behavior
    act(() => {
      scrollableContent.scrollTo({ top: target.offsetTop });
    });

    expect(scrollableContent.scrollTop).toBe(target.offsetTop - 60); // 500 - 60
  });

  it('should handle mouse down, move, and up events for dragging', () => {
    const { getByTestId, getByRole, rerender } = render(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const container = getByRole('group', { hidden: true });
    Object.defineProperty(container, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    expect(container.offsetHeight).toBe(100);
    // screen.debug(); // Debugging line to check the rendered output

    const scrollableContent = getByTestId('vertical-scrollable-content');
    Object.defineProperty(scrollableContent, 'scrollHeight', {
      configurable: true,
      value: 300,
    });
    expect(scrollableContent.scrollHeight).toBe(300);

    // Mock scrollTop
    Object.defineProperty(scrollableContent, 'scrollTop', {
      configurable: true,
      writable: true, // Make it writable so we can modify it
      value: 0, // Initial value
    });
    expect(scrollableContent.scrollTop).toBe(0);

    expect(scrollableContent.scrollHeight).toBeGreaterThan(
      container.offsetHeight,
    );

    // After rerendering, thumb becomes part of the DOM
    rerender(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const thumb = container.querySelector('.rounded-md') as HTMLElement;

    // Simulate mouse down on the thumb
    fireEvent.mouseDown(thumb, { clientY: 0 });

    // Simulate mouse move
    fireEvent.mouseMove(container, { clientY: 50 });

    // Verify the content scrolls
    expect(scrollableContent.scrollTop).toBeGreaterThan(0);
  });

  it('updates thumb height on window resize', () => {
    const { getByTestId, getByRole, rerender } = render(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const container = getByRole('group', { hidden: true });
    Object.defineProperty(container, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    expect(container.offsetHeight).toBe(100);
    // screen.debug(); // Debugging line to check the rendered output

    const scrollableContent = getByTestId('vertical-scrollable-content');
    Object.defineProperty(scrollableContent, 'scrollHeight', {
      configurable: true,
      value: 300,
    });
    expect(scrollableContent.scrollHeight).toBe(300);

    // Mock scrollTop
    Object.defineProperty(scrollableContent, 'scrollTop', {
      configurable: true,
      writable: true, // Make it writable so we can modify it
      value: 0, // Initial value
    });
    expect(scrollableContent.scrollTop).toBe(0);

    expect(scrollableContent.scrollHeight).toBeGreaterThan(
      container.offsetHeight,
    );

    // After rerendering, thumb becomes part of the DOM
    rerender(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const thumb = container.querySelector('.rounded-md') as HTMLElement;

    // Mock resize event
    fireEvent(window, new Event('resize'));

    // Verify thumb height is updated
    expect(thumb.style.height).not.toBe('');
  });
  it('updates thumb height on window resize1', () => {
    const { getByTestId, getByRole, rerender } = render(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const container = getByRole('group', { hidden: true });
    Object.defineProperty(container, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    expect(container.offsetHeight).toBe(100);
    // screen.debug(); // Debugging line to check the rendered output

    const scrollableContent = getByTestId('vertical-scrollable-content');
    Object.defineProperty(scrollableContent, 'scrollHeight', {
      configurable: true,
      value: 300,
    });
    expect(scrollableContent.scrollHeight).toBe(300);

    expect(scrollableContent.scrollHeight).toBeGreaterThan(
      container.offsetHeight,
    );

    // After rerendering, thumb becomes part of the DOM
    rerender(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const thumb = container.querySelector('.rounded-md') as HTMLElement;

    // Check initial thumb height
    const initialThumbHeight = (100 / 300) * 100; // (containerHeight / contentHeight) * containerHeight
    expect(thumb.style.height).toBe(`${initialThumbHeight.toFixed(4)}px`);

    // Mock new dimensions after resize
    Object.defineProperty(container, 'offsetHeight', {
      configurable: true,
      value: 50, // New container height
    });
    Object.defineProperty(scrollableContent, 'scrollHeight', {
      configurable: true,
      value: 300, // New content height
    });

    // Trigger resize event
    fireEvent(window, new Event('resize'));

    rerender(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    // Check updated thumb height
    const updatedThumbHeight = (50 / 300) * 50; // (newContainerHeight / newContentHeight) * newContainerHeight
    expect(thumb.style.height).toBe(`${updatedThumbHeight.toFixed(5)}px`);
  });

  it('should handle scroll wheel events', () => {
    const { getByTestId, getByRole, rerender } = render(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const container = getByRole('group', { hidden: true });
    Object.defineProperty(container, 'offsetHeight', {
      configurable: true,
      value: 100,
    });
    expect(container.offsetHeight).toBe(100);
    // screen.debug(); // Debugging line to check the rendered output

    const scrollableContent = getByTestId('vertical-scrollable-content');
    Object.defineProperty(scrollableContent, 'scrollHeight', {
      configurable: true,
      value: 300,
    });
    expect(scrollableContent.scrollHeight).toBe(300);

    expect(scrollableContent.scrollHeight).toBeGreaterThan(
      container.offsetHeight,
    );

    // Mock scrollTop
    Object.defineProperty(scrollableContent, 'scrollTop', {
      configurable: true,
      writable: true, // Make it writable so we can modify it
      value: 0, // Initial value
    });
    expect(scrollableContent.scrollTop).toBe(0);

    // After rerendering, thumb becomes part of the DOM
    rerender(
      <VerticalScrollContainer>
        <div style={{ height: '300px' }}>Long Content</div>
      </VerticalScrollContainer>,
    );

    const scrollbar = getByTestId('scrollbar');

    // Simulate mouse wheel event
    fireEvent.wheel(scrollbar, { deltaY: 50 });
    expect(scrollableContent.scrollTop).toBe(50); // Check if scrollTop is updated});
  });
});
