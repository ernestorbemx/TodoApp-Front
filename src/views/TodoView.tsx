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

/**
 * The main view component for managing and displaying todos.
 */
export function TodoView() {
  const [fetching, setFetching] = useState<boolean>(false); // Tracks if data is being fetched
  const [page, setPage] = useState<number>(1); // Current page for pagination
  const [filters, setFilters] = useState<TodoFilter>({}); // Filters for todos
  const [sorting, setSorting] = useState<string>(""); // Sorting criteria
  const [todoResult, setTodoResult] = useState<
    PaginationResult<Todo> | undefined
  >(); // Fetched todos
  const [stats, setStats] = useState<Stats | undefined>(); // Fetched stats

  /**
   * Fetches statistics for todos and updates the state.
   */
  const fetchStats = useCallback(() => {
    getSTats()
      .then((res) => {
        if (res.status == 200) {
          setStats(res.data);
          return;
        }
        // Show error toast if fetching stats fails
        addToast({
          color: "danger",
          title: "Error while fetching stats",
          description: "Try again later",
        });
      })
      .catch((e) => {
        addToast({
          color: "danger",
          title: "Error while fetching stats",
          description: e.message,
        });
      });
  }, [setStats]);

  /**
   * Fetches todos based on filters, sorting, and pagination.
   */
  const fetchTodos = useCallback(async () => {
    setFetching(true); // Start fetching
    getTodos(filters, { sortingFields: sorting }, { page, size: PAGE_SIZE })
      .then((res) => {
        if (res.status == 200) {
          setTodoResult(res.data);
        }
      })
      .catch((e) => {
        // Show error toast if fetching todos fails
        addToast({
          color: "danger",
          title: "Error while fetching to-dos",
          description: e.message,
        });
      })
      .finally(() => {
        setFetching(false); // Stop fetching
      });
  }, [setTodoResult, filters, page, sorting]);

  // Fetch todos whenever filters, sorting, or pagination changes
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="mb-4">
        <div className="mb-4 ">
          <h1 className="text-3xl font-bold">
            The <span className="line-through">Amazing</span> Todo App
          </h1>
          <span>by Ernesto Ramirez</span>
        </div>

        <ThemeSwitcher />
      </div>
      <TodoFilters
        searching={fetching}
        onChange={(filter) => {
          setFilters(filter); // Update filters
          fetchTodos(); // Refetch todos
          fetchStats(); // Refetch stats
        }}
      />
      <NewTodo
        onNew={() => {
          fetchTodos(); // Refetch todos after adding a new one
          fetchStats(); // Refetch stats
          // Add optimistic updates if needed
        }}
      />
      <TodoTable
        onSortingChange={setSorting} // Update sorting
        onUpdate={() => {
          fetchTodos(); // Refetch todos after an update
          fetchStats(); // Refetch stats
          // Add optimistic updates if needed
        }}
        data={todoResult?.data ?? []} // Pass fetched todos to the table
      />
      <Pagination
        initialPage={1}
        page={page}
        total={todoResult?.availablePages ?? 1}
        onChange={(page) => setPage(page)} // Update current page
      />
      <TodoStats data={stats} /> {/* Display fetched stats */}
    </div>
  );
}
