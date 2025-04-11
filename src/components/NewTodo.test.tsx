import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoFormSchema } from "./TodoForm";
import userEvent from "@testing-library/user-event";
import { createTodo } from "../http/todo";
import { parseDateTime } from "@internationalized/date";
import { NewTodo } from "./NewTodo";

vi.mock('./TodoForm', () => ({
    TodoForm: vi.fn(({ onChange }: { onChange: (todo: TodoFormSchema) => unknown }) => <><p>Mocked Todo Form</p><button onClick={() => onChange({
        text: 'Finish the project report',
        priority: 'HIGH',
        dueDate: parseDateTime('2025-04-10T17:00:00')
    })} >Click</button></>)
}))

vi.mock('../http/todo', () => ({
    createTodo: vi.fn(() => Promise.resolve({
        status: 200, data: {
            id: 1,
            text: 'Finish the project report',
            done: false,
            priority: 'high',
            creationDate: '2025-04-08T08:00:00Z',
            dueDate: '2025-04-10T17:00:00Z'
        }
    }))
}))

const mockedCreateTodo = vi.mocked(createTodo)


describe("test NewTodo component", () => {

    afterEach(() => {
        vi.clearAllMocks();
    })

    it("should render", () => {
        const wrapper = render(
            <NewTodo onNew={() => {}} />
        )
        expect(wrapper.findByText("New To-do")).toBeDefined()
    })

    it("should render TodoForm when button click", async () => {
        const wrapper = render(
            <NewTodo onNew={() => {}} />
        )
        await userEvent.click(await wrapper.findByTestId("create-todo-button"))
        expect(wrapper.findByText("Mocked Todo form")).toBeDefined()
    })

    it("should call createTodo when submit form click", async () => {
        const wrapper = render(
            <NewTodo onNew={() => {}} />
        )
        await userEvent.click(await wrapper.findByTestId("create-todo-button"))
        await userEvent.click(await wrapper.findByText("Click"))
        expect(mockedCreateTodo).toBeCalledTimes(1)
    })

    it("should call onEdit", async () => {
        const onNewFn = vi.fn()
        const wrapper = render(
            <NewTodo onNew={onNewFn} />
        )
        await userEvent.click(await wrapper.findByTestId("create-todo-button"))
        await userEvent.click(await wrapper.findByText("Click"))
        expect(mockedCreateTodo).toBeCalledTimes(1)
        expect(onNewFn).toBeCalledTimes(1)
    })




})