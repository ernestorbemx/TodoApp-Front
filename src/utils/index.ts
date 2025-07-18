import { format, formatDistanceToNow } from "date-fns";
import { Todo } from "../types";

/**
 * Formats a given time in seconds into a string in the format "MM:SS".
 * @param seconds - The time in seconds to format.
 * @returns A formatted time string.
 */
export function formatTime(seconds: number): string {
  const days = Math.floor(seconds / (60 * 60 * 24));
  const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const secondsRemaining = seconds % 60;

  return [
    days > 0 ? `${days}d` : "",
    hours > 0 ? `${hours}h` : "",
    minutes > 0 ? `${minutes}m` : "",
    `${secondsRemaining}s`,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Determines the background color based on the due date of a todo.
 * @param dueDate - The due date of the todo.
 * @returns A string representing the background color class.
 */
export function dueDateBackground(dueDate?: Date) {
  if (!dueDate) {
    return "bg-transparent dark:text-white";
  }
  const today = Date.now();
  if (dueDate.valueOf() - today > 1000 * 60 * 60 * 24 * 7 * 2) {
    // More than 2 weeks
    return "bg-green-200 dark:bg-green-400 dark:text-black";
  }
  if (dueDate.valueOf() - today > 1000 * 60 * 60 * 24 * 7 * 1) {
    // Between one week and two weeks
    return "bg-yellow-200 dark:bg-yellow-400 dark:text-black";
  }
  return "bg-red-200 dark:bg-red-400 dark:text-black"; // One week or less
}

/**
 * Formats the columns of a todo item for display.
 * @param todo - The todo item to format.
 * @returns An object containing formatted background color, due date, and relative due date.
 */
export function formatTodoColumns(todo: Partial<Todo>) {
  const bgColor = dueDateBackground(
    todo.dueDate ? new Date(todo.dueDate) : undefined
  );
  const dueDate = todo.dueDate
    ? format(new Date(todo.dueDate), "EEEE do, MMM yyyy")
    : "";
  const dueDateRelative = todo.dueDate
    ? `(${formatDistanceToNow(new Date(todo.dueDate), { addSuffix: true })})`
    : "";

  return { bgColor, dueDate, dueDateRelative };
}
