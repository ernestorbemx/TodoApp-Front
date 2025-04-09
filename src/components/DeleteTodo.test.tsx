import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DeleteTodo } from "./DeleteTodo";
import { Todo } from "../types";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { deleteTodo } from "../http/todo";

vi.mock("../http/todo", (original) => ({
    deleteTodo: vi.fn(() => Promise.resolve({
        status: 200,
        data: {
            id: 1,
            text: 'Finish the project report',
            done: false,
            priority: 'high',
            creationDate: '2025-04-08T08:00:00Z',
            dueDate: '2025-04-10T17:00:00Z'
        },
    }))
}))

const mockedDeleteTodo = vi.mocked(deleteTodo)


describe("test DeleteTodo component", () => {

    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });

    afterEach(() => {
        vi.clearAllMocks();
    })

    const todo: Todo = {
        id: 1,
        text: 'Finish the project report',
        done: false,
        priority: 'HIGH',
        creationDate: '2025-04-08T08:00:00Z',
        dueDate: '2025-04-10T17:00:00Z'
    };

    it("should render", () => {
        render(<DeleteTodo todo={todo} />)
        expect(
            screen.getByText("Delete")
        ).toBeDefined()
    
    })

    it("should open modal", async () => {
        render(<DeleteTodo todo={todo} />)
        await user.click(
            screen.getByTestId("delete-button")
        )
        expect(
            screen.getByText((t) => t.includes("Are you sure of deleting"))
        ).toBeDefined()
    })


    it("should call deleteTodo", async () => {
        render(<DeleteTodo todo={todo} />)
        await user.click(
            screen.getByTestId("delete-button")
        )
        expect(
            screen.getByText((t) => t.includes("Are you sure of deleting"))
        ).toBeDefined()
        
        await user.click(
            screen.getByTestId("confirm-deletion-button")
        )
        expect(mockedDeleteTodo).toHaveBeenCalledTimes(1)
    })

})