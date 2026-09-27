import { describe, expect, it, type Mock, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import NavbarScroller from "@/components/layout/Navbar/Desktop/NavbarScroller";
import { useHeaderContext } from "@/components/layout/Header/Header.context";
import { mockUseHeaderContext } from "@/components/layout/Header/Header.context.test.mock";

const renderScroller = ({
  viewportWidth = 1000,
  contentWidth = 3000,
  scrollLeft = 0,
} = {}) => {
  const viewport = document.createElement("div");
  const content = document.createElement("div");

  Object.defineProperties(viewport, {
    clientWidth: { configurable: true, value: viewportWidth },
    scrollWidth: { configurable: true, value: contentWidth },
    scrollLeft: {
      configurable: true,
      writable: true,
      value: scrollLeft,
    },
  });
  viewport.scrollLeft = scrollLeft;
  viewport.scrollBy = vi.fn();

  const context = mockUseHeaderContext();
  context.desktop.navbar.parent = viewport;
  context.desktop.navbar.child = content;

  (useHeaderContext as Mock).mockReturnValue(context);

  const view = render(<NavbarScroller />);

  return { viewport, view };
};

const leftArrow = () =>
  screen.getByRole("button", { name: "Scroll categories left" });

const rightArrow = () =>
  screen.getByRole("button", { name: "Scroll categories right" });

describe("NavbarScroller", () => {
  it("renders both arrow buttons", () => {
    renderScroller();

    expect(leftArrow()).toBeInTheDocument();
    expect(rightArrow()).toBeInTheDocument();
  });

  it("disables the left arrow at the start", () => {
    renderScroller();

    expect(leftArrow()).toBeDisabled();
    expect(rightArrow()).toBeEnabled();
  });

  it("scrolls by one viewport width when the right arrow is clicked", () => {
    const { viewport } = renderScroller({ viewportWidth: 1000 });

    fireEvent.click(rightArrow());

    expect(viewport.scrollBy).toHaveBeenCalledWith({
      left: 1000,
      behavior: "smooth",
    });
  });

  it("scrolls by one viewport width when the left arrow is clicked", () => {
    const { viewport } = renderScroller({ scrollLeft: 1000 });

    fireEvent.click(leftArrow());

    expect(viewport.scrollBy).toHaveBeenCalledWith({
      left: -1000,
      behavior: "smooth",
    });
  });

  it("updates arrow states after scrolling, including scrolling caused by keyboard focus", () => {
    const { viewport } = renderScroller();

    expect(leftArrow()).toBeDisabled();

    viewport.scrollLeft = 300;
    fireEvent.scroll(viewport);

    expect(leftArrow()).toBeEnabled();
    expect(rightArrow()).toBeEnabled();

    viewport.scrollLeft = 2000;
    fireEvent.scroll(viewport);

    expect(leftArrow()).toBeEnabled();
    expect(rightArrow()).toBeDisabled();
  });

  it("hides the arrows when the content fits in the viewport", () => {
    const { view } = renderScroller({
      viewportWidth: 1000,
      contentWidth: 1000,
    });

    expect(view.container.querySelector(".shadow-left")).toHaveClass("hidden");
    expect(leftArrow()).toBeDisabled();
    expect(rightArrow()).toBeDisabled();
  });
});
