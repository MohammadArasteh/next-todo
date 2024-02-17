"use client";

import { getUser } from "@/lib/server-actions";
import { useTodoList } from "@/store/zustand";
import React from "react";

export default function useUser() {
  const [user, setUser] = useTodoList((store) => [store.user, store.setUser]);

  React.useEffect(() => {
    if (!user) getUserFromServer();
  }, [user]);

  const getUserFromServer = async () => {
    const result = await getUser();
    if (result.data.user)
      setUser({
        id: result.data.user.id,
        email: result.data.user.email ?? "",
        username: result.data.user.user_metadata.username,
      });
  };

  return user;
}
