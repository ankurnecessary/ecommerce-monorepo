import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { userEvent } from "vitest/browser";

const mockSignOut = vi.fn();
const mockUseUser = vi.fn();
vi.mock("@clerk/nextjs", () => ({
  useUser: () => mockUseUser(),
  useClerk: () => ({ signOut: mockSignOut }),
}));

vi.mock("./UserAvatar", () => ({
  default: ({ name, imageUrl }: { name: string; imageUrl?: string }) => (
    <div data-testid="user-avatar" data-name={name} data-image-url={imageUrl}>
      Mock user avatar
    </div>
  ),
}));

describe("UserAvatarDropdown", () => {

  it("Opens the menu when the trigger is selected", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: undefined,
      user: undefined,
    });
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", { name: "Open user menu" });
    await userEvent.click(trigger);
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

    render(<UserAvatarDropdown />);

    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });

    await userEvent.click(trigger);

    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("shows 'Sign Up' and 'Sign In' link in menu items when user is signed out", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: null,
    });
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });
    await userEvent.click(trigger);
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
    expect(screen.getByTestId("user-avatar")).toHaveAttribute(
      "data-name",
      "Guest",
    );
  });

  it("shows 'Sign up' and 'Sign in' with appropriate link when user is signed out", async () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: undefined,
    });
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });
    await userEvent.click(trigger);
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
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", { name: "Open user menu" });
    await userEvent.click(trigger);
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
    expect(screen.getByTestId("user-avatar")).toHaveAttribute(
      "data-name",
      "Jhony Maccer",
    );
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
    render(<UserAvatarDropdown />);
    const trigger = screen.getByRole("button", {
      name: "Open user menu",
    });
    await userEvent.click(trigger);
    const signOutMenuItem = screen.getByRole("menuitem", {
      name: /sign out/i,
    });
    await userEvent.click(signOutMenuItem);
    expect(mockSignOut).toHaveBeenCalledOnce();
    expect(mockSignOut).toHaveBeenCalledWith({
      redirectUrl: "/",
    });
  });

  it("passes an uploaded / provider image to <UserAvatar /> when signed in", async () => {
    const imageUrl = "https://example.com/avatar.jpg";
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: "user-1",
        hasImage: true,
        imageUrl,
        fullName: "Jane Smith",
      },
    });
    render(<UserAvatarDropdown />);
    expect(screen.getByTestId("user-avatar")).toHaveAttribute(
      "data-image-url",
      imageUrl,
    );
  });

  it("Does not pass Clerk’s image URL when hasImage is false", () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: "user-1",
        hasImage: false,
        imageUrl: "https://example.com/avatar.jpg",
        fullName: "Jane Smith",
      },
    });
    render(<UserAvatarDropdown />);
    expect(screen.getByTestId("user-avatar")).not.toHaveAttribute(
      "data-image-url",
    );
  });

  it.each([
    {
      description: "uses fullName when available",
      expectedName: "Jane Smith",
      isSignedIn: true,
      user: {
        id: "user-1",
        hasImage: true,
        imageUrl: "https://example.com/avatar.jpg",
        fullName: "Jane Smith",
      },
    },
    {
      description: "uses username when fullName is not available",
      expectedName: "jane",
      isSignedIn: true,
      user: {
        id: "user-1",
        hasImage: true,
        imageUrl: "https://example.com/avatar.jpg",
        fullName: null,
        username: "jane",
      },
    },
    {
      description: 'uses "User" when username and fullName is not available',
      expectedName: "User",
      isSignedIn: true,
      user: {
        id: "user-1",
        hasImage: true,
        imageUrl: "https://example.com/avatar.jpg",
        fullName: null,
        username: null,
      },
    },
    {
      description: 'uses "Guest" when signed out',
      expectedName: "Guest",
      isSignedIn: false,
      user: null,
    },
  ])("$description", ({ isSignedIn, user, expectedName }) => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn,
      user,
    });
    render(<UserAvatarDropdown />);
    expect(screen.getByTestId("user-avatar")).toHaveAttribute(
      "data-name",
      expectedName,
    );
  });

  it("changes from provider image to guest fallback after logout", () => {
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: "user-1",
        fullName: "Jane Smith",
        username: "jane",
        hasImage: true,
        imageUrl: "https://example.com/avatar.jpg",
      },
    });

    const { rerender } = render(<UserAvatarDropdown />);

    const avatar = screen.getByTestId("user-avatar");

    expect(avatar).toHaveAttribute(
      "data-image-url",
      "https://example.com/avatar.jpg",
    );

    expect(avatar).toHaveAttribute("data-name", "Jane Smith");

    // Clerk state changes after logout
    mockUseUser.mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
      user: undefined,
    });

    rerender(<UserAvatarDropdown />);

    const guestAvatar = screen.getByTestId("user-avatar");

    expect(guestAvatar).toHaveAttribute("data-name", "Guest");

    expect(guestAvatar).not.toHaveAttribute("data-image-url");
  });
});
