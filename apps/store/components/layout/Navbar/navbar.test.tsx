import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navbar from "@/components/layout/Navbar";

vi.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: () => true,
}));

describe("Navbar", () => {
  it("renders the text inside the component", () => {
    render(<Navbar />);
    expect(screen.getByText("Categories")).toBeInTheDocument();
  });
});
