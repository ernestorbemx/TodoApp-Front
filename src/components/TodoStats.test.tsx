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
      avg: 10,
      highPriorityAvg: 5,
      lowPriorityAvg: 15,
      mediumPriorityAvg: 20,
    };
    const { getByText } = render(<TodoStats data={stats} />);

    // Verify stats are displayed correctly
    expect(getByText(/00:10/)).toBeInTheDocument();
    expect(getByText(/00:05/)).toBeInTheDocument();
    expect(getByText(/00:15/)).toBeInTheDocument();
    expect(getByText(/00:20/)).toBeInTheDocument();
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
