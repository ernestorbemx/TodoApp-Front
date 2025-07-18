import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Stats } from "../types";
import { TodoStats } from "./TodoStats";
import { formatTime } from "../utils";

// Mocking utility functions
vi.mock("../utils", { spy: true });

describe("TodoStats component tests", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  const emptyStats: Stats = {
    avg: -1,
    highPriorityAvg: -1,
    lowPriorityAvg: -1,
    mediumPriorityAvg: -1,
  };

  it("should render the component", () => {
    render(<TodoStats data={emptyStats} />);
    expect(
      screen.getByText((text) => text.includes("Average time to complete by"))
    ).toBeDefined(); // Verify the component renders correctly
  });

  it("should display 'No stats at the moment' when data is undefined", () => {
    render(<TodoStats data={undefined} />);
    expect(screen.getByText("No stats at the moment")).toBeDefined(); // Verify fallback message
  });

  it.skip("should call formatTime four times when data is all set", () => {
    render(
      <TodoStats
        data={{
          avg: 50,
          highPriorityAvg: 30,
          lowPriorityAvg: 40,
          mediumPriorityAvg: 20,
        }}
      />
    );
    expect(formatTime).toHaveBeenCalledTimes(3);
  });

  it("should display the correct stats", () => {
    const stats: Stats = {
      avg: 90061, // 1d 1h 1m 1s
      highPriorityAvg: 3662, // 1h 1m 2s
      lowPriorityAvg: 63, // 1m 3s
      mediumPriorityAvg: 9, // 9s
    };
    const { getByText } = render(<TodoStats data={stats} />);

    // Verify stats are displayed correctly
    expect(getByText(/1d 1h 1m 1s/)).toBeInTheDocument();
    expect(getByText(/1h 1m 2s/)).toBeInTheDocument();
    expect(getByText(/1m 3s/)).toBeInTheDocument();
    expect(getByText(/9s/)).toBeInTheDocument();
  });

  it("should render a 'No enough info available' when avg are -1", () => {
    const stats: Stats = {
      avg: -1,
      highPriorityAvg: -1,
      lowPriorityAvg: -1,
      mediumPriorityAvg: -1,
    };
    const { getAllByText } = render(<TodoStats data={stats} />);

    expect(getAllByText(/No enough info available/i)).toHaveLength(4);
  });
});
