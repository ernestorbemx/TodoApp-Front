import { Button } from "@heroui/button";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { TodoForm } from "./TodoForm";

export function NewTodo() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
      <div className="flex w-full justify-start">
        <Button className="" variant="solid" color="primary" onPress={onOpen}>New To-do</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Create new To-do</ModalHeader>
                <ModalBody>
                    <TodoForm></TodoForm>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
}