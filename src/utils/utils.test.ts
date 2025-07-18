import { describe, expect, it } from "vitest";
import { dueDateBackground, formatTime, formatTodoColumns } from ".";
import { Todo } from "../types";

describe("utils.ts", () => {
  /**
   * Tests the `formatTime` function to ensure it formats time correctly.
   */
  describe("formatTime()", () => {
    it("should format time correctly", () => {
      expect(formatTime(60)).toBe("1m 0s");
      expect(formatTime(621)).toBe("10m 21s");
      expect(formatTime(59)).toBe("59s");
      expect(formatTime(3662)).toBe("1h 1m 2s");
      expect(formatTime(90061)).toBe("1d 1h 1m 1s");
      expect(formatTime(0)).toBe("0s");
    });
  });

  /**
   * Tests the `dueDateBackground` function to ensure it returns the correct background colors.
   */
  describe("dueDateBackground()", () => {
    it("should return background colors correspondingly", () => {
      expect(dueDateBackground()).toBe("bg-transparent dark:text-white");
      expect(dueDateBackground(new Date(Date.now()))).toBe(
        "bg-red-200 dark:bg-red-400 dark:text-black"
      ); // less than or equal one week
      expect(
        dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7))
      ).toBe("bg-red-200 dark:bg-red-400 dark:text-black"); // less than or equal one week
      expect(
        dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 + 1))
      ).toBe("bg-yellow-200 dark:bg-yellow-400 dark:text-black"); // one week and less than or equal two weeks
      expect(
        dueDateBackground(
          new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2 - 1)
        )
      ).toBe("bg-yellow-200 dark:bg-yellow-400 dark:text-black"); // one week and less than or equal two weeks
      expect(
        dueDateBackground(
          new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2 + 1)
        )
      ).toBe("bg-green-200 dark:bg-green-400 dark:text-black"); // more than two weeks
      expect(
        dueDateBackground(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 3))
      ).toBe("bg-green-200 dark:bg-green-400 dark:text-black"); // more than two weeks
    });
  });

  /**
   * Tests the `formatTodoColumns` function to ensure it formats todo columns correctly.
   */
  describe("formatTodoColumns()", () => {
    it("should format todo columns correctly", () => {
      const todoWithoutDueDate: Partial<Todo> = {};
      expect(formatTodoColumns(todoWithoutDueDate)).toEqual({
        bgColor: "bg-transparent dark:text-white",
        dueDate: "",
        dueDateRelative: "",
      });

      const todoWithDueDateToday = {
        dueDate: new Date(Date.now()).toISOString(),
      };
      expect(formatTodoColumns(todoWithDueDateToday)).toEqual({
        bgColor: "bg-red-200 dark:bg-red-400 dark:text-black",
        dueDate: expect.any(String), // formatted date string
        dueDateRelative: expect.stringContaining("ago"), // relative time string
      });

      const todoWithDueDateInTwoWeeks = {
        dueDate: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7 * 2
        ).toISOString(),
      };
      expect(formatTodoColumns(todoWithDueDateInTwoWeeks)).toEqual({
        bgColor: "bg-yellow-200 dark:bg-yellow-400 dark:text-black",
        dueDate: expect.any(String),
        dueDateRelative: expect.stringContaining("in"),
      });
    });
  });
});
