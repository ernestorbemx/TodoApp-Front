import { Button } from "@heroui/button";
import { useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Todo } from "../types";
import { addToast } from "@heroui/toast";
import { useState, useCallback } from "react";
import { deleteTodo } from "../http/todo";
export interface DeleteTodoProps {
  todo: Todo;
  onDelete?: (todo: Todo) => unknown;
}

export function DeleteTodo({ todo, onDelete: onEdit }: DeleteTodoProps) {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


  const [loading, setLoading] = useState(false)

  const handleDeletion = useCallback(() => {
    setLoading(true)
    deleteTodo(todo.id)
      .then((res) => {
        if (res.status == 200) {
          addToast({
            color: "success",
            title: `To-do "${todo.text.substring(0, 10)}..." deleted`,
            description: "You can now refresh the table"
          })
          onClose();
          onEdit?.(res.data!)
          return;
        }
        addToast({
          color: "warning",
          title: `To-do couldn't deleted`,
          description: "Plese try again later."
        })

      }).catch((e) => {
        addToast({
          color: "warning",
          title: `To-do couldn't deleted`,
          description: `Error: ${e.message}`
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [todo, setLoading, onEdit, onClose, addToast])
  return (
    <>
      <Button className="" variant="solid" color="danger" onPress={onOpen}>Delete</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Todo</ModalHeader>
              <ModalBody>
                Are you sure of deleting the todo: "{todo.text}"?
                This operation is not reversible.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleDeletion()} isLoading={loading}>
                  Confirm
                </Button>
              </ModalFooter></>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}