import { Pagination } from "@heroui/pagination";
import { NewTodo } from "../components/NewTodo";
import { TodoFilters } from "../components/TodoFilters";
import { TodoStats } from "../components/TodoStats";
import { TodoTable } from "../components/TodoTable";
import { useCallback, useEffect, useState } from "react";
import { getTodos } from "../http/todo";
import { PaginationResult, Todo, TodoFilter } from "../types";
import { addToast } from "@heroui/toast";


const PAGE_SIZE = 10;

export function TodoView() {
    const [fetching, setFetching] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [filters, setFilters] = useState<TodoFilter>({})
    const [sorting, setSorting] = useState<string>("")
    const [todoResult, setTodoResult] = useState<PaginationResult<Todo> | undefined>()

    const fetchTodos = useCallback(async () => {
        setFetching(true);
        getTodos(filters, { sortingFields: sorting }, { page, size: PAGE_SIZE }).then((res) => {
            if (res.status == 200) {
                setTodoResult(res.data)
            }
        })
            .catch((e) => {
                addToast({
                    color: "danger",
                    title: "Error while fetching to-dos",
                    description: e.message

                })
            }).finally(() => {
                setFetching(false);
            })
    }, [setTodoResult, filters, page, sorting])

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])


    return <div className="flex flex-col gap-4">
        <div className="mb-4">
            <h1>The Amazing Todo App</h1>
            by Ernesto Ramirez
        </div>
        <TodoFilters searching={fetching} onChange={(filter) => {
            setFilters(filter);
            fetchTodos();
        }} />
        <NewTodo onNew={() => {
            fetchTodos();
            // add optimistic
        }} />
        <TodoTable onSortingChange={setSorting} onUpdate={() => {
            fetchTodos()
            // add optimistic
        }}  data={todoResult?.data ?? []} />
        <Pagination initialPage={1} page={page} total={todoResult?.availablePages ?? 1} onChange={(page) => setPage(page)} />
        <TodoStats />
    </div>
}