import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "@heroui/use-theme";

vi.mock("@heroui/use-theme", (realImport) => ({ useTheme: function () { return ({ theme: "light", setTheme: vi.fn()})}}))

const mockedUseTheme = vi.mocked(useTheme)

describe("Test ThemeSwitcher", () => {

    it("renders correctly", () => {
        render(<ThemeSwitcher></ThemeSwitcher>)
        expect(screen.findByText(t => t.includes("The current theme is: ")))
    })

})