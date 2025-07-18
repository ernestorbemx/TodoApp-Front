import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DeleteTodo } from "./DeleteTodo";
import { Todo } from "../types";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { deleteTodo } from "../http/todo";

// Mocking the deleteTodo function
vi.mock("../http/todo", () => ({
  deleteTodo: vi.fn(() =>
    Promise.resolve({
      status: 200,
      data: {
        id: 1,
        text: "Finish the project report",
        done: false,
        priority: "high",
        creationDate: "2025-04-08T08:00:00Z",
        dueDate: "2025-04-10T17:00:00Z",
      },
    })
  ),
}));

const mockedDeleteTodo = vi.mocked(deleteTodo);

describe("test DeleteTodo component", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup(); // Initialize user event simulation
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  const todo: Todo = {
    id: 1,
    text: "Finish the project report",
    done: false,
    priority: "HIGH",
    creationDate: "2025-04-08T08:00:00Z",
    dueDate: "2025-04-10T17:00:00Z",
  };

  it("should render the delete button", () => {
    // Render the DeleteTodo component
    render(<DeleteTodo todo={todo} />);

    // Verify that the delete button renders correctly
    expect(screen.getByText("Delete")).toBeDefined();
  });

  it("should open the confirmation modal when the delete button is clicked", async () => {
    // Render the DeleteTodo component
    render(<DeleteTodo todo={todo} />);

    // Simulate clicking the delete button
    await user.click(screen.getByTestId("delete-button"));

    // Verify that the confirmation modal opens
    expect(
      screen.getByText((text) =>
        text.includes("Are you sure you want to delete")
      )
    ).toBeDefined();
  });

  it("should call deleteTodo when the confirm button is clicked", async () => {
    // Render the DeleteTodo component
    render(<DeleteTodo todo={todo} />);

    // Simulate opening the modal and confirming the deletion
    await user.click(screen.getByTestId("delete-button"));
    await user.click(screen.getByTestId("confirm-deletion-button"));

    // Verify that deleteTodo is called
    expect(mockedDeleteTodo).toBeCalledTimes(1);
  });

  it("should call onDelete after successful deletion", async () => {
    // Mock the onDelete callback
    const mockOnDelete = vi.fn();
    render(<DeleteTodo todo={todo} onDelete={mockOnDelete} />);

    // Simulate opening the modal and confirming the deletion
    await user.click(screen.getByTestId("delete-button"));
    await user.click(screen.getByTestId("confirm-deletion-button"));

    // Verify that onDelete is called after successful deletion
    expect(mockOnDelete).toBeCalledTimes(1);
  });

  it("should render a confirmation message before deletion", () => {
    // Render the DeleteTodo component
    render(<DeleteTodo todo={todo} />);

    // Simulate clicking the delete button
    fireEvent.click(screen.getByText("Delete"));

    // Verify that the confirmation message is displayed
    expect(
      screen.getByText(/Are you sure you want to delete the todo/i)
    ).toBeInTheDocument();
  });
});
