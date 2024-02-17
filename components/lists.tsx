"use client";

import { Flex, Paper, Text, Title, Tooltip } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { IoIosAddCircle } from "react-icons/io";
import TodoLists from "./todoLists";
import React from "react";
import { useTodoList } from "@/store/zustand";
import classes from "app/dashboard/page.module.css";
import { useRouter } from "next/navigation";
import { getLists } from "@/lib/server-actions/todo";
import { Client, Server } from "../models";

type Props = {
  hideHeader?: boolean;
  onListClick?: (list: Client.Todo.TodoList) => void;
};

const Lists = (props: Props) => {
  const router = useRouter();
  const { setLists } = useTodoList();
  const [isFetchingLists, startFetchingListsTransaction] =
    React.useTransition();

  React.useEffect(() => {
    startFetchingListsTransaction(async () => {
      const result = await getLists();
      const { error, data } = JSON.parse(result);
      if (data)
        setLists(
          data.map((d: Server.Entities.ServerSideTodoList) => ({
            id: d.id,
            title: d.title,
            createdBy: d.created_by,
          }))
        );
    });
  }, [setLists]);

  const onListClickHandler = React.useCallback(
    (list: Client.Todo.TodoList) => {
      if (props.onListClick) props.onListClick(list);
    },
    [props]
  );

  const onNewListButtonClickedHandler = React.useCallback(() => {
    router.push("/dashboard/new");
  }, [router]);

  return (
    <>
      <Paper
        bg={"#242424"}
        shadow="md"
        radius="md"
        className={classes.todoListContainer}
      >
        <Flex
          direction={"row"}
          justify={"space-between"}
          align={"center"}
          mb={"md"}
          px="sm"
          pt={"sm"}
        >
          <Title order={2}>Todo Lists</Title>
          <Tooltip label="Add new list">
            <ActionIcon
              variant="filled"
              aria-label="Settings"
              bg={"#161616"}
              onClick={onNewListButtonClickedHandler}
            >
              <IoIosAddCircle size={20} />
            </ActionIcon>
          </Tooltip>
        </Flex>
        {isFetchingLists ? (
          <Text px="sm">Fetching todo lists...</Text>
        ) : (
          <TodoLists onListClick={onListClickHandler} />
        )}
      </Paper>
    </>
  );
};

export default React.memo(Lists);
