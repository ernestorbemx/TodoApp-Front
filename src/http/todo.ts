import axios from "axios";
import { Pagination, Todo, TodoFilter } from "../types";


export type Priority = "HIGH" | "MEDIUM" | "LOW"


export interface CreateTodo {
    text: string;
    dueDate?: Date;
    priority?: Priority;
}

export function createTodo(todo: CreateTodo) {
    return axios.post<Todo[]>("/todo", todo)
}



export function getTodos(filters: TodoFilter, pagination: Pagination) {
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
    params.append("page", String(pagination.page));
    params.append("size", String(pagination.size));
    return axios.get<Todo>(`/todo?${params.toString()}`)
}


export interface EditTodo {
    text: string;
    dueDate?: Date;
    priority?: Priority;
}


export function editTodo(id: number, todo: EditTodo) {
    return axios.put<Todo | undefined>(`/todo/${id}`, todo)
}

export function markAsDone(id: number) {
    return axios.put<Todo | undefined>(`/todo/${id}/done`)
}

export function markAsUndone(id: number) {
    return axios.put<Todo | undefined>(`/todo/${id}/undone`)
}


export function deleteTodo(id: number) {
    return axios.put<Todo | undefined>(`/todo/${id}/undone`)
}