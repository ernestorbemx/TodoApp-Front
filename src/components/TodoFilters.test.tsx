import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoFilters } from "./TodoFilters";
import userEvent, { UserEvent } from "@testing-library/user-event";

describe("test TodoFilters component", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // Test to verify the component renders correctly with all expected elements
  it("should render", () => {
    render(<TodoFilters onChange={() => {}} searching={false} />);
    expect(screen.getByText("Text")).toBeDefined();
    expect(screen.getByText("Priority")).toBeDefined();
    expect(screen.getByText("State")).toBeDefined();
    expect(screen.getByText("Search")).toBeDefined();
  });

  // Test to verify the onChange callback is triggered when the search button is clicked
  it("should fire when changing", () => {
    const onChangeCb = vi.fn();
    render(<TodoFilters onChange={onChangeCb} searching={false} />);
    const button = screen.getByTestId("filters-button");
    expect(button).toBeDefined();
    expect(onChangeCb).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(onChangeCb).toHaveBeenCalledTimes(1);
  });

  // Test to verify the correct values are sent to the onChange callback when filters are applied
  it("should send values when changing", async () => {
    const onChangeCb = vi.fn();
    const wrapper = render(
      <TodoFilters onChange={onChangeCb} searching={false} />
    );
    const button = screen.getByTestId("filters-button");
    expect(button).toBeDefined();
    expect(onChangeCb).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(onChangeCb).toHaveBeenCalledTimes(1);

    // Test text filter
    const textInput = screen.getByTestId("text-filter");
    expect(textInput).toBeDefined();
    fireEvent.change(textInput, { target: { value: "Hola" } });
    fireEvent.click(button);
    expect(onChangeCb).toBeCalledWith({ text: "Hola" });
    expect(onChangeCb).toBeCalledTimes(2);

    // Test priority filter
    let select = screen.getByTestId("priority-filter");
    expect(select).toBeDefined();
    await user.click(select); // Open priority dropdown
    expect(select).toHaveAttribute("aria-expanded", "true");
    let listbox = wrapper.getByRole("listbox");
    expect(listbox).toBeDefined();
    await userEvent.click(
      within(listbox).getByRole("option", { name: "High" })
    );
    await user.click(select); // Close priority dropdown
    expect(() => wrapper.getByRole("listbox")).toThrow();
    fireEvent.click(button);
    expect(onChangeCb).toBeCalledTimes(3);
    const thirdCallArgs = onChangeCb.mock.calls[2];
    expect(thirdCallArgs).toEqual([{ priority: "HIGH", text: "Hola" }]);

    // Test status filter
    select = screen.getByTestId("status-filter");
    expect(select).toBeDefined();
    await user.click(select); // Open status dropdown
    expect(select).toHaveAttribute("aria-expanded", "true");
    listbox = wrapper.getByRole("listbox");
    expect(listbox).toBeDefined();
    await userEvent.click(
      within(listbox).getByRole("option", { name: "Done" })
    );
    await user.click(select); // Close status dropdown
    expect(() => wrapper.getByRole("listbox")).toThrow();
    fireEvent.click(button);
    expect(onChangeCb).toBeCalledTimes(4);
    const fourthCallArgs = onChangeCb.mock.calls[3];
    expect(fourthCallArgs).toEqual([
      { priority: "HIGH", text: "Hola", done: "true" },
    ]);
  });

  // Test to verify the reset button clears all filters and triggers onChange with an empty filter
  it("reset button clears filters and calls onChange with empty filter", async () => {
    const mockOnChange = vi.fn();
    const { getByTestId, getByRole } = render(
      <TodoFilters onChange={mockOnChange} searching={false} />
    );

    const select = screen.getByTestId("priority-filter");
    const textFilter = getByTestId("text-filter");
    expect(select).toBeDefined();

    // Simulate setting filters
    await user.click(select);
    expect(select).toHaveAttribute("aria-expanded", "true");
    const listbox = getByRole("listbox");
    await userEvent.click(
      within(listbox).getByRole("option", { name: "High" })
    );
    await userEvent.type(textFilter, "test");
    expect(textFilter).toHaveValue("test");

    // Click reset button
    fireEvent.click(getByTestId("reset-filters-button"));

    // Verify filters are cleared
    expect(textFilter).toHaveValue("");
    expect(mockOnChange).toHaveBeenCalledWith({});
  });
});
