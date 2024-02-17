"use client";

import { Button } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdAdd } from "react-icons/io";

export default function NewTaskButton() {
  const path = usePathname();
  return (
    <Button
      component={Link}
      href={`${path}/new`}
      variant="outline"
      leftSection={<IoMdAdd />}
      mt="1rem"
    >
      New Task
    </Button>
  );
}
