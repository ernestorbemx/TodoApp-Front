// 'use client'; // uncomment this line if you're using Next.js App Directory Setup

// components/ThemeSwitcher.tsx
import { Button } from "@heroui/button";
import { useTheme } from "@heroui/use-theme";
import { Moon, Sun } from "lucide-react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div>
            <span className="hidden">
                The current theme is: {theme}
            </span>
            <Button onPress={() => setTheme(theme == "dark" ? 'light' : "dark")}>{theme == "light" ? <Moon /> : <Sun />} </Button>
        </div>
    )
};