import { DatePicker } from "@heroui/date-picker";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Todo } from "../types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parseDateTime, ZonedDateTime } from "@internationalized/date";
import { Priority } from "../http/todo";
import { Button } from "@heroui/button";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useEffect } from "react";

const schema = yup
  .object({
    text: yup.string().max(1).max(120).required(),
    priority: yup.string().oneOf(["LOW", "MEDIUM", "HIGH"]).required(),
    dueDate: yup.object().nullable().optional(),
  })
  .required();

export type TodoFormSchema = yup.InferType<typeof schema>;

export interface TodoFormProps {
  loading: boolean;
  todo?: Partial<Todo>;
  label: string;
  // mode: "edit" | "create";
  onChange: (todo: TodoFormSchema) => unknown;
  onClose: () => unknown;
}

const priorities: { label: string; value: Priority }[] = [
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];

export function TodoForm({
  loading,
  todo,
  onChange,
  label,
  onClose,
}: TodoFormProps) {
  const { handleSubmit, control, reset, setValue } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      ...todo,
      dueDate: todo?.dueDate ? parseDateTime(todo.dueDate) : undefined,
    },
  });

  const onSubmit = (todo: TodoFormSchema) => {
    onChange({ ...todo });
  };

  useEffect(() => {
    if (!todo) {
      reset();
      return;
    }
    reset({
      ...todo,
      dueDate: todo?.dueDate ? parseDateTime(todo.dueDate) : undefined,
    });
  }, [todo, reset]);

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{label}</ModalHeader>
      <ModalBody>
        <Controller
          name="text"
          control={control}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error, invalid },
          }) => (
            <Textarea
              data-testid="todo-form-text"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              className="max-w-xs"
              label="Description"
              placeholder="Enter task description"
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="priority"
          control={control}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error, invalid },
          }) => (
            <Select
              data-testid="todo-form-priority"
              onBlur={onBlur}
              size="sm"
              defaultSelectedKeys={value ? [value] : []}
              selectedKeys={value ? [value] : []}
              className="max-w-xs"
              items={priorities}
              isInvalid={invalid}
              errorMessage={error?.message}
              label="Task Priority"
              placeholder="Select a priority for the task"
              onSelectionChange={(key) => {
                onChange(key.currentKey);
              }}
            >
              {(priority: (typeof priorities)[0]) => (
                <SelectItem key={priority.value}>{priority.label}</SelectItem>
              )}
            </Select>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Controller
            name="dueDate"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error, invalid },
            }) => (
              <>
                <DatePicker
                  granularity="minute"
                  defaultValue={value as ZonedDateTime}
                  data-testid=""
                  className="max-w-[284px]"
                  label="Due date"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value as ZonedDateTime}
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
                <Button color="danger" variant="flat" isDisabled={!value} onPress={() => setValue("dueDate", null)}>Clear</Button>
              </>

            )}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          data-testid="todo-form-close"
          color="danger"
          variant="light"
          onPress={onClose}
        >
          Close
        </Button>
        <Button
          data-testid="todo-form-submit"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          isLoading={loading}
        >
          Submit
        </Button>
      </ModalFooter>
    </>
  );
}
