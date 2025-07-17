import { render, screen } from "@testing-library/react";
import App from "./App";
import { expect, test, vi } from "vitest";

// Mock the TodoView component
vi.mock("./views/TodoView", () => ({
  TodoView: () => <div>Mocked TodoView</div>,
}));

test("renders the App component", () => {
  render(<App />);
  expect(screen.getByText(/Mocked TodoView/i)).toBeInTheDocument();
});
