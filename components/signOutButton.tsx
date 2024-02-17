"use client";

import localStorageInstance from "@/lib/localStorage";
import { signOut } from "@/lib/server-actions/auth";
import { Text } from "@mantine/core";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        style={{ all: "unset" }}
        onClick={() => localStorageInstance.clearAll()}
      >
        <Text style={{ cursor: "pointer" }}>SIGN OUT</Text>
      </button>
    </form>
  );
}
