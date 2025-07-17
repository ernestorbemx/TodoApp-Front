import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TodoView } from "./TodoView";
import { PaginationResult, Stats, Todo } from "../types";

vi.mock("../http/todo", () => {
  return {
    getTodos: vi.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          data: [
            { id: 1, text: "Todo 1", done: false },
            { id: 2, text: "Todo 2", done: true },
          ],
          availablePages: 1,
        } as PaginationResult<Todo>,
      })
    ),
    getSTats: vi.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          avg: 20,
          highPriorityAvg: 10,
          lowPriorityAvg: 20,
          mediumPriorityAvg: 30,
        } as Stats,
      })
    ),
  };
});

vi.mock("../components/ThemeSwitcher", () => {
  return {
    ThemeSwitcher: () => <p>Mocked Theme Switcher</p>,
  };
});

describe("Test TodoView component", () => {
  it("renders ", async () => {
    render(<TodoView />);
    expect(screen.findAllByText((t) => t.includes("by Ernesto Ramirez")));
  });

  it("renders and fetches todos", async () => {
    render(<TodoView />);
    await waitFor(() => {
      expect(screen.getByText("Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Todo 2")).toBeInTheDocument();
    });
  });

  it("renders stats correctly", async () => {
    render(<TodoView />);
    await waitFor(() => {
      expect(screen.getAllByText(/Average time to complete/i)).toHaveLength(2);
    });
  });
});
