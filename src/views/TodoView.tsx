import { Pagination } from "@heroui/pagination";
import { NewTodo } from "../components/NewTodo";
import { TodoFilters } from "../components/TodoFilters";
import { TodoStats } from "../components/TodoStats";
import { TodoTable } from "../components/TodoTable";
import { useCallback, useEffect, useState } from "react";
import { getSTats, getTodos } from "../http/todo";
import { PaginationResult, Stats, Todo, TodoFilter } from "../types";
import { addToast } from "@heroui/toast";
import { ThemeSwitcher } from "../components/ThemeSwitcher";


const PAGE_SIZE = 10;

export function TodoView() {
    const [fetching, setFetching] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [filters, setFilters] = useState<TodoFilter>({})
    const [sorting, setSorting] = useState<string>("")
    const [todoResult, setTodoResult] = useState<PaginationResult<Todo> | undefined>()
    const [stats, setStats] = useState<Stats | undefined>()

    const fetchStats = useCallback(() => {
        getSTats().then(res => {
            if (res.status == 200) {
                setStats(res.data)
                return;
            }
            addToast({
                color: "danger",
                title: "Error while fetching stats",
                description: "Try again later"
            })
        }).catch((e) => {
            addToast({
                color: "danger",
                title: "Error while fetching stats",
                description: e.message

            })
        })
    }, [setStats])

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

    useEffect(() => {
        fetchStats();
    }, [filters, page, sorting])


    return <div className="flex flex-col gap-4">
        <div className="mb-4">
            <div className="mb-4 ">
                <h1 className="text-3xl font-bold">The <span className="line-through">Amazing</span> Todo App</h1>
                <span>
                    by Ernesto Ramirez
                </span>
            </div>
            
            <ThemeSwitcher />
        </div>
        <TodoFilters searching={fetching} onChange={(filter) => {
            setFilters(filter);
            fetchTodos();
            fetchStats();
        }} />
        <NewTodo onNew={() => {
            fetchTodos();
            fetchStats();
            // add optimistic
        }} />
        <TodoTable onSortingChange={setSorting} onUpdate={() => {
            fetchTodos()
            fetchStats();
            // add optimistic
        }} data={todoResult?.data ?? []} />
        <Pagination initialPage={1} page={page} total={todoResult?.availablePages ?? 1} onChange={(page) => setPage(page)} />
        <TodoStats data={stats} />
    </div>
}