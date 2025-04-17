import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoFormSchema } from "./TodoForm";
import userEvent from "@testing-library/user-event";
import { EditTodo } from "./EditTodo";
import { Todo } from "../types";
import { editTodo } from "../http/todo";
import { parseDateTime } from "@internationalized/date";

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
    ),
  ),
}));

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
    }),
  ),
}));

const mockedEditTodo = vi.mocked(editTodo);

describe("test EditTodo component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const todo: Todo = {
    id: 1,
    text: "Finish the project report",
    done: false,
    priority: "HIGH",
    creationDate: "2025-04-08T08:00:00Z",
    dueDate: "2025-04-10T17:00:00Z",
  };

  it("should render", () => {
    const wrapper = render(<EditTodo todo={todo} />);
    expect(wrapper.findByText("Edit")).toBeDefined();
  });

  it("should call render TodoForm when button click", async () => {
    const wrapper = render(<EditTodo todo={todo} />);
    await userEvent.click(await wrapper.findByTestId("edit-todo-button"));
    expect(wrapper.findByText("Mocked Todo form")).toBeDefined();
  });

  it("should call editTodo when submit form click", async () => {
    const wrapper = render(<EditTodo todo={todo} />);
    await userEvent.click(await wrapper.findByTestId("edit-todo-button"));
    await userEvent.click(await wrapper.findByText("Click"));
    expect(mockedEditTodo).toBeCalledTimes(1);
  });

  it("should call onEdit", async () => {
    const onEditFn = vi.fn();
    const wrapper = render(<EditTodo todo={todo} onEdit={onEditFn} />);
    await userEvent.click(await wrapper.findByTestId("edit-todo-button"));
    await userEvent.click(await wrapper.findByText("Click"));
    expect(mockedEditTodo).toBeCalledTimes(1);
    expect(onEditFn).toBeCalledTimes(1);
  });
});
