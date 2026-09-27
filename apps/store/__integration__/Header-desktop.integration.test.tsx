import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "@/components/layout/Header";
import { userEvent } from "vitest/browser";
import { expectNoAccessibilityViolations } from "@/test/accessibility";
import NavbarMobile from "@/components/layout/Navbar/Mobile/NavbarMobile";

vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => true,
}));

const mockUseUser = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@clerk/nextjs", () => ({
  useUser: () => mockUseUser(),
  useClerk: () => ({ signOut: mockSignOut }),
}));

// [ ]: We will eventually add an HTTP call for the links and mock it here.Probably using MSW.
describe("<Header />", () => {
  it('has category links. On their "mouseOver" and "mouseOut" events "<NavbarMenu />" will toggle', async () => {
    mockUseUser.mockReturnValue({
      user: { id: "123" },
      isLoaded: true,
      isSignedIn: true,
    });
    const { container } = render(<Header />);
    const categoryLinks = screen.getAllByRole("link", { hidden: true });
    const categoryTrigger = categoryLinks[1];
    const navbarMenu = screen.getByTestId("navbar-menu");
    expect(navbarMenu).toHaveClass("-translate-y-full");
    fireEvent.mouseOver(categoryTrigger);
    await waitFor(() => {
      expect(navbarMenu).not.toHaveClass("-translate-y-full");
    });
    await expectNoAccessibilityViolations(container);
    fireEvent.mouseOut(categoryTrigger);
    await waitFor(() => {
      expect(navbarMenu).toHaveClass("-translate-y-full");
    });
  });

  it('has category links. On their "mouseover" and "mouseout" same link in vertical navbar should be highlighted', async () => {
    mockUseUser.mockReturnValue({
      user: { id: "123" },
      isLoaded: true,
      isSignedIn: true,
    });
    render(<Header />);
    const categoryLink = screen.getByRole("link", {
      hidden: true,
      name: /curve/i,
    });
    const categoryLinkTrigger = categoryLink;
    fireEvent.mouseOver(categoryLinkTrigger);
    const verticalCategoryLinksContainer = screen.getByTestId(
      "vertical-scrollable-content",
    );
    const verticalCategoryLink = within(
      verticalCategoryLinksContainer,
    ).getByText("Curve", {
      selector: "span",
    }).parentElement;
    await waitFor(() => {
      expect(verticalCategoryLink).toBeInTheDocument();
      expect(verticalCategoryLink).toHaveClass("bg-accent");
    });
  });

  it('has user avatar dropdown with "Sign up" and "Sign in"', async () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: true,
      isSignedIn: false,
    });
    render(<Header />);
    const dropdownTrigger = screen.getByRole("button", {
      name: "Open user menu",
      hidden: true,
    });
    expect(dropdownTrigger).toBeInTheDocument();
    await userEvent.click(dropdownTrigger);
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it('has user avatar dropdown with "Profile" and "Sign out" after logging in', async () => {
    mockUseUser.mockReturnValue({
      user: { id: "123" },
      isLoaded: true,
      isSignedIn: true,
    });
    render(<Header />);
    const dropdownTrigger = screen.getByRole("button", {
      hidden: true,
      name: "Open user menu",
    });
    expect(dropdownTrigger).toBeInTheDocument();
    await userEvent.click(dropdownTrigger);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it('has "Sign out" in user avatar dropdown, when clicked it calls signOut()', async () => {
    mockUseUser.mockReturnValue({
      user: { id: "123" },
      isSignedIn: true,
      isLoaded: true,
    });
    render(<Header />);
    const dropdownTrigger = screen.getByRole("button", {
      hidden: true,
      name: "Open user menu",
    });
    await userEvent.click(dropdownTrigger);
    const signOutTrigger = screen.getByText("Sign out");
    expect(signOutTrigger).toBeInTheDocument();
    await userEvent.click(signOutTrigger);
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("supports the complete Categories keyboard journey", async () => {
    const user = userEvent.setup();

    render(<Header />);

    const trigger = screen.getByRole("button", {
      name: "Categories",
    });

    // Testing "Categories" button focus
    trigger.focus();
    await user.keyboard("{Enter}");

    const tabs = screen.getAllByRole("tab");

    // Testing category link focus
    await expect.element(tabs[0]).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{ArrowDown}");

    await expect.element(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Tab}");

    const firstSubcategory = screen.getAllByRole("link", {
      name: /shirt/i,
    })[0];

    await expect.element(firstSubcategory).toHaveFocus();

    await user.keyboard("{Escape}");

    await expect.element(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("navbar-menu")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("enters and leaves the submenu from a navbar category link", async () => {
    const user = userEvent.setup();

    render(<Header />);

    const curveLink = screen.getByRole("link", {
      name: /^curve$/i,
    });

    curveLink.focus();
    await user.keyboard("{ArrowDown}");

    const curveTab = screen.getByRole("tab", {
      name: /^curve$/i,
    });

    await expect.element(curveTab).toHaveFocus();
    expect(curveTab).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Escape}");

    await expect.element(curveLink).toHaveFocus();
  });

  it("removes the closed mobile menu from keyboard and accessibility navigation", () => {
    render(<NavbarMobile />);

    const menu = screen.getByTestId("mobile-menu");

    expect(menu).toHaveAttribute("aria-hidden", "true");
    expect(menu).toHaveAttribute("inert");
  });
});
