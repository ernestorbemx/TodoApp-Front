import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeSwitcher } from "./ThemeSwitcher";

vi.mock("@heroui/use-theme", () => ({ useTheme: function () { return ({ theme: "light", setTheme: vi.fn()})}}))

describe("Test ThemeSwitcher", () => {

    it("renders correctly", () => {
        render(<ThemeSwitcher></ThemeSwitcher>)
        expect(screen.findByText(t => t.includes("The current theme is: ")))
    })

})