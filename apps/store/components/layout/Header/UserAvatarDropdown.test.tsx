import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { userEvent } from "@testing-library/user-event";

const mockSignOut = vi.fn();
const mockUseUser = vi.fn();
vi.mock("@clerk/nextjs", () => ({
  useUser: () => mockUseUser(),
  useClerk: () => ({ signOut: mockSignOut }),
}));

describe("UserAvatarDropdown", () => {
  it("Renders an accessible menu trigger", () => {
    mockUseUser.mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
      user: undefined,
    });
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", { name: "Open user menu" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("type", "button");
  });

  it("Opens the menu when the trigger is selected", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: undefined,
      user: undefined,
    });
    const user = userEvent.setup();
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", { name: "Open user menu" });
    await user.click(trigger);
    expect(
      screen.getByRole("menuitem", { name: "Sign in" }),
    ).toBeInTheDocument();
  });

  it("shows loading state while Clerk is loading", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: false,
      isSignedIn: undefined,
      user: undefined,
    });

    const user = userEvent.setup();

    render(<UserAvatarDropdown />);

    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });

    await user.click(trigger);

    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("shows 'Sign Up' and 'Sign In' link in menu items when user is signed out", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    });
    const user = userEvent.setup();
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });
    await user.click(trigger);
    expect(
      screen.getByRole("menuitem", { name: /sign up/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("menuitem", { name: /sign out/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("menuitem", { name: /profile/i }),
    ).not.toBeInTheDocument();
  });

  it("shows 'Sign up' and 'Sign in' with appropriate link when user is signed out", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: undefined,
    });
    const user = userEvent.setup();
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });
    await user.click(trigger);
    expect(
      screen.getByRole("menuitem", {
        name: /sign up/i,
      }),
    ).toHaveAttribute("href", "/sign-up");
    expect(
      screen.getByRole("menuitem", {
        name: /sign in/i,
      }),
    ).toHaveAttribute("href", "/sign-in");
  });

  it("show 'Profile' and 'Sign out' when a user signs in", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: "user_1",
        fullName: "Jhony Maccer",
        username: "jhony",
        hasImage: false,
      },
    });
    const user = userEvent.setup();
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", { name: "Open user menu" });
    await user.click(trigger);
    expect(
      screen.getByRole("menuitem", {
        name: /profile/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", {
        name: /sign out/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("menuitem", {
        name: /sign in/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("menuitem", {
        name: /sign up/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("calls signOut with the homepage redirect when Sign out is selected", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: "user_1",
        fullName: "Jhony Maccer",
        username: "jhony",
        hasImage: false,
      },
    });
    const user = userEvent.setup();
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });
    await user.click(trigger);
    const signOutMenuItem = screen.getByRole("menuitem", {
      name: /sign out/i,
    });
    await user.click(signOutMenuItem);
    expect(mockSignOut).toHaveBeenCalledOnce();
    expect(mockSignOut).toHaveBeenCalledWith({
      redirectUrl: "/",
    });
  });

});
