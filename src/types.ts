import { Priority } from "./http/todo";

export interface Todo {
  id: number;
  text: string;
  dueDate?: string;
  done: boolean;
  completionDate?: string;
  priority: Priority;
  creationDate?: string;
}

export interface PaginationResult<T> {
  page: number;
  availablePages: number;
  data: T[];
  total: number;
}

export interface Pagination {
  page: number;
  size: number;
}

export interface TodoFilter {
  done?: boolean;
  text?: string;
  priority?: Priority;
}

export interface Sorting {
  sortingFields?: string;
}

export interface Stats {
  avg: number;
  lowPriorityAvg: number;
  mediumPriorityAvg: number;
  highPriorityAvg: number;
}
