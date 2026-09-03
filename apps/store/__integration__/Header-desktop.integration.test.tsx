import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "@/components/layout/Header";

vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => true,
}));

// [ ]: We will eventually add an HTTP call for the links and mock it here.Probably using MSW.
describe("<Header />", () => {
  it('has category links. On their "mouseOver" and "mouseOut" events "<NavbarMenu />" will toggle', async () => {
    render(<Header />);
    const categoryLinks = screen.getAllByRole("link", { hidden: true });
    const navbarMenu = screen.getByTestId("navbar-menu");
    expect(navbarMenu).toHaveClass("-translate-y-full");
    fireEvent.mouseOver(categoryLinks[1]);
    waitFor(() => {
      expect(navbarMenu).not.toHaveClass("-translate-y-full");
    });
    fireEvent.mouseOut(categoryLinks[1]);
    waitFor(() => {
      expect(navbarMenu).toHaveClass("-translate-y-full");
    });
  });

  it('has category links. On their "mouseover" and "mouseout" same link in vertical navbar should be highlighted', () => {
    render(<Header />);
    const categoryLink = screen.getByRole("link", {
      hidden: true,
      name: /curve/i,
    });
    fireEvent.mouseOver(categoryLink);
    const verticalCategoryLinks = screen.getAllByText(/curve/i, {
      selector: "span",
    });
    const verticalCategoryLink = verticalCategoryLinks[1].parentElement;

    waitFor(() => {
      expect(verticalCategoryLink).toBeInTheDocument();
      expect(verticalCategoryLink).toHaveClass("bg-gray-100");
      expect(verticalCategoryLink).toHaveClass("dark:bg-zinc-800");
    });
  });
});
