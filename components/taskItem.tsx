import { ActionIcon, Checkbox, Flex, Tooltip, Text } from "@mantine/core";
import { useTodoList } from "@/store/zustand";
import { MdDelete } from "react-icons/md";
import { Client } from "../models";

type Props = {
  task: Client.Todo.TodoTask;
};

export default function TaskItem(props: Props) {
  const [toggleTaskStatus, removeTask] = useTodoList((store) => [
    store.toggleTaskStatus,
    store.removeTask,
  ]);

  const onToggleStatus: React.ChangeEventHandler<HTMLInputElement> = () => {
    toggleTaskStatus(props.task.listId, props.task.id);
  };

  return (
    <Flex direction={"row"} gap="sm">
      <Checkbox
        checked={props.task.isDone}
        onChange={onToggleStatus}
        label={props.task.title}
        style={{
          textDecoration: props.task.isDone ? "line-through" : undefined,
        }}
        mr="auto"
      />
      <Text>{new Date(props.task.dueDate).toLocaleDateString()}</Text>
      <Tooltip label="Delete task">
        <ActionIcon
          variant="default"
          onClick={() => removeTask(props.task.listId, props.task.id)}
        >
          <MdDelete />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
}
