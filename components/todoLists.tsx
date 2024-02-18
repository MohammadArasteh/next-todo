"use client";

import React from "react";
import { useTodoList } from "@/store/zustand";
import { Flex, Text } from "@mantine/core";
import TodoListItem from "./todoListItem";
import { Client } from "../models";
import { IoIosAddCircle } from "react-icons/io";

type Props = {
  onListClick: (list: Client.Todo.TodoList) => void;
};

const TodoLists = (props: Props) => {
  const lists = useTodoList((store) => store.lists);
  return (
    <Flex direction={"column"}>
      {lists.length ? (
        lists.map((list, index) => (
          <TodoListItem
            key={index}
            list={list}
            onClick={() => props.onListClick(list)}
          />
        ))
      ) : (
        <Text px="sm">
          {"You don't have any list!"}
          <br /> start creating a list from
          <IoIosAddCircle
            style={{ display: "inline", margin: "0px 0px 0px 5px" }}
          />{" "}
          icon which is located at top-right section of this panel.
        </Text>
      )}
    </Flex>
  );
};

export default React.memo(TodoLists);
