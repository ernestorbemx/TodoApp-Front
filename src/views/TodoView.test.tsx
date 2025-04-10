import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TodoView } from "./TodoView"
import { Stats } from "../types"

vi.mock("../http/todo", (actualImport) => {
    return ({
        getTodos: () => Promise.resolve({status: 200, data: []}),
        getSTats: () => Promise.resolve({ avg: 20, highPriorityAvg: 10, lowPriorityAvg:20,mediumPriorityAvg:30 } as Stats)
    })
})


describe("Test TodoView component", () => {

    it("renders", () => {
        render(<TodoView />)
        expect(screen.findAllByText(t => t.includes("by Ernesto Ramirez")))
    })
})