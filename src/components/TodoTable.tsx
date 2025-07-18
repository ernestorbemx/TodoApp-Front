import { Checkbox } from "@heroui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Todo } from "../types";
import { changeStatus } from "../http/todo";
import { addToast } from "@heroui/toast";
import { SortField } from "./SortField";
import { useEffect, useState } from "react";
import { EditTodo } from "./EditTodo";
import { DeleteTodo } from "./DeleteTodo";
import { PriorityLabel } from "./PriorityLabel";
import { formatTodoColumns } from "../utils";

/**
 * Props for the TodoTable component.
 */
export interface TodoTableProps {
  /** Array of todos to display in the table. */
  data: Todo[];
  /** Callback for sorting changes. */
  onSortingChange: (sortingField: string) => unknown;
  /** Callback for updating todos (status, whole, or delete). */
  onUpdate: (todo: Todo[], type: "status" | "whole" | "delete") => unknown;
}

/**
 * Renders a table displaying todos with sorting and update functionalities.
 * @param {TodoTableProps} props - Props for the TodoTable component.
 */
export function TodoTable({
  data: dataProps,
  onSortingChange,
  onUpdate,
}: TodoTableProps) {
  const [data, setData] = useState<Todo[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setData(dataProps);
  }, [dataProps]);

  useEffect(() => {
    if (!data || data.length === 0) {
      // If data is empty, reset the checked state
      // This ensures that the checkbox reflects the empty state correctly
      setChecked(false);
      return;
    }
    setChecked(data.length != 0 && data.every((t) => t.done));
  }, [data]);

  /**
   * Updates the state of all todos' status optimistically.
   * @param {boolean} newStatus - The new status to apply to all todos.
   * @returns {Todo[]} - The previous state of todos for rollback in case of failure.
   */
  const updateAllStatusState = (newStatus: boolean) => {
    const oldData = [...data]; // Backup current state
    const updatedData = data?.map((t) => ({ ...t, done: newStatus })); // Update all todos
    setData(updatedData); // Apply optimistic update
    return oldData;
  };

  /**
   * Sends HTTP requests to update the status of all todos.
   * Reverts state on failure.
   * @param {boolean} newStatus - The new status to apply.
   * @param {Todo[]} oldData - The previous state of todos for rollback.
   */
  const updateAllStatusHttp = async (newStatus: boolean, oldData: Todo[]) => {
    const todosToUpdate = dataProps.filter((t) => t.done !== newStatus); // Filter todos needing update
    return Promise.all(todosToUpdate.map((t) => changeStatus(t.id, newStatus)))
      .then((res) => {
        // Handle success and partial success
        if (res.every((r) => r.status === 200)) {
          addToast({
            color: "success",
            title: `To-do's status updated successfully`,
            description: `Todos are now marked as ${newStatus ? "done" : "undone"}`,
          });
          setData(
            data?.map((t) => {
              if (todosToUpdate.find((t2) => t2.id !== t.id)) {
                return { ...t };
              }
              return { ...t, done: newStatus };
            })
          );
          onUpdate(
            res.map((r) => r.data!),
            "status"
          );
          return;
        }
        // Handle partial success
        onUpdate(
          res.filter((r) => r.status === 200).map((r) => r.data!),
          "status"
        );
        addToast({
          color: "warning",
          title: `Not all to-do could be updated`,
          description: "Please try again later.",
        });
      })
      .catch(() => {
        // Handle failure
        addToast({
          color: "warning",
          title: `To-do couldn't be updated`,
          description: "Please try again later.",
        });
        setData(oldData); // Revert to old data on error
      });
  };

  const updateAllStatus = (newStatus: boolean) => {
    const oldData = updateAllStatusState(newStatus);
    updateAllStatusHttp(newStatus, oldData);
  };

  const updateStatusState = (todo: Todo, newStatus: boolean) => {
    const oldData = [...data];
    setData(
      data?.map((t) => {
        if (todo.id !== t.id) {
          return { ...t };
        }
        return { ...t, done: newStatus };
      })
    );
    return oldData;
  };

  const updateStatusHttp = (
    todo: Todo,
    newStatus: boolean,
    oldData: Todo[]
  ) => {
    return changeStatus(todo.id, newStatus)
      .then((res) => {
        if (res.status === 200) {
          addToast({
            color: "success",
            title: `To-do's ${todo.text} updated`,
            description: `New status is ${newStatus ? "done" : "undone"}`,
          });
          onUpdate([res.data!], "status");
          return;
        }
        addToast({
          color: "warning",
          title: `To-do could not be updated`,
          description: "Please try again later.",
        });
        setData(oldData); // Revert to old data on failure
      })
      .catch(() => {
        addToast({
          color: "warning",
          title: `To-do couldn't be updated`,
          description: "Please try again later.",
        });
        setData(oldData); // Revert to old data on error
      });
  };

  const updateStatus = (todo: Todo, newStatus: boolean) => {
    const oldData = updateStatusState(todo, newStatus);
    updateStatusHttp(todo, newStatus, oldData);
  };

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>
          <Checkbox
            data-testid="todos-checkbox"
            defaultSelected={
              dataProps.length != 0 && dataProps.every((t) => t.done)
            }
            isSelected={checked}
            onValueChange={(selected) => {
              // Optimistic update
              setChecked(selected);
              updateAllStatus(selected);
            }}
          />
        </TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>
          <SortField
            ascending={true}
            onChange={(ascending) => {
              const sorting = `${ascending ? "" : "-"}priority`;
              onSortingChange(sorting);
            }}
          >
            Priority
          </SortField>
        </TableColumn>
        <TableColumn>
          <SortField
            ascending={true}
            onChange={(ascending) => {
              const sorting = `${ascending ? "" : "-"}dueDate`;
              onSortingChange(sorting);
            }}
          >
            Due Date
          </SortField>
        </TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {data ? (
          data.map((t) => {
            const { bgColor, dueDate, dueDateRelative } = formatTodoColumns(t);

            return (
              <TableRow key={t.id} className={`${bgColor}`}>
                <TableCell>
                  <Checkbox
                    data-testid={`todo-check-${t.id}`}
                    defaultSelected={t.done}
                    isSelected={t.done}
                    onValueChange={(newValue) => updateStatus(t, newValue)}
                  />
                </TableCell>
                <TableCell className={`${t.done ? "line-through" : ""}`}>
                  {t.text}
                </TableCell>
                <TableCell>
                  <PriorityLabel priority={t.priority} />
                </TableCell>
                <TableCell>{`${dueDate} ${dueDateRelative}`}</TableCell>
                <TableCell>
                  <EditTodo
                    todo={t}
                    onEdit={(todo) => onUpdate([todo], "whole")}
                  />
                  <DeleteTodo
                    todo={t}
                    onDelete={(todo) => onUpdate([todo], "delete")}
                  />
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5}>No results</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
