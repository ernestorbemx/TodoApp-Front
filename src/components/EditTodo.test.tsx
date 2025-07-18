import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoFormSchema } from "./TodoForm";
import userEvent from "@testing-library/user-event";
import { EditTodo } from "./EditTodo";
import { Todo } from "../types";
import { editTodo } from "../http/todo";
import { parseDateTime } from "@internationalized/date";

// Mocking the TodoForm component
vi.mock("./TodoForm", () => ({
  TodoForm: vi.fn(
    ({ onChange }: { onChange: (todo: TodoFormSchema) => unknown }) => (
      <>
        <p>Mocked Todo Form</p>
        <button
          onClick={() =>
            onChange({
              text: "Finish the project report",
              priority: "HIGH",
              dueDate: parseDateTime("2025-04-10T17:00:00"),
            })
          }
        >
          Click
        </button>
      </>
    )
  ),
}));

// Mocking the editTodo function
vi.mock("../http/todo", () => ({
  editTodo: vi.fn(() =>
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

const mockedEditTodo = vi.mocked(editTodo);

describe("test EditTodo component", () => {
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

  it("should render the edit button", () => {
    // Render the EditTodo component
    const wrapper = render(<EditTodo todo={todo} />);

    // Verify that the edit button renders correctly
    expect(wrapper.findByText("Edit")).toBeDefined();
  });

  it("should render TodoForm when the edit button is clicked", async () => {
    // Render the EditTodo component
    const wrapper = render(<EditTodo todo={todo} />);

    // Simulate clicking the edit button
    await userEvent.click(await wrapper.findByTestId("edit-todo-button"));

    // Verify that the TodoForm renders
    expect(wrapper.findByText("Mocked Todo Form")).toBeDefined();
  });

  it("should call editTodo when the form is submitted", async () => {
    // Render the EditTodo component
    const wrapper = render(<EditTodo todo={todo} />);

    // Simulate opening the modal and submitting the form
    await userEvent.click(await wrapper.findByTestId("edit-todo-button"));
    await userEvent.click(await wrapper.findByText("Click"));

    // Verify that editTodo is called
    expect(mockedEditTodo).toBeCalledTimes(1);
  });

  it("should call onEdit after successful edit", async () => {
    // Mock the onEdit callback
    const onEditFn = vi.fn();
    const wrapper = render(<EditTodo todo={todo} onEdit={onEditFn} />);

    // Simulate opening the modal and submitting the form
    await userEvent.click(await wrapper.findByTestId("edit-todo-button"));
    await userEvent.click(await wrapper.findByText("Click"));

    // Verify that onEdit is called after successful edit
    expect(mockedEditTodo).toBeCalledTimes(1);
    expect(onEditFn).toBeCalledTimes(1);
  });

  it("should call onSave with updated todo details", async () => {
    const mockOnEdit = vi.fn();
    const { getByText, findByTestId } = render(
      <EditTodo
        todo={{ text: "Old Todo", priority: "LOW", id: 123, done: false }}
        onEdit={mockOnEdit}
      />
    );
    await userEvent.click(await findByTestId("edit-todo-button"));
    await userEvent.click(getByText("Click"));

    expect(mockOnEdit).toHaveBeenCalledWith({
      id: 1,
      text: "Finish the project report",
      done: false,
      priority: "high",
      creationDate: "2025-04-08T08:00:00Z",
      dueDate: "2025-04-10T17:00:00Z",
    });
  });
});
