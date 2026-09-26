import { describe, expect, it, vi } from "vitest";
import { render} from "@testing-library/react";
import Header from "@/components/layout/Header";

vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => true,
}));

describe("Header", () => {
  it("renders the component with text", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Celeb")).toBeInTheDocument();
  });

  it("renders the component with search input", () => {
    const { getByPlaceholderText } = render(<Header />);
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders the component with search button", () => {
    const { getByRole } = render(<Header />);
    expect(getByRole("button", { name: /^search/i })).toBeInTheDocument();
  });

  it("has a logo link on click of which user will land on home page", () => {
    const { getByText } = render(<Header />);
    const logoLink = getByText("Celeb").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
