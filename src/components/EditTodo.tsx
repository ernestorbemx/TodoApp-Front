import { Button } from "@heroui/button";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { TodoForm } from "./TodoForm";
import { Todo } from "../types";

export interface EditTodoProps {
  todo: Todo;
  onEdit?: (todo: Todo) => unknown;
}

export function EditTodo({ todo, onEdit }: EditTodoProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
      <>
        <Button className="" variant="solid" color="primary" onPress={onOpen}>Edit Todo</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Edit To-do</ModalHeader>
                <ModalBody>
                    <TodoForm></TodoForm>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}