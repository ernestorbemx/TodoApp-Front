import { Button } from "@heroui/button";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Todo } from "../types";
import { addToast } from "@heroui/toast";
import { useState, useCallback } from "react";
import { deleteTodo } from "../http/todo";

/**
 * Props for the DeleteTodo component.
 */
export interface DeleteTodoProps {
  /** The todo item to delete. */
  todo: Todo;
  /** Callback triggered after a successful deletion. */
  onDelete?: (todo: Todo) => unknown;
}

/**
 * Renders a button to delete a todo and a confirmation modal.
 * @param {DeleteTodoProps} props - Props for the DeleteTodo component.
 */
export function DeleteTodo({ todo, onDelete }: DeleteTodoProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  /**
   * Handles the deletion of a todo.
   */
  const handleDeletion = useCallback(() => {
    setLoading(true);
    deleteTodo(todo.id)
      .then((res) => {
        if (res.status === 200) {
          addToast({
            color: "success",
            title: `To-do deleted successfully`,
            description: `"${todo.text.substring(0, 10)}..." deleted`,
          });
          onClose();
          onDelete?.(res.data!); // Trigger onDelete callback
          return;
        }
        addToast({
          color: "warning",
          title: `To-do couldn't be deleted`,
          description: "Please try again later.",
        });
      })
      .catch((e) => {
        addToast({
          color: "danger",
          title: `Error deleting to-do`,
          description: e.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [todo, onClose, onDelete, setLoading]);

  return (
    <>
      <Button
        data-testid="delete-button"
        variant="solid"
        color="danger"
        onPress={onOpen}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete the todo: "{todo.text}"?
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              color="secondary"
              onPress={onClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              data-testid="confirm-deletion-button"
              variant="solid"
              color="danger"
              onPress={handleDeletion}
              isLoading={loading}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
