import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TodoForm } from "./TodoForm";
import { Modal } from "@heroui/modal";
import userEvent from "@testing-library/user-event";

describe("test TodoForm component", () => {
  it("should render", () => {
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={() => {}}
          onChange={() => {}}
        />
      </Modal>,
    );
    expect(wrapper.findByText("Test form")).toBeDefined();
  });

  it("should call onClose when button click", async () => {
    const onCloseFn = vi.fn(() => {});
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={onCloseFn}
          onChange={() => {}}
        />
      </Modal>,
    );

    expect(onCloseFn).toBeCalledTimes(0);
    expect(wrapper.findByTestId("todo-form-close")).toBeDefined();
    await userEvent.click(await wrapper.findByTestId("todo-form-close"));
    expect(onCloseFn).toBeCalledTimes(1);
  });

  it("should not call onChange when form is not correct", async () => {
    const onChangeFn = vi.fn(() => {});
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={() => {}}
          onChange={onChangeFn}
        />
      </Modal>,
    );

    expect(onChangeFn).toBeCalledTimes(0);
    expect(wrapper.findByTestId("todo-form-submit")).toBeDefined();
    await userEvent.click(await wrapper.findByTestId("todo-form-submit"));
    expect(onChangeFn).toBeCalledTimes(0);
  });

  it("should call onChange when form submit", async () => {
    const onChangeFn = vi.fn(() => {});
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={() => {}}
          onChange={onChangeFn}
        />
      </Modal>,
    );

    expect(onChangeFn).toBeCalledTimes(0);
    expect(wrapper.findByTestId("todo-form-submit")).toBeDefined();
    await userEvent.type(
      await wrapper.findByTestId("todo-form-text"),
      "Todo text",
    );
    const select = screen.getByTestId("todo-form-priority");
    await userEvent.click(select);
    const listbox = await wrapper.findByRole("listbox");
    expect(listbox).toBeDefined(); // select option list
    // Select item and check the correct ID is passed to the callback
    await userEvent.click(
      within(listbox).getByRole("option", { name: "High" }),
    );
    await userEvent.click(await wrapper.findByTestId("todo-form-submit"));
    expect(onChangeFn).toBeCalledTimes(1);
  });
});
