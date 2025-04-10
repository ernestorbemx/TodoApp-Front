import { describe, expect, it } from "vitest";
import { dueDateBackground, formatTime } from ".";

describe("utils.ts", () => {

    describe("formatTime()", () => {
        it("should format time correctly", () => {
            expect(formatTime(60)).toBe("01:00")
            expect(formatTime(621)).toBe("10:21")
            expect(formatTime(59)).toBe("00:59")
        })
    })

    describe("dueDateBackground()", () => {
        it("should return background colors correspondingly", () => {
            expect(dueDateBackground()).toBe("bg-transparent dark:text-white")
            expect(dueDateBackground(new Date(Date.now()))).toBe("bg-red-200 dark:bg-red-400 dark:text-black") // less than or equal one week
            expect(dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))).toBe("bg-red-200 dark:bg-red-400 dark:text-black") // less than or equal one week
            expect(dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1))).toBe("bg-yellow-200 dark:bg-yellow-400 dark:text-black") // one week and less than or equal two weeks
            expect(dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2 - 1))).toBe("bg-yellow-200 dark:bg-yellow-400 dark:text-black") // one week and less than or equal two weeks
            expect(dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2 + 1))).toBe("bg-green-200 dark:bg-green-400 dark:text-black") // more than two weeks
            expect(dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 3))).toBe("bg-green-200 dark:bg-green-400 dark:text-black") // more than two weeks
        })
    })
})