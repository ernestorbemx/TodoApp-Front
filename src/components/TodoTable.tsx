
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Todo } from "../types";
import { changeStatus } from "../http/todo";
import { addToast } from "@heroui/toast";
import { SortField } from "./SortField";
import { useState } from "react";

export interface TodoTableProps {
  data: Todo[];
  onSortingChange: (sortingField: string) => unknown
  onUpdate: (todo: Todo[]) => unknown
}


export function TodoTable({ data, onSortingChange }: TodoTableProps) {
  const [sorting, setSorting] = useState<string>("")

  const updateAllStatus = (newStatus: boolean) => {
    Promise.all(data.filter(t => t.done != newStatus).map((t) => changeStatus(t.id, newStatus))).then((res) => {
      if (res.every(r => r.status == 200)) {
        addToast({
          color: "success",
          title: `To-do's updated`,
          description: "You can now refresh the table"
        })
        return;
      }
      addToast({
        color: "warning",
        title: `Not all to-do could be updated`,
        description: "Plese try again later."
      })
    })
      .catch((e) => {
        addToast({
          color: "warning",
          title: `To-do couldn't created`,
          description: "Plese try again later."
        })
      })
      .finally(() => { })
  }

  const updateStatus = (todo: Todo, newStatus: boolean) => {
    changeStatus(todo.id, newStatus).then((res) => {
      if (res.status == 200) {
        addToast({
          color: "success",
          title: `To-do's ${todo.text} updated`,
          description: "You can now refresh the table"
        })
        return;
      }
      addToast({
        color: "warning",
        title: `To-do could not be updated`,
        description: "Plese try again later."
      })
    })
      .catch((e) => {
        addToast({
          color: "warning",
          title: `To-do couldn't updated`,
          description: "Plese try again later."
        })
      })
      .finally(() => { })
  }

  return <Table aria-label="Example static collection table">
    <TableHeader>
      <TableColumn>
        <Checkbox defaultSelected={data.length != 0 && data.every(t => t.done)} onValueChange={updateAllStatus} />
      </TableColumn>
      <TableColumn>Name</TableColumn>
      <TableColumn>
        <SortField ascending={true} onChange={(ascending) => {
          const sorting = `${ascending ? "" : "-"}priority`;
          setSorting(sorting)
          onSortingChange(sorting)
        }}>Priority</SortField>
      </TableColumn>
      <TableColumn><SortField ascending={true} onChange={(ascending) => {
        const sorting = `${ascending ? "" : "-"}dueDate`;
        setSorting(sorting)
        onSortingChange(sorting)
      }}>Due Date</SortField></TableColumn>
      <TableColumn>Actions</TableColumn>
    </TableHeader>
    <TableBody>
      {data.map(t =>
        <TableRow key={t.id}>
          <TableCell><Checkbox defaultSelected={t.done} onValueChange={(newValue) => updateStatus(t, newValue)} /></TableCell>
          <TableCell>{t.text}</TableCell>
          <TableCell>{t.priority}</TableCell>
          <TableCell>{t.dueDate?.toString()}</TableCell>
          <TableCell>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
}