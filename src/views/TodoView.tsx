import { Pagination } from "@heroui/pagination";
import { NewTodo } from "../components/NewTodo";
import { TodoFilters } from "../components/TodoFilters";
import { TodoStats } from "../components/TodoStats";
import { TodoTable } from "../components/TodoTable";

export function TodoView() {

    return <div className="flex flex-col gap-4">
        <div className="mb-4">
            <h1>The Amazing Todo App</h1>
            by Ernesto Ramirez
        </div>
        <TodoFilters />
        <NewTodo />
        <TodoTable />
        <Pagination initialPage={1} total={10} />
        <TodoStats />
    </div>
}