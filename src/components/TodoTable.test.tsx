import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect, vi, beforeEach } from "vitest";
import { TodoTable } from "./TodoTable";
import { Todo } from "../types";
import { changeStatus } from "../http/todo"
import userEvent, { UserEvent } from "@testing-library/user-event";
import { EditTodo } from "./EditTodo";
import { DeleteTodo } from "./DeleteTodo";

vi.mock("../http/todo", (original) => ({
    changeStatus: vi.fn(() => Promise.resolve({
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


vi.mock("./EditTodo", (original) => ({
    EditTodo: vi.fn(() => <p>Mocked EditTodo</p>)
}))


vi.mock("./DeleteTodo", (original) => ({
    DeleteTodo: vi.fn(() => <p>Mocked EditTodo</p>)
}))

describe('TodoTable test:', () => {
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });

    afterEach(() => {
        vi.clearAllMocks()
    })


    const todos: Todo[] = [
        {
            id: 1,
            text: 'Finish the project report',
            done: false,
            priority: 'HIGH',
            creationDate: '2025-04-08T08:00:00Z',
            dueDate: '2025-04-10T17:00:00Z'
        },
        {
            id: 2,
            text: 'Buy groceries',
            done: true,
            priority: 'MEDIUM',
            creationDate: '2025-04-07T09:00:00Z',
            completionDate: '2025-04-07T10:30:00Z'
        },
        {
            id: 3,
            text: 'Schedule doctor appointment',
            done: false,
            priority: 'LOW',
            creationDate: '2025-04-08T10:00:00Z',
            dueDate: '2025-04-15T09:00:00Z'
        },
        {
            id: 4,
            text: 'Clean the house',
            done: false,
            priority: 'MEDIUM',
            creationDate: '2025-04-06T15:00:00Z'
        },
        {
            id: 5,
            text: 'Complete coding challenge',
            done: true,
            priority: 'HIGH',
            creationDate: '2025-04-03T11:00:00Z',
            completionDate: '2025-04-05T16:00:00Z'
        }
    ];


    afterEach(cleanup);

    it('should render component', () => {
        render(<TodoTable data={[]} onUpdate={() => { }} onSortingChange={() => { }} />);
    });

    it('should render title', () => {
        render(<TodoTable data={[]} onUpdate={() => { }} onSortingChange={() => { }} />);
        expect(
            screen.getByText('Name')
        ).toBeDefined();
    });

    it('renders todos correctly', () => {
        render(<TodoTable data={todos} onUpdate={() => { }} onSortingChange={() => { }} />);
        todos.forEach(t => {
            expect(
                screen.getByText(t.text)
            ).toBeDefined();
        })
    });

    it('calls update status on table checkbox', async () => {
        const changeStatusMock = vi.mocked(changeStatus)
        const wrapper = render(<TodoTable data={todos} onUpdate={() => { }} onSortingChange={() => { }} />);

        const checkbox = await wrapper.findByTestId("todos-checkbox");
        const input = checkbox.querySelector('input')
        expect(input).toBeDefined()

        expect(input!.checked).toBe(false);
        await user.click(input!);
        // Wait for the state change to reflect in the UI
        expect(changeStatusMock).toHaveBeenCalledTimes(3);
    });

    it('calls EditTodo and DeleteTodo on render', () => {
        const MockedEditTodo = vi.mocked(EditTodo)
        const MockedDeleteTodo = vi.mocked(DeleteTodo)
        render(<TodoTable data={todos} onUpdate={() => { }} onSortingChange={() => { }} />);
        expect(MockedEditTodo).toBeCalledTimes(todos.length)
        expect(MockedDeleteTodo).toBeCalledTimes(todos.length)
    });

});
