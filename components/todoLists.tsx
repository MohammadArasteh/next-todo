"use client";

import React from "react";
import { useTodoList } from "@/store/zustand";
import { Flex } from "@mantine/core";
import TodoListItem from "./todoListItem";
import { Client } from "../models";

type Props = {
  onListClick: (list: Client.Todo.TodoList) => void;
};

const TodoLists = (props: Props) => {
  const lists = useTodoList((store) => store.lists);
  return (
    <Flex direction={"column"}>
      {lists.map((list, index) => (
        <TodoListItem
          key={index}
          list={list}
          onClick={() => props.onListClick(list)}
        />
      ))}
    </Flex>
  );
};

export default React.memo(TodoLists);
