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
    render(<Header />);
    const categoryLinks = screen.getAllByRole("link", { hidden: true });
    const categoryTrigger = categoryLinks[1].querySelector("span");
    const navbarMenu = screen.getByTestId("navbar-menu");
    expect(navbarMenu).toHaveClass("-translate-y-full");
    fireEvent.mouseOver(categoryTrigger);
    await waitFor(() => {
      expect(navbarMenu).not.toHaveClass("-translate-y-full");
    });
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
    const categoryLinkTrigger = categoryLink.querySelector("span");
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
      expect(verticalCategoryLink).toHaveClass(
        "bg-primary/10",
        "dark:bg-primary/20",
      );
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
});
