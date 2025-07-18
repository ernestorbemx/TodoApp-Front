import {
  Pagination,
  PaginationResult,
  Sorting,
  Stats,
  Todo,
  TodoFilter,
} from "../types";
import { http } from "./client";

export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface CreateTodo {
  text: string;
  dueDate?: Date;
  priority?: Priority;
}

/**
 * Creates a new todo item.
 * @param todo - The todo item to create.
 * @returns A promise resolving to the created todo.
 */
export function createTodo(todo: CreateTodo) {
  return http.post<Todo>("/todos", todo);
}

/**
 * Fetches a list of todos based on filters, sorting, and pagination.
 * @param filters - Filters to apply to the todo list.
 * @param sorting - Sorting options for the todo list.
 * @param pagination - Pagination options for the todo list.
 * @returns A promise resolving to a paginated result of todos.
 */
export function getTodos(
  filters: TodoFilter,
  sorting: Sorting,
  pagination: Pagination
) {
  const params = new URLSearchParams();
  if (filters.done != undefined) {
    params.append("done", String(filters.done));
  }
  if (filters.text != undefined) {
    params.append("text", String(filters.text));
  }
  if (filters.priority != undefined) {
    params.append("priority", String(filters.priority));
  }
  // Append sorting and pagination parameters
  params.append("sortingFields", String(sorting.sortingFields));
  params.append("page", String(pagination.page));
  params.append("size", String(pagination.size));
  return http.get<PaginationResult<Todo>>(`/todos?${params.toString()}`);
}

export interface EditTodo {
  text: string;
  dueDate?: Date;
  priority?: Priority;
}

/**
 * Edits an existing todo item.
 * @param id - The ID of the todo to edit.
 * @param todo - The updated todo data.
 * @returns A promise resolving to the updated todo or undefined.
 */
export function editTodo(id: number, todo: EditTodo) {
  return http.put<Todo | undefined>(`/todos/${id}`, todo);
}

/**
 * Marks a todo as done.
 * @param id - The ID of the todo to mark as done.
 * @returns A promise resolving to the updated todo or undefined.
 */
export function markAsDone(id: number) {
  return http.put<Todo | undefined>(`/todos/${id}/done`);
}

/**
 * Marks a todo as undone.
 * @param id - The ID of the todo to mark as undone.
 * @returns A promise resolving to the updated todo or undefined.
 */
export function markAsUndone(id: number) {
  return http.put<Todo | undefined>(`/todos/${id}/undone`);
}

/**
 * Changes the status of a todo to done or undone.
 * @param id - The ID of the todo.
 * @param newStatus - The new status (true for done, false for undone).
 * @returns A promise resolving to the updated todo or undefined.
 */
export function changeStatus(id: number, newStatus: boolean) {
  return newStatus ? markAsDone(id) : markAsUndone(id);
}

/**
 * Deletes a todo item.
 * @param id - The ID of the todo to delete.
 * @returns A promise resolving to undefined.
 */
export function deleteTodo(id: number) {
  return http.delete<Todo | undefined>(`/todos/${id}`);
}

/**
 * Fetches statistics for todos.
 * @returns A promise resolving to the todo statistics.
 */
export function getSTats() {
  return http.get<Stats>(`/todos/stats`);
}
