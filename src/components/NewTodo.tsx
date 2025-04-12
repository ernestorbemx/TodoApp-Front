import { Button } from "@heroui/button";
import { useDisclosure, Modal, ModalContent } from "@heroui/modal";
import { TodoForm, TodoFormSchema } from "./TodoForm";
import { useCallback, useState } from "react";
import { createTodo } from "../http/todo";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { addToast } from "@heroui/toast";
import { Todo } from "../types";

export interface NewTodoProps {
  onNew: (todo: Todo) => unknown;
}

export function NewTodo({ onNew }: NewTodoProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [todo, setTodo] = useState<Partial<Todo>>();
  const [loading, setLoading] = useState(false);

  const handleCreation = useCallback(
    (todo: TodoFormSchema) => {
      setTodo({});
      setLoading(true);
      createTodo({
        text: todo.text,
        dueDate: (todo.dueDate as CalendarDate)?.toDate(getLocalTimeZone()),
        priority: todo.priority,
      })
        .then((res) => {
          if (res.status == 200) {
            addToast({
              color: "success",
              title: `To-do created successfully`,
              description: `"${todo.text.substring(0, 10)}..." created`,
            });
            onNew(res.data);
            setTodo(undefined);
            onClose();
            return;
          }
          addToast({
            color: "warning",
            title: `To-do couldn't created`,
            description: "Plese try again later.",
          });
        })
        .catch((e) => {
          addToast({
            color: "warning",
            title: `To-do couldn't created`,
            description: `Error: ${e.message}`,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [onClose, onNew],
  );

  return (
    <div className="flex w-full justify-start">
      <Button
        data-testid="create-todo-button"
        className=""
        variant="solid"
        color="primary"
        onPress={onOpen}
      >
        New To-do
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={!loading}
      >
        <ModalContent>
          {(onClose) => (
            <TodoForm
              todo={todo}
              loading={loading}
              label="Create new Todo"
              onChange={handleCreation}
              onClose={onClose}
            ></TodoForm>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
