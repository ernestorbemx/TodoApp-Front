import { Priority } from "./http/todo";

export interface Todo {
    id: number;
    text: string;
    dueDate?: Date;
    done: boolean;
    completionDate?: Date;
    priority: Priority;
    creationDate?: Date;
}

export interface Pagination {
    page: number;
    size: number;
}

export interface TodoFilter {
    done?: boolean;
    text?: boolean;
    priority?: Priority;
    sortingFields?: string;
}