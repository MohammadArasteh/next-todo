"use client";

import React from "react";
import { useTodoList } from "@/store/zustand";
import localStorageInstance from "@/lib/localStorage";

export default function StateObserver() {
  const store = useTodoList();

  const componentDidRender = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (!componentDidRender.current) {
      store.setInitState(
        localStorageInstance.getObject("lists", []),
        localStorageInstance.getObject("localTasks", {}),
        localStorageInstance.getObject("filteredLists", []),
        localStorageInstance.getObject("changedListIds", [])
      );
      componentDidRender.current = true;
    }
  }, [store]);

  React.useEffect(() => {
    localStorageInstance.setObject("lists", store.lists);
  }, [store.lists]);
  React.useEffect(() => {
    localStorageInstance.setObject("changedListIds", store.changedListsIds);
  }, [store.changedListsIds]);
  React.useEffect(() => {
    localStorageInstance.setObject("filteredLists", store.filteredLists);
  }, [store.filteredLists]);
  React.useEffect(() => {
    localStorageInstance.setObject("localTasks", store.localTasks);
  }, [store.localTasks]);

  return null;
}
