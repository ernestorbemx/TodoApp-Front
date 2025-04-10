import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SortField } from "./SortField";


describe("test SortField component", () => {

    it("should render", () => {
        render(<SortField onChange={()=>{}} ascending>Example field</SortField>)
        expect(
            screen.getByTestId("sort-field")
        ).toBeDefined()
        expect(
            screen.getByText("Example field")
        ).toBeDefined()
    })

    it("should fire when changing", () => {
        const onChangeCb = vi.fn()
        render(<SortField onChange={onChangeCb} ascending>Example field</SortField>)
        expect(
            screen.getByTestId("sort-field")
        ).toBeDefined()
        expect(onChangeCb).toBeCalledTimes(0)
        fireEvent.click(screen.getByTestId("sort-field"))
        expect(onChangeCb).toBeCalledWith(false)
        expect(onChangeCb).toBeCalledTimes(1)
        fireEvent.click(screen.getByTestId("sort-field"))
        expect(onChangeCb).toBeCalledWith(true)
        expect(onChangeCb).toBeCalledTimes(2)
    })

    it("should fire when changing (not ascending)", () => {
        const onChangeCb = vi.fn()
        render(<SortField onChange={onChangeCb} ascending={false}>Example field</SortField>)
        expect(
            screen.getByTestId("sort-field")
        ).toBeDefined()
        expect(onChangeCb).toBeCalledTimes(0)
        fireEvent.click(screen.getByTestId("sort-field"))
        expect(onChangeCb).toBeCalledWith(true)
        expect(onChangeCb).toBeCalledTimes(1)
        fireEvent.click(screen.getByTestId("sort-field"))
        expect(onChangeCb).toBeCalledWith(false)
        expect(onChangeCb).toBeCalledTimes(2)
    })
})