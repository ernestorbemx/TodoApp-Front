import { Button } from "@heroui/button";
import { useDisclosure, Modal, ModalContent } from "@heroui/modal";
import { TodoForm, TodoFormSchema } from "./TodoForm";
import { Todo } from "../types";
import { addToast } from "@heroui/toast";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { useState, useCallback } from "react";
import { editTodo } from "../http/todo";

export interface EditTodoProps {
  todo: Todo;
  onEdit?: (todo: Todo) => unknown;
}

export function EditTodo({ todo, onEdit }: EditTodoProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const handleEdition = useCallback(
    (todoData: TodoFormSchema) => {
      setLoading(true);
      editTodo(todo.id, {
        text: todoData.text,
        dueDate: (todoData.dueDate as CalendarDate)?.toDate(getLocalTimeZone()),
        priority: todoData.priority,
      })
        .then((res) => {
          if (res.status == 200) {
            addToast({
              color: "success",
              title: `To-do edited successfully`,
              description: `"${todoData.text.substring(0, 10)}..." edited`,
            });
            onClose();
            onEdit?.(res.data!);
            return;
          }
          addToast({
            color: "warning",
            title: `To-do couldn't edited`,
            description: "Plese try again later.",
          });
        })
        .catch((e) => {
          addToast({
            color: "warning",
            title: `To-do couldn't edited`,
            description: `Error: ${e.message}`,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [todo, onClose, onEdit, setLoading],
  );
  return (
    <>
      <Button
        data-testid="edit-todo-button"
        className=""
        variant="solid"
        color="primary"
        onPress={onOpen}
      >
        Edit Todo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <TodoForm
              loading={loading}
              label="Edit Todo"
              todo={todo}
              onChange={(todo) => {
                handleEdition(todo);
              }}
              onClose={onClose}
            ></TodoForm>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
