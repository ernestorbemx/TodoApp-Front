import { describe, expect, it } from "vitest";
import { formatTime } from ".";

describe("utils.ts", () => {

    it("should format time correctly", () => {
        expect(formatTime(60)).toBe("01:00")
        expect(formatTime(621)).toBe("10:21")
        expect(formatTime(59)).toBe("00:59")
    })
})