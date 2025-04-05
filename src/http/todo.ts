import { Pagination, PaginationResult, Sorting, Todo, TodoFilter } from "../types";
import { http } from "./client";

export type Priority = "HIGH" | "MEDIUM" | "LOW"

export interface CreateTodo {
    text: string;
    dueDate?: Date;
    priority?: Priority;
}

export function createTodo(todo: CreateTodo) {
    return http.post<Todo>("/todos", todo)
}

export function getTodos(filters: TodoFilter, sorting: Sorting, pagination: Pagination) {
    const params = new URLSearchParams()
    if(filters.done != undefined) {
        params.append("done", String(filters.done));
    }
    if(filters.text != undefined) {
        params.append("text", String(filters.text));
    }
    if(filters.priority != undefined) {
        params.append("priority", String(filters.priority));
    }
    params.append("sortingFields", String(sorting.sortingFields));
    params.append("page", String(pagination.page));
    params.append("size", String(pagination.size));
    return http.get<PaginationResult<Todo>>(`/todos?${params.toString()}`)
}


export interface EditTodo {
    text: string;
    dueDate?: Date;
    priority?: Priority;
}


export function editTodo(id: number, todo: EditTodo) {
    return http.put<Todo | undefined>(`/todos/${id}`, todo)
}

export function markAsDone(id: number) {
    return http.put<Todo | undefined>(`/todos/${id}/done`)
}

export function markAsUndone(id: number) {
    return http.put<Todo | undefined>(`/todos/${id}/undone`)
}

export function changeStatus(id: number, newStatus: boolean) {
    return newStatus ? markAsDone(id) : markAsUndone(id);
}


export function deleteTodo(id: number) {
    return http.delete<Todo | undefined>(`/todos/${id}`)
}