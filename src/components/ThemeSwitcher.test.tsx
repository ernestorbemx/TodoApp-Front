import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeSwitcher } from "./ThemeSwitcher";

// Mocking the useTheme hook to control the theme state
vi.mock("@heroui/use-theme", () => ({
  useTheme: function () {
    return { theme: "light", setTheme: vi.fn() }; // Mocked theme state and setter
  },
}));

describe("Test ThemeSwitcher", () => {
  it("renders correctly", () => {
    // Render the ThemeSwitcher component
    render(<ThemeSwitcher></ThemeSwitcher>);

    // Verify that the component renders the theme text
    expect(screen.findByText((t) => t.includes("The current theme is: ")));
  });
});
