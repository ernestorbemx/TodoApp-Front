import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SortField } from "./SortField";

describe("test SortField component", () => {
  it("should render", () => {
    // Render the SortField component
    render(
      <SortField onChange={() => {}} ascending>
        Example field
      </SortField>
    );

    // Verify that the component renders correctly
    expect(screen.getByTestId("sort-field")).toBeDefined();
    expect(screen.getByText("Example field")).toBeDefined();
  });

  it("should fire when changing", () => {
    // Mock the onChange callback
    const onChangeCb = vi.fn();
    render(
      <SortField onChange={onChangeCb} ascending>
        Example field
      </SortField>
    );

    // Verify that the onChange callback is triggered when the button is clicked
    const button = screen.getByTestId("sort-field");
    expect(button).toBeDefined();
    expect(onChangeCb).toBeCalledTimes(0);
    fireEvent.click(button); // Simulate button click
    expect(onChangeCb).toBeCalledWith(false); // Verify callback with new sorting order
    expect(onChangeCb).toBeCalledTimes(1);
    fireEvent.click(button); // Simulate button click
    expect(onChangeCb).toBeCalledWith(true); // Verify callback with new sorting order
    expect(onChangeCb).toBeCalledTimes(2);
  });

  it("should fire when changing (not ascending)", () => {
    // Mock the onChange callback
    const onChangeCb = vi.fn();
    render(
      <SortField onChange={onChangeCb} ascending={false}>
        Example field
      </SortField>
    );

    // Verify that the onChange callback is triggered when the button is clicked
    const button = screen.getByTestId("sort-field");
    expect(button).toBeDefined();
    expect(onChangeCb).toBeCalledTimes(0);
    fireEvent.click(button); // Simulate button click
    expect(onChangeCb).toBeCalledWith(true); // Verify callback with new sorting order
    expect(onChangeCb).toBeCalledTimes(1);
    fireEvent.click(button); // Simulate button click
    expect(onChangeCb).toBeCalledWith(false); // Verify callback with new sorting order
    expect(onChangeCb).toBeCalledTimes(2);
  });
});
