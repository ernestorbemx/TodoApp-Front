import { Button } from "@heroui/button";
import { useDisclosure, Modal, ModalContent } from "@heroui/modal";
import { TodoForm, TodoFormSchema } from "./TodoForm";
import { Todo } from "../types";
import { addToast } from "@heroui/toast";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { useState, useCallback } from "react";
import { editTodo } from "../http/todo";

/**
 * Props for the EditTodo component.
 */
export interface EditTodoProps {
  /** The todo item to edit. */
  todo: Todo;
  /** Callback triggered after a successful edit. */
  onEdit?: (todo: Todo) => unknown;
}

/**
 * Renders a button to edit a todo and a modal with a form.
 * @param {EditTodoProps} props - Props for the EditTodo component.
 */
export function EditTodo({ todo, onEdit }: EditTodoProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  /**
   * Handles the editing of a todo.
   * @param {TodoFormSchema} todoData - The updated todo data from the form.
   */
  const handleEdition = useCallback(
    (todoData: TodoFormSchema) => {
      setLoading(true);
      editTodo(todo.id, {
        text: todoData.text,
        dueDate: (todoData.dueDate as CalendarDate)?.toDate(getLocalTimeZone()),
        priority: todoData.priority,
      })
        .then((res) => {
          if (res.status === 200) {
            addToast({
              color: "success",
              title: `To-do edited successfully`,
              description: `"${todoData.text.substring(0, 10)}..." edited`,
            });
            onClose();
            onEdit?.(res.data!); // Trigger onEdit callback
            return;
          }
          addToast({
            color: "warning",
            title: `To-do couldn't be edited`,
            description: "Please try again later.",
          });
        })
        .catch((e) => {
          addToast({
            color: "danger",
            title: `Error editing to-do`,
            description: e.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [todo, onClose, onEdit]
  );

  return (
    <>
      <Button
        data-testid="edit-todo-button"
        variant="solid"
        color="primary"
        onPress={onOpen}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <TodoForm
            loading={loading}
            label="Edit Todo"
            todo={todo}
            onChange={handleEdition}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
