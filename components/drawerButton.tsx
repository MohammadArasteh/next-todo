"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Button, Drawer, Text } from "@mantine/core";
import { GiHamburgerMenu } from "react-icons/gi";
import TodoLists from "./todoLists";
import classes from "app/dashboard/page.module.css";
import { useRouter } from "next/navigation";

export default function DrawerButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const onListClickHandler = React.useCallback(() => {
    close();
  }, [close]);

  return (
    <>
      <ActionIcon
        bg={"#c0392b"}
        radius="xl"
        onClick={open}
        className={classes.drawerBurgerButton}
      >
        <GiHamburgerMenu />
      </ActionIcon>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={true}
        position="left"
        size={"50%"}
        title={
          <Text size="xl" fw={700}>
            Todo Lists
          </Text>
        }
      >
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/new")}
          w="100%"
        >
          Create New List
        </Button>
        <TodoLists onListClick={onListClickHandler} />
      </Drawer>
    </>
  );
}
