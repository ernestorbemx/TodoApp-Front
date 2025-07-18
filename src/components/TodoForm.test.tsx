import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TodoForm } from "./TodoForm";
import { Modal } from "@heroui/modal";
import userEvent from "@testing-library/user-event";

describe("test TodoForm component", () => {
  it("should render", () => {
    // Render the TodoForm inside a modal
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={() => {}}
          onChange={() => {}}
        />
      </Modal>
    );

    // Verify that the form renders with the correct label
    expect(wrapper.findByText("Test form")).toBeDefined();
  });

  it("should call onClose when button click", async () => {
    // Mock the onClose callback
    const onCloseFn = vi.fn(() => {});
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={onCloseFn}
          onChange={() => {}}
        />
      </Modal>
    );

    // Verify that the close button triggers the onClose callback
    expect(onCloseFn).toBeCalledTimes(0);
    expect(wrapper.findByTestId("todo-form-close")).toBeDefined();
    await userEvent.click(await wrapper.findByTestId("todo-form-close"));
    expect(onCloseFn).toBeCalledTimes(1);
  });

  it("should not call onChange when form is not correct", async () => {
    // Mock the onChange callback
    const onChangeFn = vi.fn(() => {});
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={() => {}}
          onChange={onChangeFn}
        />
      </Modal>
    );

    // Verify that onChange is not called when the form is invalid
    expect(onChangeFn).toBeCalledTimes(0);
    expect(wrapper.findByTestId("todo-form-submit")).toBeDefined();
    await userEvent.click(await wrapper.findByTestId("todo-form-submit"));
    expect(onChangeFn).toBeCalledTimes(0);
  });

  it("should call onChange when form submit", async () => {
    // Mock the onChange callback
    const onChangeFn = vi.fn(() => {});
    const wrapper = render(
      <Modal isOpen>
        <TodoForm
          label="Test form"
          loading={false}
          onClose={() => {}}
          onChange={onChangeFn}
        />
      </Modal>
    );

    // Simulate filling out the form and submitting it
    expect(onChangeFn).toBeCalledTimes(0);
    expect(wrapper.findByTestId("todo-form-submit")).toBeDefined();
    await userEvent.type(
      await wrapper.findByTestId("todo-form-text"),
      "Todo text"
    );
    const select = screen.getByTestId("todo-form-priority");
    await userEvent.click(select);
    const listbox = await wrapper.findByRole("listbox");
    expect(listbox).toBeDefined(); // Verify the dropdown opens
    await userEvent.click(
      within(listbox).getByRole("option", { name: "High" })
    ); // Select "High" priority
    await userEvent.click(await wrapper.findByTestId("todo-form-submit")); // Submit the form

    // Verify that onChange is called after form submission
    expect(onChangeFn).toBeCalledTimes(1);
  });
});
