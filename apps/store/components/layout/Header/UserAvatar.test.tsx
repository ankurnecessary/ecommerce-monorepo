import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserAvatar from "./UserAvatar";

describe("UserAvatar", () => {
  it("Renders the avatar container", () => {
    const { container } = render(<UserAvatar />);

    expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
  });

  it("Renders avatar's fallback when imageUrl is not provided", () => {
    const { container } = render(<UserAvatar />);

    expect(
      container.querySelector('[data-slot="avatar-fallback"]'),
    ).toBeInTheDocument();
  });

  it("Renders AvatarImage when imageUrl is provided", async () => {
    const imageUrl =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    render(<UserAvatar imageUrl={imageUrl} />);
    const image = await screen.findByRole("img", {
      name: "User's profile picture",
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", imageUrl);
  });

  it("Uses default name when name is not provided", () => {
    render(<UserAvatar />);
    const textElement = screen.getByText(`User's default profile picture`);
    expect(textElement).toBeInTheDocument();
  });

  it("Uses supplied name even when imageUrl is  not provided", () => {
    const name = "John";
    render(<UserAvatar name={name} />);
    const textElement = screen.getByText(`${name}'s default profile picture`);
    expect(textElement).toBeInTheDocument();
  });

  it("Uses the supplied name in the image alternative text", async () => {
    const imageUrl =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    const name = "John";
    render(<UserAvatar imageUrl={imageUrl} name={name} />);
    const image = await screen.findByRole("img", {
      name: `${name}'s profile picture`,
    });
    expect(image).toBeInTheDocument();
  });

  it("Handles a null image URL", () => {
    const imageUrl = null;
    const { container } = render(<UserAvatar imageUrl={imageUrl} />);
    expect(
      container.querySelector('[data-slot="avatar-fallback"]'),
    ).toBeInTheDocument();
  });

  it("Handles blank string as image URL", () => {
    const imageUrl = "";
    const { container } = render(<UserAvatar imageUrl={imageUrl} />);
    expect(
      container.querySelector('[data-slot="avatar-fallback"]'),
    ).toBeInTheDocument();
  });

  it("Renders the fallback icon", () => {
    const { container } = render(<UserAvatar />);

    const fallback = container.querySelector("[data-slot='avatar-fallback']");
    expect(fallback).toBeInTheDocument();

    const icon = fallback.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("Visually hides the fallback accessibility text", () => {
    const { getByText } = render(<UserAvatar name="Jane Smith" />);

    const fallbackText = getByText("Jane Smith's default profile picture");

    expect(fallbackText).toBeInTheDocument();
    expect(fallbackText).toHaveClass("sr-only");
  });

  it("displays fallback content when the image fails to load", async () => {
  let reportImageFailure!: () => void;

  const imageFailed = new Promise<void>((resolve) => {
    reportImageFailure = resolve;
  });

  class FailingImage extends EventTarget {
    complete = false;
    naturalWidth = 0;

    private imageSrc = "";

    get src() {
      return this.imageSrc;
    }

    set src(value: string) {
      this.imageSrc = value;

      // Run asynchronously so Radix has time to register its listener.
      queueMicrotask(() => {
        this.dispatchEvent(new Event("error"));
        reportImageFailure();
      });
    }
  }

  vi.stubGlobal("Image", FailingImage);

  const { container } = render(
    <UserAvatar imageUrl="https://example.com/broken-avatar.jpg" />,
  );

  // Confirm that the controlled image failure occurred.
  await imageFailed;

  await waitFor(() => {
    expect(
      container.querySelector('[data-slot="avatar-fallback"]'),
    ).toBeInTheDocument();

    expect(
      container.querySelector('[data-slot="avatar-image"]'),
    ).not.toBeInTheDocument();
  });
});
});
