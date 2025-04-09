import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TodoFilters } from "./TodoFilters";
import userEvent, { UserEvent } from '@testing-library/user-event'


describe("test TodoFilters component", () => {

    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });


    it("should render", () => {
        render(<TodoFilters onChange={() => { }} searching={false} />)
        expect(
            screen.getByText("Text")
        ).toBeDefined()
        expect(
            screen.getByText("Priority")
        ).toBeDefined()
        expect(
            screen.getByText("State")
        ).toBeDefined()
        expect(
            screen.getByText("Search")
        ).toBeDefined()
    })

    it("should fire when changing", () => {
        const onChangeCb = vi.fn()
        render(<TodoFilters onChange={onChangeCb} searching={false} />)
        const button = screen.getByTestId("filters-button")
        expect(button).toBeDefined()
        expect(onChangeCb).toHaveBeenCalledTimes(0)
        fireEvent.click(button)
        expect(onChangeCb).toHaveBeenCalledTimes(1)
        // const select = screen.getByTestId("priority-filter")
        // expect(
        //     select
        // ).toBeDefined()
        // expect(onChangeCb).toBeCalledTimes(0)
        // fireEvent.click(screen.getByTestId("priority-filter"))
        // expect(onChangeCb).toBeCalledTimes(1)
        // fireEvent.click(screen.getByTestId("priority-filter"))
        // expect(onChangeCb).toBeCalledTimes(2)
    })

    it("should send values when changing", async () => {
        const onChangeCb = vi.fn()
        const wrapper = render(<TodoFilters onChange={onChangeCb} searching={false} />)
        const button = screen.getByTestId("filters-button")
        expect(button).toBeDefined()
        expect(onChangeCb).toHaveBeenCalledTimes(0)
        fireEvent.click(button)
        expect(onChangeCb).toHaveBeenCalledTimes(1)

        const textInput = screen.getByTestId("text-filter")
        expect(textInput).toBeDefined()
        fireEvent.change(textInput, { target: { value: 'Hola' } })
        fireEvent.click(button)
        expect(onChangeCb).toBeCalledWith({ text: 'Hola' })
        expect(onChangeCb).toBeCalledTimes(2)
        // ------
        // Priority filter
        // ------
        let select = screen.getByTestId("priority-filter")
        expect(
            select
        ).toBeDefined()

        // open the select listbox by clicking selector button in the priority select
        await user.click(select);
        expect(select).toHaveAttribute("aria-expanded", "true");

        let listbox = wrapper.getByRole("listbox");
        expect(listbox).toBeDefined() // select option list
        // Select item and check the correct ID is passed to the callback
        await userEvent.click(within(listbox).getByRole("option", { name: "High" }))
        await user.click(select); // close the select listbox
        expect(() => wrapper.getByRole("listbox")).toThrow() // not found
        // Fire filter change event
        fireEvent.click(button)
        expect(onChangeCb).toBeCalledTimes(3)
        const thirdCallArgs = onChangeCb.mock.calls[2];
        expect(thirdCallArgs).toEqual([{ priority: "HIGH", text: "Hola" }])
        // ------
        // Status filter
        // ------
        select = screen.getByTestId("status-filter")
        expect(
            select
        ).toBeDefined()

        // open the select listbox by clicking selector button in the status select
        await user.click(select);
        expect(select).toHaveAttribute("aria-expanded", "true"); // check that is open

        listbox = wrapper.getByRole("listbox");
        expect(listbox).toBeDefined() // select option list
        // Select item and check the correct ID is passed to the callback
        await userEvent.click(within(listbox).getByRole("option", { name: "Done" }))
        await user.click(select); // close the select listbox
        expect(() => wrapper.getByRole("listbox")).toThrow() // not found
        // Fire filter change event
        fireEvent.click(button)
        expect(onChangeCb).toBeCalledTimes(4)
        const fourthCallArgs = onChangeCb.mock.calls[3];
        expect(fourthCallArgs).toEqual([{ priority: "HIGH", text: "Hola", done: "true" }])

    })


})