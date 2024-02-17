import React from "react";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  Tooltip,
} from "@mantine/core";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { useTodoList } from "@/store/zustand";
import { usePathname, useRouter } from "next/navigation";
import { deleteList } from "@/lib/server-actions/todo";
import { Client } from "../models";

type Props = {
  list: Client.Todo.TodoList;
  onClick: VoidFunction;
};

export default function TodoListItem({ list, onClick }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const removeList = useTodoList((store) => store.removeList);
  const path = usePathname();
  const router = useRouter();

  const onDeleteList = async () => {
    setIsDeleting(true);
    const result = await deleteList(list.id);
    const { error, status } = JSON.parse(result);
    setIsDeleting(false);
    close();
    setTimeout(() => {
      if (error?.message) console.error(error.message);
      else if (status === 200) {
        removeList(list.id);
        if (path === `/dashboard/todo/${list.id}`) router.push("/dashboard");
      }
    }, 500);
  };

  const tasksPath = `/dashboard/todo/${list.id}`;

  return (
    <Flex direction={"row"} justify={"space-between"} px="sm" py={6}>
      <Link href={tasksPath} onClick={onClick}>
        <Text
          size="lg"
          style={{
            textDecoration: path === tasksPath ? "underline" : undefined,
          }}
        >
          {list.title}
        </Text>
      </Link>
      <Tooltip label="Delete list">
        <ActionIcon
          variant="filled"
          aria-label="Settings"
          bg={"#161616"}
          onClick={open}
        >
          <MdDelete size={16} />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        title="Deleting List"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{
          transition: "fade",
          duration: 100,
          timingFunction: "linear",
        }}
      >
        <Text>Delete todo list {`"${list.title}"?`}</Text>
        <Group justify="flex-end" mt="md">
          <Button onClick={close} variant="default">
            Cancel
          </Button>
          <Button loading={isDeleting} onClick={onDeleteList}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </Flex>
  );
}
