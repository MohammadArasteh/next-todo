"use client";

import React from "react";
import { useTodoList } from "@/store/zustand";
import { Flex, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import TaskItem from "./taskItem";
import { getListTasks } from "@/lib/server-actions/todo";
import { Server } from "../models";

export default function TasksList() {
  const params = useParams();
  const listId = +params.listId;
  const [isFetching, startFetchTransaction] = React.useTransition();

  const [tasks, setTasks] = useTodoList((store) => [
    store.localTasks[listId],
    store.setTasks,
  ]);
  const isListFilterEnabled = useTodoList((store) =>
    store.filteredLists.includes(listId)
  );

  const fetchTasks = async () => {
    startFetchTransaction(async () => {
      const result = await getListTasks(listId);
      const { data } = JSON.parse(result);
      if (data)
        setTasks(
          listId,
          data.map((task: Server.Entities.ServerSideTodoTask) => ({
            id: task.id,
            listId: task.list_id,
            createdBy: task.created_by,
            createdAt: task.created_at,
            title: task.title,
            isDone: task.isDone,
            dueDate: task.dueDate,
          }))
        );
    });
  };

  React.useEffect(() => {
    if (!tasks) fetchTasks();
  }, [tasks]);

  return (
    <Flex direction={"column"} gap="sm" mt="1rem">
      {isFetching ? (
        <Text>Fetching tasks...</Text>
      ) : tasks?.length ? (
        (tasks ?? [])
          .filter((task) => (isListFilterEnabled ? task.isDone : true))
          .map((task, index) => <TaskItem key={index} task={task} />)
      ) : (
        <Text>This list is empty</Text>
      )}
    </Flex>
  );
}
