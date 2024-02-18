"use client";

import React from "react";
import { useTodoList } from "@/store/zustand";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { useParams } from "next/navigation";
import { RiUploadCloudFill } from "react-icons/ri";
import { IoMdRefreshCircle } from "react-icons/io";
import { MdFilterAlt, MdFilterAltOff, MdDeleteSweep } from "react-icons/md";
import { getListTasks, saveListLocalTasks } from "@/lib/server-actions/todo";
import { Server } from "../models";

export default function TasksListActions() {
  const params = useParams();
  const listId = +params.listId;

  const [tasks, setTasks] = useTodoList((store) => [
    store.localTasks[listId] ?? [],
    store.setTasks,
  ]);
  const [isListFilterEnabled, toggleFilter] = useTodoList((store) => [
    store.filteredLists.includes(listId),
    store.toggleListFilter,
  ]);
  const hasUnsavedTask = useTodoList((store) =>
    store.changedListsIds.includes(listId)
  );
  const [isRefreshing, startRefreshTransition] = React.useTransition();
  const [isPushing, startPushTransition] = React.useTransition();

  const onRefresh = async () => {
    startRefreshTransition(async () => {
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

  /**
   * This section of code clearly needs explanation...
   * contact writer for more info
   */
  const onPushChanges = async () => {
    startPushTransition(async () => {
      await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId, tasks }),
      });
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

  const onDeleteAllCompletedTasksHandler = async () => {
    setTasks(
      listId,
      tasks.filter((task) => !task.isDone),
      true
    );
  };

  return (
    <Flex direction={"row"} gap={"0.5rem"}>
      {hasUnsavedTask && (
        <Tooltip
          label={isPushing ? "Pushing changes..." : "Push changes to database"}
        >
          <ActionIcon
            onClick={onPushChanges}
            variant="default"
            loading={isPushing}
          >
            <RiUploadCloudFill />
          </ActionIcon>
        </Tooltip>
      )}
      <Tooltip label="Refresh">
        <ActionIcon
          onClick={onRefresh}
          variant="default"
          loading={isRefreshing}
        >
          <IoMdRefreshCircle />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={"Delete all completed tasks"}>
        <ActionIcon
          onClick={onDeleteAllCompletedTasksHandler}
          variant="default"
        >
          <MdDeleteSweep />
        </ActionIcon>
      </Tooltip>
      <Tooltip label={isListFilterEnabled ? "Disable filter" : "Enable filter"}>
        <ActionIcon onClick={() => toggleFilter(listId)} variant="default">
          {isListFilterEnabled ? <MdFilterAltOff /> : <MdFilterAlt />}
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
}
